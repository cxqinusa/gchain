/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "gchain.player";

export interface Snowdata {
  address: string;
  health: number;
  fighting: number;
}

function createBaseSnowdata(): Snowdata {
  return { address: "", health: 0, fighting: 0 };
}

export const Snowdata = {
  encode(message: Snowdata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.health !== 0) {
      writer.uint32(16).int32(message.health);
    }
    if (message.fighting !== 0) {
      writer.uint32(24).int32(message.fighting);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Snowdata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnowdata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.health = reader.int32();
          break;
        case 3:
          message.fighting = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Snowdata {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      health: isSet(object.health) ? Number(object.health) : 0,
      fighting: isSet(object.fighting) ? Number(object.fighting) : 0,
    };
  },

  toJSON(message: Snowdata): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.health !== undefined && (obj.health = Math.round(message.health));
    message.fighting !== undefined && (obj.fighting = Math.round(message.fighting));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Snowdata>, I>>(object: I): Snowdata {
    const message = createBaseSnowdata();
    message.address = object.address ?? "";
    message.health = object.health ?? 0;
    message.fighting = object.fighting ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
