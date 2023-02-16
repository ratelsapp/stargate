import { Principal } from "@dfinity/principal";
import isObject from "lodash/isObject";
import { ResultKey, Result } from "../types/global";
import { AccountIdentifier } from "./ic/account_identifier";
import BigNumber from "bignumber.js";
import dayjs from "dayjs";

export function isResultKey(key: string) {
  return isResultErrKey(key) || isResultOkKey(key);
}

export function isResultErrKey(key: string) {
  return key === "err" || key === "Err";
}

export function isResultOkKey(key: string) {
  return key === "ok" || key === "Ok";
}

export function enumResultFormat<T>(result: any): Result<T> {
  if (result === null || result === undefined) {
    return {
      status: ResultKey.ERROR,
      message: "",
      data: undefined,
    };
  }

  const key = Object.keys(result);

  if (result && isObject(result) && key && key[0] && isResultKey(key[0])) {
    let message = "";

    if (isResultErrKey(key[0]) && isObject(result[key[0]])) {
      const messageKey = Object.keys(result[key[0]])[0];
      const value = result[key[0]][messageKey];

      // TODO: for token
      if (messageKey === "Other") {
        message = value;
      } else {
        message = `${messageKey}: ${value}`;
      }
    } else {
      if (typeof result[key[0]] === "string") {
        message = result[key[0]];
      }
    }

    return {
      status: isResultErrKey(key[0]) ? ResultKey.ERROR : ResultKey.OK,
      data: isResultOkKey(key[0]) ? (result[key[0]] as T) : undefined,
      message: message,
    };
  }

  return {
    status: ResultKey.OK,
    data: result as T,
    message: "",
  };
}

export function principalToAccount(principal: string | undefined) {
  if (!principal) return undefined;
  return AccountIdentifier.fromPrincipal({ principal: Principal.fromText(principal) }).toHex();
}

export function isValidPrincipal(principal: string | undefined): boolean {
  if (!principal) return false;

  try {
    return principal === Principal.fromText(principal).toText();
  } catch (e) {
    return false;
  }
}

export function nanosecond2Timestamp(time: string | number | bigint) {
  return dayjs(new BigNumber(String(time)).dividedBy(1000000).toNumber()).format("YYYY-MM-DD HH:mm:ss");
}

export function millisecond2Timestamp(time: string | number | bigint) {
  return dayjs(new BigNumber(String(time)).toNumber()).format("YYYY-MM-DD HH:mm:ss");
}

export const parseTokenAmount = (
  amount: string | number | bigint | undefined,
  decimals: number | bigint = 8
): BigNumber => {
  if (amount !== 0 && !amount) return new BigNumber(0);
  if (typeof amount === "bigint") amount = Number(amount);
  if (typeof decimals === "bigint") decimals = Number(decimals);
  if (Number.isNaN(Number(amount))) return new BigNumber(String(amount));
  return new BigNumber(String(amount)).dividedBy(10 ** Number(decimals));
};

export * from "./nft";
