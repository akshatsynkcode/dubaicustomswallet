import { DEBUG } from "extension-shared";

// Removed posthog and Properties imports

const unsafeProperties = [
  "$os",
  "$browser",
  "$device_type",
  "$browser_version",
  "$screen_height",
  "$screen_width",
  "$viewport_height",
  "$viewport_width",
  "$lib",
  "$lib_version",
  "$insert_id",
  "$time",
  "$device_id",
  "$active_feature_flags",
  "$initial_referrer",
  "$initial_referring_domain",
  "$referrer",
  "$referring_domain",
  "$session_id",
  "$window_id",
];

// If talismanProperties is used elsewhere, you may need to keep it, otherwise remove it.
const talismanProperties = {
  appVersion: process.env.VERSION,
  appBuild: process.env.BUILD,
  testBuild: DEBUG || ["dev", "qa", "ci"].includes(process.env.BUILD as string),
};

// Removed initPosthog function
