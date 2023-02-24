import { useAppDispatch, useAppSelector } from "store/hooks";
import { updateTokenLogo } from "./actions";
import { useCallback } from "react";
import store from "store/index";

export function useTokenStateLogo(canisterId: string) {
  return useAppSelector((state) => state.global.logos[canisterId]);
}

export function getTokenStateLogo(canisterId: string) {
  return store.getState().global.logos[canisterId];
}

export function useUpdateTokenStateLogo() {
  const dispatch = useAppDispatch();

  return useCallback(
    (canisterId: string, logo: string) => {
      dispatch(updateTokenLogo({ canisterId, logo }));
    },
    [dispatch]
  );
}
