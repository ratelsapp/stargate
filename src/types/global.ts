import type { Identity } from "@dfinity/agent";

export type { Identity } from "@dfinity/agent";

export type ActorIdentity = Identity | true;

export enum ResultKey {
  "OK" = "ok",
  "ERROR" = "err",
}

export type Result<T> = {
  readonly status: ResultKey;
  readonly data?: T;
  readonly message: string;
};
