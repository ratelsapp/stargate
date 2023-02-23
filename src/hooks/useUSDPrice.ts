import { useMemo } from "react";
import { useQuotePrice } from "hooks/useSwap";
import { ICP_ID, LEDGER_CANISTER_ID, WICP_ID } from "constants/index";
import BigNumber from "bignumber.js";
import { useTokenMetadata } from "hooks/token";
import { parseTokenAmount, formatTokenAmount, numberToString } from "utils";

export function useICPPrice(): number | undefined {
  return 6.8;
}

export function useUSDPrice(canisterId: string | undefined): BigNumber | undefined {
  const _canisterId = useMemo(() => {
    if (canisterId === WICP_ID || canisterId === ICP_ID) return undefined;
    return canisterId;
  }, [canisterId]);

  const { result: token } = useTokenMetadata(canisterId);

  const amount = useMemo(() => {
    if (!token) return undefined;
    return numberToString(formatTokenAmount(1, token.decimals));
  }, [token]);

  const { result: price } = useQuotePrice(_canisterId, LEDGER_CANISTER_ID, amount);

  const ICPPrice = useICPPrice();

  return useMemo(() => {
    if (canisterId === WICP_ID || canisterId === ICP_ID) {
      return ICPPrice ? new BigNumber(ICPPrice) : undefined;
    }

    if (!canisterId || !price || !ICPPrice || !token) {
      return undefined;
    }

    return parseTokenAmount(price, 8).multipliedBy(ICPPrice);
  }, [price, ICPPrice]);
}
