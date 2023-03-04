import type { Identity } from "@dfinity/agent";

export type { Identity } from "@dfinity/agent";

export type ActorIdentity = Identity | true;

export enum ResultStatus {
  "OK" = "ok",
  "ERROR" = "err",
}

export type Result<T> = {
  readonly status: ResultStatus;
  readonly data?: T;
  readonly message: string;
};

export enum SocialMedia {
  Twitter = "Twitter",
  Github = "Github",
  Discord = "Discord",
}
