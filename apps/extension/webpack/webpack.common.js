/* eslint-env es2021 */

require("dotenv").config();

const webpack = require("webpack");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");

const { browser, srcDir, distDir, getRelease, getGitShortHash, dropConsole } = require("./utils");

/** @type { import('webpack').Configuration } */
const config = (env) => ({
  entry: {
    // Wallet UI
    "popup": { import: path.join(srcDir, "index.popup.tsx") },
    "onboarding": { import: path.join(srcDir, "index.onboarding.tsx") },
    "dashboard": { import: path.join(srcDir, "index.dashboard.tsx") },

    // Wallet service worker pages
    "background": { import: path.join(srcDir, "background.ts"), dependOn: "vendor-background" },

    // Background.js manually-specified code-splits (to keep background.js under 4MB).
    "vendor-background": {
      import: ["@metamask/eth-sig-util", "@substrate/txwrapper-core", "dexie"],
    },

    // Wallet injected scripts
    "content_script": { import: path.join(srcDir, "content_script.ts") },
    "page": { import: path.join(srcDir, "page.ts") },
  },
  output: {
    path: distDir,
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    assetModuleFilename: "assets/[hash][ext]",
    globalObject: "self",
  },
  stats: "minimal",
  experiments: {
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "esbuild-loader",
          options: { target: "esnext" },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        type: "asset",
        resourceQuery: /url/,
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              exportType: "named",
              dimensions: false,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        resourceQuery: { not: [/url/] },
        type: "asset",
        exclude: /node_modules/,
      },
      {
        test: /\.md$/i,
        use: "raw-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { sourceMap: false, url: false, import: false } },
        ],
        include: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { sourceMap: false, url: false, import: false } },
          { loader: "postcss-loader", options: { sourceMap: false } },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      "react/jsx-runtime": path.resolve("../../node_modules/react/jsx-runtime.js"),
      "dexie": path.resolve("../../node_modules/dexie/dist/modern/dexie.mjs"),
    },
    extensions: [".ts", ".tsx", ".js", ".css"],
    plugins: [new TsconfigPathsPlugin()],
    fallback: {
      stream: false,
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      assert: require.resolve("assert"),
      url: require.resolve("url"),
      crypto: require.resolve("crypto-browserify"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
  plugins: [
    env.build !== "ci" && new webpack.ProgressPlugin(),
    Boolean(process.env.MEASURE_WEBPACK_SPEED) &&
      new SpeedMeasurePlugin({ outputFormat: "humanVerbose" }),
    new webpack.DefinePlugin({
      "process.env.EXTENSION_PREFIX": JSON.stringify(""),
      "process.env.PORT_PREFIX": JSON.stringify(process.env.PORT_PREFIX || "dubaicustoms"),
      "process.env.NODE_DEBUG": JSON.stringify(process.env.NODE_DEBUG || ""),
      "process.env.API_KEY_ONFINALITY": JSON.stringify(
        env.build === "production" ? process.env.API_KEY_ONFINALITY || "" : ""
      ),
      "process.env.SENTRY_AUTH_TOKEN": JSON.stringify(process.env.SENTRY_AUTH_TOKEN || ""),
      "process.env.SENTRY_DSN": JSON.stringify(process.env.SENTRY_DSN || ""),
      "process.env.SIMPLE_LOCALIZE_API_KEY": JSON.stringify(
        process.env.SIMPLE_LOCALIZE_API_KEY || ""
      ),
      "process.env.TXWRAPPER_METADATA_CACHE_MAX_AGE": JSON.stringify(60 * 1000),
      "process.env.PASSWORD": JSON.stringify(env.build === "dev" ? process.env.PASSWORD || "" : ""),
      "process.env.TEST_MNEMONIC": JSON.stringify(
        env.build === "dev" ? process.env.TEST_MNEMONIC || "" : ""
      ),
      "process.env.EVM_LOGPROXY": JSON.stringify(
        env.build === "dev" ? process.env.EVM_LOGPROXY || "" : ""
      ),
      "process.env.COINGECKO_API_URL": JSON.stringify(
        env.build === "dev" ? process.env.COINGECKO_API_URL || "" : ""
      ),
      "process.env.COINGECKO_API_KEY_NAME": JSON.stringify(
        env.build === "dev" ? process.env.COINGECKO_API_KEY_NAME || "" : ""
      ),
      "process.env.COINGECKO_API_KEY_VALUE": JSON.stringify(
        env.build === "dev" ? process.env.COINGECKO_API_KEY_VALUE || "" : ""
      ),
      "process.env.BLOWFISH_BASE_PATH": JSON.stringify(
        env.build === "dev" ? process.env.BLOWFISH_BASE_PATH || "" : ""
      ),
      "process.env.BLOWFISH_API_KEY": JSON.stringify(
        env.build === "dev"
          ? process.env.BLOWFISH_API_KEY || ""
          : ["canary", "ci", "qa"].includes(env.build)
          ? process.env.BLOWFISH_QA_API_KEY || ""
          : ""
      ),
      "process.env.NFTS_API_KEY": JSON.stringify(
        env.build === undefined
          ? process.env.NFTS_API_KEY || ""
          : ["canary", "ci", "qa"].includes(env.build)
          ? process.env.NFTS_QA_API_KEY || ""
          : ""
      ),
      "process.env.NFTS_API_BASE_PATH": JSON.stringify(
        env.build === undefined ? process.env.NFTS_API_BASE_PATH || "" : ""
      ),
      "process.env.DEBUG": JSON.stringify(String(!dropConsole(env))),
      "process.env.BUILD": JSON.stringify(env.build),
      "process.env.COMMIT_SHA_SHORT": JSON.stringify(getGitShortHash()),
      "process.env.RELEASE": JSON.stringify(getRelease(env)),
      "process.env.VERSION": JSON.stringify(process.env.npm_package_version),
      "process.env.BROWSER": JSON.stringify(browser),
    }),
    ...[
      { title: "Dubai Customs Wallet", entrypoint: "popup" },
      { title: "Dubai Customs Wallet", entrypoint: "dashboard" },
      { title: "Welcome to Dubai Customs", entrypoint: "onboarding" },
    ].map(
      ({ title, entrypoint }) =>
        new HtmlWebpackPlugin({
          template: `src/template.${entrypoint}.html`,
          filename: `${entrypoint}.html`,
          chunks: [entrypoint],
          title,
          inject: "body",
          minify: false,
        })
    ),
    new CaseSensitivePathsPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({ title: "TypeScript", excludeWarnings: false }),
    new EslintWebpackPlugin({ context: "../", extensions: ["ts", "tsx"] }),
    new webpack.ProvidePlugin({ Buffer: ["buffer", "Buffer"] }),
  ].filter(Boolean),
});

module.exports = config;
