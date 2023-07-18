/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Lhcdata } from "./lhcdata";

export const protobufPackage = "gchain.player";

export interface MsgBuyPlayerStatus {
  creator: string;
  denom: string;
  amount: number;
}

export interface MsgBuyPlayerStatusResponse {
  lhc: Lhcdata | undefined;
}

export interface MsgUpdatePlayerStatus {
  creator: string;
  lhc: Lhcdata | undefined;
}

export interface MsgUpdatePlayerStatusResponse {
  resultId: number;
}

export interface MsgTransferPlayerStatus {
  creator: string;
  gamein: string;
  gameout: string;
  amount: number;
}

export interface MsgTransferPlayerStatusResponse {
  resultId: number;
}

function createBaseMsgBuyPlayerStatus(): MsgBuyPlayerStatus {
  return { creator: "", denom: "", amount: 0 };
}

export const MsgBuyPlayerStatus = {
  encode(message: MsgBuyPlayerStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amount !== 0) {
      writer.uint32(24).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuyPlayerStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuyPlayerStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.amount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBuyPlayerStatus {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
      amount: isSet(object.amount) ? Number(object.amount) : 0,
    };
  },

  toJSON(message: MsgBuyPlayerStatus): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.denom !== undefined && (obj.denom = message.denom);
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBuyPlayerStatus>, I>>(object: I): MsgBuyPlayerStatus {
    const message = createBaseMsgBuyPlayerStatus();
    message.creator = object.creator ?? "";
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? 0;
    return message;
  },
};

function createBaseMsgBuyPlayerStatusResponse(): MsgBuyPlayerStatusResponse {
  return { lhc: undefined };
}

