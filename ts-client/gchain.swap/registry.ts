import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgAddLiquidity } from "./types/gchain/swap/tx";
import { MsgSwapCoin } from "./types/gchain/swap/tx";
import { MsgMintCoins } from "./types/gchain/swap/tx";
import { MsgDistributeCoins } from "./types/gchain/swap/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/gchain.swap.MsgAddLiquidity", MsgAddLiquidity],
    ["/gchain.swap.MsgSwapCoin", MsgSwapCoin],
    ["/gchain.swap.MsgMintCoins", MsgMintCoins],
    ["/gchain.swap.MsgDistributeCoins", MsgDistributeCoins],
    
];

export { msgTypes }