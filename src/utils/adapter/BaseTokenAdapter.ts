import { BalanceRequest as _BalanceRequest, Metadata } from "./types";
import { Result } from "types/global";
import { ActorSubclass } from "@dfinity/agent";

export type BaseTokenRequestNoParams = {
  canisterId: string;
};

export type BaseTokenRequest<T> = {
  canisterId: string;
  params: T;
};

export type BaseTokenIdentityRequest<T> = {
  canisterId: string;
  params: T;
};

export type BaseTokenResult<T> = Promise<Result<T>>;

export interface TotalHoldersRequest {
  canisterId: string;
}

export type TotalHoldersResult = BaseTokenResult<bigint>;

export type BalanceRequest = BaseTokenRequest<_BalanceRequest>;
export type BalanceResult = Promise<Result<bigint>>;

export type GetFeeRequest = BaseTokenRequestNoParams;
export type GetFeeResult = BaseTokenResult<bigint>;

export type MetadataRequest = BaseTokenRequestNoParams;
export type MetadataResult = BaseTokenResult<Metadata>;

export type LogoRequest = BaseTokenRequestNoParams;
export type LogoResult = BaseTokenResult<string>;

export abstract class BaseTokenAdapter<T> {
  public readonly actor: (canister?: string) => Promise<ActorSubclass<T>>;

  constructor({ actor }: { actor: (canister?: string) => Promise<ActorSubclass<T>> }) {
    this.actor = actor;
  }

  public abstract balance({ canisterId, params }: BalanceRequest): BalanceResult;

  public abstract getFee(request: GetFeeRequest): GetFeeResult;

  public abstract metadata(request: MetadataRequest): MetadataResult;

  public abstract logo(request: LogoRequest): LogoResult;
}
