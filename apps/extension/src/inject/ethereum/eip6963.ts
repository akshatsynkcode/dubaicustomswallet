import { EthProvider } from "./types"

interface EIP6963ProviderInfo {
  icon: string
  name: string
  rdns: string
  uuid: string
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo
  provider: EthProvider
}

const PROVIDER_INFO: EIP6963ProviderInfo = {
  icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODIiIGhlaWdodD0iODIiIHZpZXdCb3g9IjAgMCA4MiA4MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgyIiBoZWlnaHQ9IjgyIiByeD0iMTIiIGZpbGw9IiNENUZGNUMiLz4KPHBhdGggZD0iTTM1LjA0IDU1QzM1LjA0IDU4LjI5MDUgMzcuNjg4NyA2MC45NjIzIDQwLjk3MDMgNjAuOTk5NkM0NC4yNTE5IDYwLjk2MjMgNDYuOTAwNiA1OC4yOTA1IDQ2LjkwMDYgNTVDNDYuOTAwNiA1MS43MDk2IDQ0LjI1MTkgNDkuMDM3NyA0MC45NzAzIDQ5LjAwMDRDMzcuNjg4NyA0OS4wMzc3IDM1LjA0IDUxLjcwOTYgMzUuMDQgNTVaIiBmaWxsPSIjRkQ0ODQ4Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIuODU0NCA0NC42NjIzQzIyLjI0NjIgNDUuOTg2OCAyMC40NTUzIDQ2LjQ1NDYgMTkuNDI0OCA0NS40MjQxTDE3LjUzNTYgNDMuNTM0OUMxNS41ODMgNDEuNTgyMyAxMi40MTcxIDQxLjU4MjMgMTAuNDY0NSA0My41MzQ5QzguNTExODQgNDUuNDg3NSA4LjUxMTg0IDQ4LjY1MzQgMTAuNDY0NSA1MC42MDZMMjUuNzM5MSA2NS44ODA3QzI5LjM5NDIgNzAuMjE3NiAzNC44NTk1IDcyLjk3ODggNDAuOTcwMyA3Mi45OTk0QzQ3LjA4MTEgNzIuOTc4OCA1Mi41NDY0IDcwLjIxNzYgNTYuMjAxNCA2NS44ODA3TDcxLjQ3NjEgNTAuNjA2QzczLjQyODcgNDguNjUzNCA3My40Mjg3IDQ1LjQ4NzUgNzEuNDc2MSA0My41MzQ5QzY5LjUyMzQgNDEuNTgyMyA2Ni4zNTc2IDQxLjU4MjMgNjQuNDA0OSA0My41MzQ5TDYyLjUxNTggNDUuNDI0MUM2MS40ODUyIDQ2LjQ1NDYgNTkuNjk0MyA0NS45ODY4IDU5LjA4NjEgNDQuNjYyM0M1OC45NjYzIDQ0LjQwMTMgNTguOTAxIDQ0LjEyMTMgNTguOTAxIDQzLjgzNDFMNTguOTAxIDIwLjk5OTVDNTguOTAxIDE4LjIzODEgNTYuNjYyNCAxNS45OTk1IDUzLjkwMSAxNS45OTk1QzUxLjEzOTYgMTUuOTk5NSA0OC45MDEgMTguMjM4MSA0OC45MDEgMjAuOTk5NUw0OC45MDEgMzIuNTU2OEM0OC45MDEgMzMuNTUwNiA0Ny44ODI5IDM0LjIyNTIgNDYuOTM1MyAzMy45MjU3QzQ2LjMzNTYgMzMuNzM2MSA0NS45MDIzIDMzLjE5MDEgNDUuOTAyMyAzMi41NjExTDQ1LjkwMjMgMTMuOTk5NkM0NS45MDIzIDExLjI2MDggNDMuNzAwNCA5LjAzNjM3IDQwLjk3MDMgOUMzOC4yNDAyIDkuMDM2MzcgMzYuMDM4MiAxMS4yNjA4IDM2LjAzODIgMTMuOTk5NkwzNi4wMzgyIDMyLjU2MTFDMzYuMDM4MiAzMy4xOTAxIDM1LjYwNSAzMy43MzYxIDM1LjAwNTIgMzMuOTI1N0MzNC4wNTc2IDM0LjIyNTIgMzMuMDM5NSAzMy41NTA2IDMzLjAzOTUgMzIuNTU2OEwzMy4wMzk2IDIwLjk5OTVDMzMuMDM5NiAxOC4yMzgxIDMwLjgwMSAxNS45OTk1IDI4LjAzOTUgMTUuOTk5NUMyNS4yNzgxIDE1Ljk5OTUgMjMuMDM5NSAxOC4yMzgxIDIzLjAzOTUgMjAuOTk5NUwyMy4wMzk1IDQzLjgzNDFDMjMuMDM5NSA0NC4xMjEzIDIyLjk3NDMgNDQuNDAxMyAyMi44NTQ0IDQ0LjY2MjNaTTQwLjk3MDMgNDQuOTk5OUMzMi4xNjU5IDQ1LjA1MjUgMjUuMDQwMyA1NC45OTk3IDI1LjA0MDMgNTQuOTk5N0MyNS4wNDAzIDU0Ljk5OTcgMzIuMTY1OSA2NC45NDY5IDQwLjk3MDMgNjQuOTk5NUM0OS43NzQ2IDY0Ljk0NjkgNTYuOTAwMiA1NC45OTk3IDU2LjkwMDIgNTQuOTk5N0M1Ni45MDAyIDU0Ljk5OTcgNDkuNzc0NiA0NS4wNTI1IDQwLjk3MDMgNDQuOTk5OVoiIGZpbGw9IiNGRDQ4NDgiLz4KPC9zdmc+Cg==",
  name: "Talisman",
  rdns: "xyz.talisman",
  uuid: crypto.randomUUID(),
}

/*
 * Announce the provider to the page
 * https://eips.ethereum.org/EIPS/eip-6963
 */
export const announceProvider = (provider: EthProvider) => {
  const detail: EIP6963ProviderDetail = Object.freeze({ info: PROVIDER_INFO, provider })
  const event = new CustomEvent("eip6963:announceProvider", { detail })

  const broadcast = () => window.dispatchEvent(event)

  // respond to dapp requesting announcements
  window.addEventListener("eip6963:requestProvider", broadcast)

  // broadcast the provider immediately (in case Talisman injects after the dapp has requested announcements)
  broadcast()
}
