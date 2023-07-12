const apiURL = import.meta.env.VITE_API_COSMOS ?? "http://3.112.33.177:1317";
const rpcURL = import.meta.env.VITE_WS_TENDERMINT ?? "http://3.112.33.177:26657";
const prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? "cgt";
const assetPath = import.meta.env.VITE_ASSET_PATH ?? "/assets/";
const nftPath = import.meta.env.VITE_ASSET_PATH ?? "http://104.129.180.42/assets/nft/";


export const env = {
  apiURL,
  rpcURL,
  prefix,
  assetPath,
  nftPath
};