export const MsgBuyPlayerStatusResponse = {
  encode(message: MsgBuyPlayerStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lhc !== undefined) {
      Lhcdata.encode(message.lhc, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuyPlayerStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuyPlayerStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lhc = Lhcdata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBuyPlayerStatusResponse {
    return { lhc: isSet(object.lhc) ? Lhcdata.fromJSON(object.lhc) : undefined };
  },

  toJSON(message: MsgBuyPlayerStatusResponse): unknown {
    const obj: any = {};
    message.lhc !== undefined && (obj.lhc = message.lhc ? Lhcdata.toJSON(message.lhc) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBuyPlayerStatusResponse>, I>>(object: I): MsgBuyPlayerStatusResponse {
    const message = createBaseMsgBuyPlayerStatusResponse();
    message.lhc = (object.lhc !== undefined && object.lhc !== null) ? Lhcdata.fromPartial(object.lhc) : undefined;
    return message;
  },
};

function createBaseMsgUpdatePlayerStatus(): MsgUpdatePlayerStatus {
  return { creator: "", lhc: undefined };
}

export const MsgUpdatePlayerStatus = {
  encode(message: MsgUpdatePlayerStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.lhc !== undefined) {
      Lhcdata.encode(message.lhc, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePlayerStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePlayerStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.lhc = Lhcdata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdatePlayerStatus {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      lhc: isSet(object.lhc) ? Lhcdata.fromJSON(object.lhc) : undefined,
    };
  },

  toJSON(message: MsgUpdatePlayerStatus): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.lhc !== undefined && (obj.lhc = message.lhc ? Lhcdata.toJSON(message.lhc) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdatePlayerStatus>, I>>(object: I): MsgUpdatePlayerStatus {
    const message = createBaseMsgUpdatePlayerStatus();
    message.creator = object.creator ?? "";
    message.lhc = (object.lhc !== undefined && object.lhc !== null) ? Lhcdata.fromPartial(object.lhc) : undefined;
    return message;
  },
};

function createBaseMsgUpdatePlayerStatusResponse(): MsgUpdatePlayerStatusResponse {
  return { resultId: 0 };
}

export const MsgUpdatePlayerStatusResponse = {
  encode(message: MsgUpdatePlayerStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resultId !== 0) {
      writer.uint32(8).uint64(message.resultId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdatePlayerStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePlayerStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resultId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdatePlayerStatusResponse {
    return { resultId: isSet(object.resultId) ? Number(object.resultId) : 0 };
  },

  toJSON(message: MsgUpdatePlayerStatusResponse): unknown {
    const obj: any = {};
    message.resultId !== undefined && (obj.resultId = Math.round(message.resultId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdatePlayerStatusResponse>, I>>(
    object: I,
  ): MsgUpdatePlayerStatusResponse {
    const message = createBaseMsgUpdatePlayerStatusResponse();
    message.resultId = object.resultId ?? 0;
    return message;
  },
};

function createBaseMsgTransferPlayerStatus(): MsgTransferPlayerStatus {
  return { creator: "", gamein: "", gameout: "", amount: 0 };
}

export const MsgTransferPlayerStatus = {
  encode(message: MsgTransferPlayerStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.gamein !== "") {
      writer.uint32(18).string(message.gamein);
    }
    if (message.gameout !== "") {
      writer.uint32(26).string(message.gameout);
    }
    if (message.amount !== 0) {
      writer.uint32(32).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferPlayerStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferPlayerStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.gamein = reader.string();
          break;
        case 3:
          message.gameout = reader.string();
          break;
        case 4:
          message.amount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTransferPlayerStatus {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      gamein: isSet(object.gamein) ? String(object.gamein) : "",
      gameout: isSet(object.gameout) ? String(object.gameout) : "",
      amount: isSet(object.amount) ? Number(object.amount) : 0,
    };
  },

  toJSON(message: MsgTransferPlayerStatus): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.gamein !== undefined && (obj.gamein = message.gamein);
    message.gameout !== undefined && (obj.gameout = message.gameout);
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferPlayerStatus>, I>>(object: I): MsgTransferPlayerStatus {
    const message = createBaseMsgTransferPlayerStatus();
    message.creator = object.creator ?? "";
    message.gamein = object.gamein ?? "";
    message.gameout = object.gameout ?? "";
    message.amount = object.amount ?? 0;
    return message;
  },
};

function createBaseMsgTransferPlayerStatusResponse(): MsgTransferPlayerStatusResponse {
  return { resultId: 0 };
}

export const MsgTransferPlayerStatusResponse = {
  encode(message: MsgTransferPlayerStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resultId !== 0) {
      writer.uint32(8).uint64(message.resultId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferPlayerStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferPlayerStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resultId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTransferPlayerStatusResponse {
    return { resultId: isSet(object.resultId) ? Number(object.resultId) : 0 };
  },

  toJSON(message: MsgTransferPlayerStatusResponse): unknown {
    const obj: any = {};
    message.resultId !== undefined && (obj.resultId = Math.round(message.resultId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferPlayerStatusResponse>, I>>(
    object: I,
  ): MsgTransferPlayerStatusResponse {
    const message = createBaseMsgTransferPlayerStatusResponse();
    message.resultId = object.resultId ?? 0;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  BuyPlayerStatus(request: MsgBuyPlayerStatus): Promise<MsgBuyPlayerStatusResponse>;
  UpdatePlayerStatus(request: MsgUpdatePlayerStatus): Promise<MsgUpdatePlayerStatusResponse>;
  TransferPlayerStatus(request: MsgTransferPlayerStatus): Promise<MsgTransferPlayerStatusResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.BuyPlayerStatus = this.BuyPlayerStatus.bind(this);
    this.UpdatePlayerStatus = this.UpdatePlayerStatus.bind(this);
    this.TransferPlayerStatus = this.TransferPlayerStatus.bind(this);
  }
  BuyPlayerStatus(request: MsgBuyPlayerStatus): Promise<MsgBuyPlayerStatusResponse> {
    const data = MsgBuyPlayerStatus.encode(request).finish();
    const promise = this.rpc.request("gchain.player.Msg", "BuyPlayerStatus", data);
    return promise.then((data) => MsgBuyPlayerStatusResponse.decode(new _m0.Reader(data)));
  }

  UpdatePlayerStatus(request: MsgUpdatePlayerStatus): Promise<MsgUpdatePlayerStatusResponse> {
    const data = MsgUpdatePlayerStatus.encode(request).finish();
    const promise = this.rpc.request("gchain.player.Msg", "UpdatePlayerStatus", data);
    return promise.then((data) => MsgUpdatePlayerStatusResponse.decode(new _m0.Reader(data)));
  }

  TransferPlayerStatus(request: MsgTransferPlayerStatus): Promise<MsgTransferPlayerStatusResponse> {
    const data = MsgTransferPlayerStatus.encode(request).finish();
    const promise = this.rpc.request("gchain.player.Msg", "TransferPlayerStatus", data);
    return promise.then((data) => MsgTransferPlayerStatusResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
