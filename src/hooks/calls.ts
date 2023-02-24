import { useCallData } from "./useCallData";
import axios from "axios";
import { useCallback } from "react";
import { enumResultFormat, isValidPrincipal, principalToAccount } from "utils/index";
import { UserNFTElement, NFTTransaction } from "types/nft";
import entrepot from "utils/entrepot";
import { tokenList } from "actors/index";
import { TokenMetadata } from "types/token";

export const USER_ALL_NFTS_API = (account: string) =>
  `https://us-central1-entrepot-api.cloudfunctions.net/api/user/${account}/all`;

export const USER_ALL_NFTS_TRANSACTIONS_API = (account: string) =>
  `https://us-central1-entrepot-api.cloudfunctions.net/api/user/${account}/transactions`;

export function useUserNFTs(account: string | undefined) {
  const call = useCallback(async () => {
    const _account = isValidPrincipal(account) ? principalToAccount(account) : account;
    const result = await (await axios.get(USER_ALL_NFTS_API(_account!))).data;
    return enumResultFormat<UserNFTElement[]>(result).data;
  }, [account]);

  return useCallData(call, !!account);
}

export function getNFTImage(tokenId: string) {
  return entrepot.EntrepotNFTImage(tokenId);
}

export function useNFTImage(tokenId: string) {
  return useCallData(
    useCallback(async () => {
      return getNFTImage(tokenId);
    }, [tokenId]),
    !!tokenId
  );
}

export function useUserNFTTransactions(account: string | undefined) {
  const call = useCallback(async () => {
    const _account = isValidPrincipal(account) ? principalToAccount(account) : account;
    const result = await (await axios.get(USER_ALL_NFTS_TRANSACTIONS_API(_account!))).data;
    return enumResultFormat<NFTTransaction[]>(result).data;
  }, [account]);

  return useCallData(call, !!account);
}

export function useTokens() {
  const call = useCallback(async () => {
    return enumResultFormat<TokenMetadata[]>(await (await tokenList()).getList()).data;
  }, []);

  return useCallData(call);
}
