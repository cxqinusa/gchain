const apiURL = import.meta.env.VITE_API_COSMOS ?? "http://192.168.0.104:1317";
const rpcURL = import.meta.env.VITE_WS_TENDERMINT ?? "http://192.168.0.104:26657";
const prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? "cgt";
const assetPath = import.meta.env.VITE_ASSET_PATH ?? "/assets/";



export const env = {
  apiURL,
  rpcURL,
  prefix,
  assetPath,
};
