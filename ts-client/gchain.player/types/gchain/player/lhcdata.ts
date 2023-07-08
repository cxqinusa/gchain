/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "gchain.player";

export interface Lhcdata {
  address: string;
  health: number;
  intelligence: number;
  fighting: number;
}

function createBaseLhcdata(): Lhcdata {
  return { address: "", health: 0, intelligence: 0, fighting: 0 };
}

export const Lhcdata = {
  encode(message: Lhcdata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.health !== 0) {
      writer.uint32(16).int32(message.health);
    }
    if (message.intelligence !== 0) {
      writer.uint32(24).int32(message.intelligence);
    }
    if (message.fighting !== 0) {
      writer.uint32(32).int32(message.fighting);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Lhcdata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLhcdata();
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
          message.intelligence = reader.int32();
          break;
        case 4:
          message.fighting = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Lhcdata {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      health: isSet(object.health) ? Number(object.health) : 0,
      intelligence: isSet(object.intelligence) ? Number(object.intelligence) : 0,
      fighting: isSet(object.fighting) ? Number(object.fighting) : 0,
    };
  },

  toJSON(message: Lhcdata): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.health !== undefined && (obj.health = Math.round(message.health));
    message.intelligence !== undefined && (obj.intelligence = Math.round(message.intelligence));
    message.fighting !== undefined && (obj.fighting = Math.round(message.fighting));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Lhcdata>, I>>(object: I): Lhcdata {
    const message = createBaseLhcdata();
    message.address = object.address ?? "";
    message.health = object.health ?? 0;
    message.intelligence = object.intelligence ?? 0;
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
