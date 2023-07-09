import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgSolvePuzzle } from "./types/gchain/snow/tx";
import { MsgStartGame } from "./types/gchain/snow/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/gchain.snow.MsgSolvePuzzle", MsgSolvePuzzle],
    ["/gchain.snow.MsgStartGame", MsgStartGame],
    
];

export { msgTypes }