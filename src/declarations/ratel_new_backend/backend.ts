import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export type Result = { ok: boolean } | { err: string };
export type Result_1 = { ok: Array<User> } | { err: string };
export type Result_2 = { ok: UserAccountResponse } | { err: string };
export type Result_3 = { ok: User } | { err: string };
export type Result_4 = { ok: [] | [User] } | { err: string };
export type Result_5 = { ok: Array<Principal> } | { err: string };
export type Result_6 = { ok: [] | [UserAccountResponse] } | { err: string };
export type Result_7 = { ok: bigint } | { err: string };
export interface User {
  githubTime: [] | [bigint];
  twitter: [] | [string];
  twitterTime: [] | [bigint];
  user: Principal;
  discordTime: [] | [bigint];
  account: string;
  discord: [] | [string];
  principalId: string;
  github: [] | [string];
}
export interface UserAccountResponse {
  nickname: string;
  code: string;
  user: Principal;
  followers: bigint;
  following: bigint;
}
export type VerifyType = { twitter: null } | { discord: null } | { github: null };
export interface _SERVICE {
  addFollowing: ActorMethod<[Principal], Result>;
  cycleAvailable: ActorMethod<[], Result_7>;
  cycleBalance: ActorMethod<[], Result_7>;
  deleteFollowing: ActorMethod<[Principal], Result>;
  find: ActorMethod<[bigint, bigint], Result_1>;
  findAccount: ActorMethod<[Principal], Result_6>;
  findFollower: ActorMethod<[Principal], Result_5>;
  findFollowing: ActorMethod<[Principal], Result_5>;
  findUser: ActorMethod<[Principal], Result_4>;
  get: ActorMethod<[], Result_3>;
  getAccount: ActorMethod<[], Result_2>;
  searchDiscordAccount: ActorMethod<[string], Result_1>;
  searchGithubAccount: ActorMethod<[string], Result_1>;
  searchIcpAccount: ActorMethod<[string], Result_1>;
  searchMultiTwitterAccount: ActorMethod<[Array<string>], Result_1>;
  searchTwitterAccount: ActorMethod<[string], Result_1>;
  updateNickname: ActorMethod<[string], Result>;
  verify: ActorMethod<[VerifyType, string], Result>;
}
