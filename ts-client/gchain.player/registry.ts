import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgUpdatePlayerStatus } from "./types/gchain/player/tx";
import { MsgBuyPlayerStatus } from "./types/gchain/player/tx";
import { MsgTransferPlayerStatus } from "./types/gchain/player/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/gchain.player.MsgUpdatePlayerStatus", MsgUpdatePlayerStatus],
    ["/gchain.player.MsgBuyPlayerStatus", MsgBuyPlayerStatus],
    ["/gchain.player.MsgTransferPlayerStatus", MsgTransferPlayerStatus],
    
];

export { msgTypes }