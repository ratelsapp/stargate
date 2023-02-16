import { useAppDispatch } from "store/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { updateLockStatus as _updateLockStatus, updateLoginAccount } from "../session/actions";
import { updateNFT } from "./actions";
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
