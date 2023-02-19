import { useCallback } from "react";
import { useCallData } from "./useCallData";
import { swapFactory, swapPool } from "actors/index";
import { enumResultFormat } from "utils";
import { PoolData } from "declarations/swap/SwapFactory";
import { Principal } from "@dfinity/principal";

export async function getPoolData(token0: string, token1: string) {
  let _token0 = token0;
  let _token1 = token1;

  if (_token0 > _token1) {
    _token0 = token1;
    _token1 = token0;
  }

  return enumResultFormat<PoolData>(
    await (
      await swapFactory()
    ).getPool({
      fee: BigInt(3000),
      token0: {
        address: token0,
        standard: "",
      },
      token1: {
        address: token1,
        standard: "",
      },
    })
  ).data;
}

export function useQuotePrice(token0: string | undefined, token1: string | undefined, amountIn: string | undefined) {
  return useCallData(
    useCallback(async () => {
      const pool = await getPoolData(token0!, token1!);

      if (pool) {
        return enumResultFormat<bigint>(
          await (
            await swapPool(pool.canisterId.toString())
          ).quote({
            operator: Principal.fromText("aaaaa-aa"),
            amountIn: amountIn!,
            zeroForOne: token0! < token1!,
            amountOutMinimum: "0",
          })
        ).data;
      }
    }, [amountIn, token0, token1]),
    !!amountIn && amountIn !== "0" && !!token0 && !!token1
  );
}
