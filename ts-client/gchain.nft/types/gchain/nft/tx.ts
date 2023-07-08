/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Nftdata } from "./nftdata";

export const protobufPackage = "gchain.nft";

export interface MsgMintNft {
  creator: string;
  task: Nftdata | undefined;
}

export interface MsgMintNftResponse {
  id: number;
}

function createBaseMsgMintNft(): MsgMintNft {
  return { creator: "", task: undefined };
}

export const MsgMintNft = {
  encode(message: MsgMintNft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.task !== undefined) {
      Nftdata.encode(message.task, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintNft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.task = Nftdata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMintNft {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      task: isSet(object.task) ? Nftdata.fromJSON(object.task) : undefined,
    };
  },

  toJSON(message: MsgMintNft): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.task !== undefined && (obj.task = message.task ? Nftdata.toJSON(message.task) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintNft>, I>>(object: I): MsgMintNft {
    const message = createBaseMsgMintNft();
    message.creator = object.creator ?? "";
    message.task = (object.task !== undefined && object.task !== null) ? Nftdata.fromPartial(object.task) : undefined;
    return message;
  },
};

function createBaseMsgMintNftResponse(): MsgMintNftResponse {
  return { id: 0 };
}

export const MsgMintNftResponse = {
  encode(message: MsgMintNftResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintNftResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMintNftResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgMintNftResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintNftResponse>, I>>(object: I): MsgMintNftResponse {
    const message = createBaseMsgMintNftResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  MintNft(request: MsgMintNft): Promise<MsgMintNftResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.MintNft = this.MintNft.bind(this);
  }
  MintNft(request: MsgMintNft): Promise<MsgMintNftResponse> {
    const data = MsgMintNft.encode(request).finish();
    const promise = this.rpc.request("gchain.nft.Msg", "MintNft", data);
    return promise.then((data) => MsgMintNftResponse.decode(new _m0.Reader(data)));
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
