import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export type Action = string;
export interface Config {
  id: string;
  value: Value;
  appName: [] | [string];
  version: number;
  group: string;
  category: [] | [string];
  namespace: string;
}
export interface CreatePoolArgs {
  fee: bigint;
  sqrtPriceX96: string;
  token0: Token;
  token1: Token;
}
export interface CycleInfo {
  balance: bigint;
  available: bigint;
}
export type Error =
  | { CommonError: null }
  | { InternalError: string }
  | { UnsupportedToken: string }
  | { InsufficientFunds: null };
export interface GetPoolArgs {
  fee: bigint;
  token0: Token;
  token1: Token;
}
export interface PoolData {
  fee: bigint;
  key: string;
  tickSpacing: bigint;
  token0: Token;
  token1: Token;
  canisterId: Principal;
}
export type Result = { ok: Array<PoolData> } | { err: Error };
export type Result_1 = { ok: PoolData } | { err: Error };
export type Result_2 = { ok: CycleInfo } | { err: Error };
export interface State {
  strategys: Array<[Action, Strategy]>;
  whiteList: Array<string>;
  devList: Array<string>;
}
export type Strategy = string;
export interface SwapFactory {
  createPool: ActorMethod<[CreatePoolArgs], Result_1>;
  deletePool: ActorMethod<[string], undefined>;
  getAvailabilityState: ActorMethod<[], State>;
  getConfigs: ActorMethod<[], Array<Config>>;
  getCycleInfo: ActorMethod<[], Result_2>;
  getPool: ActorMethod<[GetPoolArgs], Result_1>;
  getPools: ActorMethod<[], Result>;
  getRemovedPools: ActorMethod<[], Result>;
  onMessage: ActorMethod<[Array<Config>], undefined>;
  register: ActorMethod<[], undefined>;
  removePool: ActorMethod<[GetPoolArgs], undefined>;
  setStrategys: ActorMethod<[Array<[string, string]>], undefined>;
  setWhiteList: ActorMethod<[Array<string>], undefined>;
}
export interface Token {
  address: string;
  standard: string;
}
export type Value = { Map: Array<[string, Value]> } | { List: Array<Value> } | { Text: string };
export interface _SERVICE extends SwapFactory {}
