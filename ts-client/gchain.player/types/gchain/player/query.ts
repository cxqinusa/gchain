/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Lhcdata } from "./lhcdata";
import { Params } from "./params";
import { Snowdata } from "./snowdata";

export const protobufPackage = "gchain.player";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryReadPlayerStatusRequest {
  address: string;
}

export interface QueryReadPlayerStatusResponse {
  lhc: Lhcdata | undefined;
}

export interface QueryReadSnowStatusRequest {
  address: string;
}

export interface QueryReadSnowStatusResponse {
  snow: Snowdata | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryReadPlayerStatusRequest(): QueryReadPlayerStatusRequest {
  return { address: "" };
}

export const QueryReadPlayerStatusRequest = {
  encode(message: QueryReadPlayerStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReadPlayerStatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReadPlayerStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryReadPlayerStatusRequest {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: QueryReadPlayerStatusRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryReadPlayerStatusRequest>, I>>(object: I): QueryReadPlayerStatusRequest {
    const message = createBaseQueryReadPlayerStatusRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryReadPlayerStatusResponse(): QueryReadPlayerStatusResponse {
  return { lhc: undefined };
}

export const QueryReadPlayerStatusResponse = {
  encode(message: QueryReadPlayerStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lhc !== undefined) {
      Lhcdata.encode(message.lhc, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReadPlayerStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReadPlayerStatusResponse();
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

  fromJSON(object: any): QueryReadPlayerStatusResponse {
    return { lhc: isSet(object.lhc) ? Lhcdata.fromJSON(object.lhc) : undefined };
  },

  toJSON(message: QueryReadPlayerStatusResponse): unknown {
    const obj: any = {};
    message.lhc !== undefined && (obj.lhc = message.lhc ? Lhcdata.toJSON(message.lhc) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryReadPlayerStatusResponse>, I>>(
    object: I,
  ): QueryReadPlayerStatusResponse {
    const message = createBaseQueryReadPlayerStatusResponse();
    message.lhc = (object.lhc !== undefined && object.lhc !== null) ? Lhcdata.fromPartial(object.lhc) : undefined;
    return message;
  },
};

function createBaseQueryReadSnowStatusRequest(): QueryReadSnowStatusRequest {
  return { address: "" };
}

export const QueryReadSnowStatusRequest = {
  encode(message: QueryReadSnowStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReadSnowStatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReadSnowStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryReadSnowStatusRequest {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: QueryReadSnowStatusRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryReadSnowStatusRequest>, I>>(object: I): QueryReadSnowStatusRequest {
    const message = createBaseQueryReadSnowStatusRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryReadSnowStatusResponse(): QueryReadSnowStatusResponse {
  return { snow: undefined };
}

export const QueryReadSnowStatusResponse = {
  encode(message: QueryReadSnowStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.snow !== undefined) {
      Snowdata.encode(message.snow, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryReadSnowStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReadSnowStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.snow = Snowdata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryReadSnowStatusResponse {
    return { snow: isSet(object.snow) ? Snowdata.fromJSON(object.snow) : undefined };
  },

  toJSON(message: QueryReadSnowStatusResponse): unknown {
    const obj: any = {};
    message.snow !== undefined && (obj.snow = message.snow ? Snowdata.toJSON(message.snow) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryReadSnowStatusResponse>, I>>(object: I): QueryReadSnowStatusResponse {
    const message = createBaseQueryReadSnowStatusResponse();
    message.snow = (object.snow !== undefined && object.snow !== null) ? Snowdata.fromPartial(object.snow) : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of ReadPlayerStatus items. */
  ReadPlayerStatus(request: QueryReadPlayerStatusRequest): Promise<QueryReadPlayerStatusResponse>;
  /** Queries a list of ReadSnowStatus items. */
  ReadSnowStatus(request: QueryReadSnowStatusRequest): Promise<QueryReadSnowStatusResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.ReadPlayerStatus = this.ReadPlayerStatus.bind(this);
    this.ReadSnowStatus = this.ReadSnowStatus.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("gchain.player.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  ReadPlayerStatus(request: QueryReadPlayerStatusRequest): Promise<QueryReadPlayerStatusResponse> {
    const data = QueryReadPlayerStatusRequest.encode(request).finish();
    const promise = this.rpc.request("gchain.player.Query", "ReadPlayerStatus", data);
    return promise.then((data) => QueryReadPlayerStatusResponse.decode(new _m0.Reader(data)));
  }

  ReadSnowStatus(request: QueryReadSnowStatusRequest): Promise<QueryReadSnowStatusResponse> {
    const data = QueryReadSnowStatusRequest.encode(request).finish();
    const promise = this.rpc.request("gchain.player.Query", "ReadSnowStatus", data);
    return promise.then((data) => QueryReadSnowStatusResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
