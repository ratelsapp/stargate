import { useAppDispatch } from "store/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { updateLockStatus as _updateLockStatus, updateLoginAccount } from "../session/actions";
import { login, logout, updateConnected } from "./actions";
import store from "../index";
import { useAppSelector } from "store/hooks";
import { WalletType } from "constants/index";
import { Principal } from "@dfinity/principal";
import { getConnectorPrincipal, initialConnector } from "utils/connector";
import { AccountIdentifier } from "utils/ic/account_identifier";
import { actor } from "actors/actor";

export function useWalletType() {
  return useAppSelector((state) => state.wallet.type);
}

export function getWalletType() {
  return store.getState().wallet.type;
}

export async function initialWallet() {
  const {
    wallet: { type },
  } = store.getState();

  let isConnected = false;

  if (type) {
    await initialConnector(type);
  }

  return isConnected;
}

export function useIsConnected() {
  return useAppSelector((state) => state.wallet.isConnected);
}

export function useWallet() {
  return useAppSelector((state) => state.wallet);
}

export function getWalletIsConnected() {
  const { wallet } = store.getState();
  return wallet.isConnected;
}

export function getWalletIsLocked() {
  const { session } = store.getState();
  return session.locked;
}

export function useInitialWallet() {
  const dispatch = useAppDispatch();
  const isConnected = useIsConnected();
  const [loading, setLoading] = useState(true);

  const isLocked = useIsLocked();

  useEffect(() => {
    (async () => {
      const type = store.getState().wallet.type;

      if (type) {
        await initialWallet();
        actor.setConnector(type);
        dispatch(updateConnected({ isConnected: true }));
        dispatch(_updateLockStatus(false));
      }

      setLoading(false);
    })();
  }, [isLocked]);

  return useMemo(() => [isConnected, loading], [isConnected, loading]);
}

export function useIsLocked() {
  return useAppSelector((state) => state.session.locked);
}

export function useAccount() {
  return useAppSelector((state) => state.wallet.account);
}

export function useAccountManager(): [string, (account: string) => Promise<void>] {
  const account = useAccount();
  const dispatch = useAppDispatch();

  const updateAccount = useCallback(
    async (account: string) => {
      await dispatch(updateLoginAccount(account));
    },
    [dispatch]
  );

  return [account, updateAccount];
}

export function updateLockStatus(locked: boolean) {
  store.dispatch(_updateLockStatus(locked));
}

export interface UpdateAuthProps {
  type: WalletType;
}

export async function updateAuth({ type }: UpdateAuthProps) {
  const principal = await getConnectorPrincipal();
  const account = AccountIdentifier.fromPrincipal({
    principal: Principal.fromText(principal),
  }).toHex();

  store.dispatch(
    login({
      account,
      principal,
      type,
    })
  );

  store.dispatch(updateConnected({ isConnected: true }));
  store.dispatch(_updateLockStatus(false));
}

export function useUserLogout() {
  const dispatch = useAppDispatch();
  const [, updateAccount] = useAccountManager();
  const walletType = useWalletType();

  return useCallback(async () => {
    await dispatch(logout());
    if (walletType) window.connector.disconnect();
    await updateAccount("");
    await updateLockStatus(true);
    dispatch(updateConnected({ isConnected: false }));
  }, [dispatch, updateLockStatus, updateAccount]);
}

export function usePrincipal(): Principal | undefined {
  const principal = useAppSelector((state) => state.wallet.principal);

  return useMemo(() => {
    if (!principal) return undefined;
    return Principal.fromText(principal);
  }, [principal]);
}
