import { useCallback } from "react";
import { useCallData } from "./useCallData";
import { backend } from "../actors/index";
import { Principal } from "@dfinity/principal";
import { enumResultFormat } from "utils/index";
import { User, UserAccountResponse } from "../types/api";

export function useUsers(account: string | undefined) {
  return useCallData(
    useCallback(async () => {
      return enumResultFormat<User[]>(await (await backend()).findUser(Principal.fromText(account!))).data;
    }, [account]),
    !!account
  );
}

export function useUser(account: string | undefined, reload?: boolean) {
  return useCallData(
    useCallback(async () => {
      const data = enumResultFormat<User[]>(await (await backend()).findUser(Principal.fromText(account!))).data;
      return !!data ? data[0] : undefined;
    }, [account]),
    !!account,
    reload
  );
}

export function useAccountProfile(account: string | undefined, reload?: boolean) {
  return useCallData(
    useCallback(async () => {
      const data = enumResultFormat<UserAccountResponse[]>(
        await (await backend()).findAccount(Principal.fromText(account!))
      ).data;

      return !!data ? data[0] : undefined;
    }, [account]),
    !!account,
    reload
  );
}

export function useAccountFollowing(account: string | undefined, reload?: boolean) {
  return useCallData(
    useCallback(async () => {
      return enumResultFormat<Principal[]>(await (await backend()).findFollowing(Principal.fromText(account!))).data;
    }, [account]),
    !!account,
    reload
  );
}

export function useAccountFollower(account: string | undefined, reload?: boolean) {
  return useCallData(
    useCallback(async () => {
      return enumResultFormat<Principal[]>(await (await backend()).findFollower(Principal.fromText(account!))).data;
    }, [account]),
    !!account,
    reload
  );
}

export async function follow(user: Principal) {
  return enumResultFormat<boolean>(await (await backend(true)).addFollowing(user));
}

export async function unFollow(user: Principal) {
  return enumResultFormat<boolean>(await (await backend(true)).deleteFollowing(user));
}

export async function updateNickName(nickName: string) {
  return enumResultFormat<boolean>(await (await backend(true)).updateNickname(nickName));
}