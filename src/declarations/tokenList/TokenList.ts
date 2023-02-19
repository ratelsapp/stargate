import type { Principal } from "@dfinity/principal";
export type BoolResult = { ok: boolean } | { err: string };
export interface Media {
  link: string;
  mediaType: string;
}
export type NatResult = { ok: bigint } | { err: string };
export type Result = { ok: Array<TokenMetadata> } | { err: string };
export type Result_1 = { ok: Array<string> } | { err: string };
export type Result_2 = { ok: [] | [TokenMetadata] } | { err: string };
export interface TokenMetadata {
  fee: bigint;
  decimals: bigint;
  name: string;
  rank: number;
  mediaLinks: Array<Media>;
  totalSupply: bigint;
  introduction: string;
  standard: string;
  symbol: string;
  canisterId: string;
}
export interface _SERVICE {
  add: (arg_0: TokenMetadata) => Promise<BoolResult>;
  addAdmin: (arg_0: string) => Promise<BoolResult>;
  cycleAvailable: () => Promise<NatResult>;
  cycleBalance: () => Promise<NatResult>;
  get: (arg_0: string) => Promise<Result_2>;
  getAdminList: () => Promise<Result_1>;
  getList: () => Promise<Result>;
  remove: (arg_0: string) => Promise<BoolResult>;
  removeAdmin: (arg_0: string) => Promise<BoolResult>;
}
