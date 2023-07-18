import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgTransferPlayerStatus } from "./types/gchain/player/tx";
import { MsgUpdatePlayerStatus } from "./types/gchain/player/tx";
import { MsgBuyPlayerStatus } from "./types/gchain/player/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/gchain.player.MsgTransferPlayerStatus", MsgTransferPlayerStatus],
    ["/gchain.player.MsgUpdatePlayerStatus", MsgUpdatePlayerStatus],
    ["/gchain.player.MsgBuyPlayerStatus", MsgBuyPlayerStatus],
    
];

export { msgTypes }