const apiURL = import.meta.env.VITE_API_COSMOS ?? "http://127.0.0.1:1317";
const rpcURL = import.meta.env.VITE_WS_TENDERMINT ?? "http://127.0.0.1:26657";
const prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? "cgt";
const assetPath = import.meta.env.VITE_ASSET_PATH ?? "/assets/";
const nftPath = import.meta.env.VITE_ASSET_PATH ?? "";


export const env = {
  apiURL,
  rpcURL,
  prefix,
  assetPath,
  nftPath
};
