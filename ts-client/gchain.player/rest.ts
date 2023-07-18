/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PlayerLhcdata {
  address?: string;

  /** @format int32 */
  health?: number;

  /** @format int32 */
  intelligence?: number;

  /** @format int32 */
  fighting?: number;
}

export interface PlayerMsgBuyPlayerStatusResponse {
  lhc?: PlayerLhcdata;
}

export interface PlayerMsgTransferPlayerStatusResponse {
  /** @format uint64 */
  resultId?: string;
}

export interface PlayerMsgUpdatePlayerStatusResponse {
  /** @format uint64 */
  resultId?: string;
}

/**
 * Params defines the parameters for the module.
 */
export type PlayerParams = object;

/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 */
export interface PlayerQueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: PlayerParams;
}

export interface PlayerQueryReadPlayerStatusResponse {
  lhc?: PlayerLhcdata;
}

export interface PlayerQueryReadSnowStatusResponse {
  snow?: PlayerSnowdata;
}

export interface PlayerSnowdata {
  address?: string;

  /** @format int32 */
  health?: number;

  /** @format int32 */
  fighting?: number;
}

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title gchain/player/genesis.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @summary Parameters queries the parameters of the module.
   * @request GET:/gchain/player/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<PlayerQueryParamsResponse, RpcStatus>({
      path: `/gchain/player/params`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryReadPlayerStatus
   * @summary Queries a list of ReadPlayerStatus items.
   * @request GET:/gchain/player/read_player_status/{address}
   */
  queryReadPlayerStatus = (address: string, params: RequestParams = {}) =>
    this.request<PlayerQueryReadPlayerStatusResponse, RpcStatus>({
      path: `/gchain/player/read_player_status/${address}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryReadSnowStatus
   * @summary Queries a list of ReadSnowStatus items.
   * @request GET:/gchain/player/read_snow_status/{address}
   */
  queryReadSnowStatus = (address: string, params: RequestParams = {}) =>
    this.request<PlayerQueryReadSnowStatusResponse, RpcStatus>({
      path: `/gchain/player/read_snow_status/${address}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
