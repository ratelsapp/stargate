import { useCallData } from "./useCallData";
import { useCallback } from "react";
import { Tokens } from "utils/adapter/Token";
import { Principal } from "@dfinity/principal";
import { enumResultFormat } from "utils";
import { SNS1_ID, SNS1_LOGO, WICP_ID, WICP_LOGO, ckBTC_ID, ckBTC_LOGO, ICP_ID, ICP_LOGO } from "constants/index";
import { getTokenStateLogo, useUpdateTokenStateLogo } from "store/global/hooks";
import { CHAT_ID, CHAT_LOGO } from "constants/chat";

export function useTokenMetadata(canisterId: string | undefined) {
  const call = useCallback(async () => {
    return (await await Tokens.metadata({ canisterId: canisterId! })).data;
  }, [canisterId]);

  return useCallData(call, !!canisterId);
}

export function useTokenLogo(canisterId: string | undefined) {
  const updateStateLogo = useUpdateTokenStateLogo();

  const call = useCallback(async () => {
    if (canisterId === SNS1_ID) return SNS1_LOGO;
    if (canisterId === WICP_ID) return WICP_LOGO;
    if (canisterId === ckBTC_ID) return ckBTC_LOGO;
    if (canisterId === CHAT_ID) return CHAT_LOGO;
    if (canisterId === ICP_ID) return ICP_LOGO;

    const stateLogo = getTokenStateLogo(canisterId!);

    if (!!stateLogo) return stateLogo;

    const logo = (await await Tokens.logo({ canisterId: canisterId! })).data;

    updateStateLogo(canisterId!, logo ?? "");

    return logo;
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
