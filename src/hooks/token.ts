import { useCallData } from "./useCallData";
import { useCallback } from "react";
import { Tokens } from "utils/adapter/Token";
import { Principal } from "@dfinity/principal";
import { enumResultFormat } from "utils";
import { SNS1_ID, SNS1_LOGO, WICP_ID, WICP_LOGO, ckBTC_ID, ckBTC_LOGO } from "constants/index";

export function useTokenMetadata(canisterId: string | undefined) {
  const call = useCallback(async () => {
    return (await await Tokens.metadata({ canisterId: canisterId! })).data;
  }, [canisterId]);

  return useCallData(call, !!canisterId);
}

export function useTokenLogo(canisterId: string | undefined) {
  const call = useCallback(async () => {
    if (canisterId === SNS1_ID) return SNS1_LOGO;
    if (canisterId === WICP_ID) return WICP_LOGO;
    if (canisterId === ckBTC_ID) return ckBTC_LOGO;
    return (await await Tokens.logo({ canisterId: canisterId! })).data;
  }, [canisterId]);

  return useCallData(call, !!canisterId);
}

export function useTokenBalance(canisterId: string | undefined, principal: string | undefined) {
  const call = useCallback(async () => {
    return (
      enumResultFormat<bigint>(
        (
          await Tokens.balance({
            canisterId: canisterId!,
            params: { user: { principal: Principal.fromText(principal!) }, token: "" },
          })
        ).data
      ).data ?? BigInt(0)
    );
  }, [canisterId, principal]);

  return useCallData(call, !!canisterId && !!principal);
}
