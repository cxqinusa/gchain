/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "gchain.snow";

export interface MsgStartGame {
  creator: string;
  gameName: string;
}

export interface MsgStartGameResponse {
  id: number;
}

export interface MsgSolvePuzzle {
  creator: string;
  id: string;
  puzzle: string;
}

export interface MsgSolvePuzzleResponse {
}

function createBaseMsgStartGame(): MsgStartGame {
  return { creator: "", gameName: "" };
}

export const MsgStartGame = {
  encode(message: MsgStartGame, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.gameName !== "") {
      writer.uint32(18).string(message.gameName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStartGame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStartGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.gameName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStartGame {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      gameName: isSet(object.gameName) ? String(object.gameName) : "",
    };
  },

  toJSON(message: MsgStartGame): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.gameName !== undefined && (obj.gameName = message.gameName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStartGame>, I>>(object: I): MsgStartGame {
    const message = createBaseMsgStartGame();
    message.creator = object.creator ?? "";
    message.gameName = object.gameName ?? "";
    return message;
  },
};

function createBaseMsgStartGameResponse(): MsgStartGameResponse {
  return { id: 0 };
}

export const MsgStartGameResponse = {
  encode(message: MsgStartGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStartGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStartGameResponse();
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

  fromJSON(object: any): MsgStartGameResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgStartGameResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStartGameResponse>, I>>(object: I): MsgStartGameResponse {
    const message = createBaseMsgStartGameResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgSolvePuzzle(): MsgSolvePuzzle {
  return { creator: "", id: "", puzzle: "" };
}

export const MsgSolvePuzzle = {
  encode(message: MsgSolvePuzzle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.puzzle !== "") {
      writer.uint32(26).string(message.puzzle);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSolvePuzzle {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSolvePuzzle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.puzzle = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSolvePuzzle {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "",
      puzzle: isSet(object.puzzle) ? String(object.puzzle) : "",
    };
  },

  toJSON(message: MsgSolvePuzzle): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.puzzle !== undefined && (obj.puzzle = message.puzzle);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSolvePuzzle>, I>>(object: I): MsgSolvePuzzle {
    const message = createBaseMsgSolvePuzzle();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.puzzle = object.puzzle ?? "";
    return message;
  },
};

function createBaseMsgSolvePuzzleResponse(): MsgSolvePuzzleResponse {
  return {};
}

export const MsgSolvePuzzleResponse = {
  encode(_: MsgSolvePuzzleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSolvePuzzleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSolvePuzzleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSolvePuzzleResponse {
    return {};
  },

  toJSON(_: MsgSolvePuzzleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSolvePuzzleResponse>, I>>(_: I): MsgSolvePuzzleResponse {
    const message = createBaseMsgSolvePuzzleResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  StartGame(request: MsgStartGame): Promise<MsgStartGameResponse>;
  SolvePuzzle(request: MsgSolvePuzzle): Promise<MsgSolvePuzzleResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.StartGame = this.StartGame.bind(this);
    this.SolvePuzzle = this.SolvePuzzle.bind(this);
  }
  StartGame(request: MsgStartGame): Promise<MsgStartGameResponse> {
    const data = MsgStartGame.encode(request).finish();
    const promise = this.rpc.request("gchain.snow.Msg", "StartGame", data);
    return promise.then((data) => MsgStartGameResponse.decode(new _m0.Reader(data)));
  }

  SolvePuzzle(request: MsgSolvePuzzle): Promise<MsgSolvePuzzleResponse> {
    const data = MsgSolvePuzzle.encode(request).finish();
    const promise = this.rpc.request("gchain.snow.Msg", "SolvePuzzle", data);
    return promise.then((data) => MsgSolvePuzzleResponse.decode(new _m0.Reader(data)));
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
