/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "gchain.snow";

export interface Game {
  id: number;
  gameName: string;
  player: string;
  puzzle: string;
  deadline: string;
  blockOutTime: string;
  beforeIndex: string;
  afterIndex: string;
  status: string;
}

function createBaseGame(): Game {
  return {
    id: 0,
    gameName: "",
    player: "",
    puzzle: "",
    deadline: "",
    blockOutTime: "",
    beforeIndex: "",
    afterIndex: "",
    status: "",
  };
}

export const Game = {
  encode(message: Game, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.gameName !== "") {
      writer.uint32(18).string(message.gameName);
    }
    if (message.player !== "") {
      writer.uint32(26).string(message.player);
    }
    if (message.puzzle !== "") {
      writer.uint32(34).string(message.puzzle);
    }
    if (message.deadline !== "") {
      writer.uint32(42).string(message.deadline);
    }
    if (message.blockOutTime !== "") {
      writer.uint32(50).string(message.blockOutTime);
    }
    if (message.beforeIndex !== "") {
      writer.uint32(58).string(message.beforeIndex);
    }
    if (message.afterIndex !== "") {
      writer.uint32(66).string(message.afterIndex);
    }
    if (message.status !== "") {
      writer.uint32(74).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Game {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.gameName = reader.string();
          break;
        case 3:
          message.player = reader.string();
          break;
        case 4:
          message.puzzle = reader.string();
          break;
        case 5:
          message.deadline = reader.string();
          break;
        case 6:
          message.blockOutTime = reader.string();
          break;
        case 7:
          message.beforeIndex = reader.string();
          break;
        case 8:
          message.afterIndex = reader.string();
          break;
        case 9:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Game {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      gameName: isSet(object.gameName) ? String(object.gameName) : "",
      player: isSet(object.player) ? String(object.player) : "",
      puzzle: isSet(object.puzzle) ? String(object.puzzle) : "",
      deadline: isSet(object.deadline) ? String(object.deadline) : "",
      blockOutTime: isSet(object.blockOutTime) ? String(object.blockOutTime) : "",
      beforeIndex: isSet(object.beforeIndex) ? String(object.beforeIndex) : "",
      afterIndex: isSet(object.afterIndex) ? String(object.afterIndex) : "",
      status: isSet(object.status) ? String(object.status) : "",
    };
  },

  toJSON(message: Game): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.gameName !== undefined && (obj.gameName = message.gameName);
    message.player !== undefined && (obj.player = message.player);
    message.puzzle !== undefined && (obj.puzzle = message.puzzle);
    message.deadline !== undefined && (obj.deadline = message.deadline);
    message.blockOutTime !== undefined && (obj.blockOutTime = message.blockOutTime);
    message.beforeIndex !== undefined && (obj.beforeIndex = message.beforeIndex);
    message.afterIndex !== undefined && (obj.afterIndex = message.afterIndex);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Game>, I>>(object: I): Game {
    const message = createBaseGame();
    message.id = object.id ?? 0;
    message.gameName = object.gameName ?? "";
    message.player = object.player ?? "";
    message.puzzle = object.puzzle ?? "";
    message.deadline = object.deadline ?? "";
    message.blockOutTime = object.blockOutTime ?? "";
    message.beforeIndex = object.beforeIndex ?? "";
    message.afterIndex = object.afterIndex ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

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
