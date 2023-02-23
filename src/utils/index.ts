import { Principal } from "@dfinity/principal";
import isObject from "lodash/isObject";
import { ResultStatus, Result } from "../types/global";
import { AccountIdentifier } from "./ic/account_identifier";
import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import _Decimal from "decimal.js-light";
// @ts-ignore
import toFormat from "toformat";

const Decimal = toFormat(_Decimal);

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
      status: ResultStatus.ERROR,
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
      status: isResultErrKey(key[0]) ? ResultStatus.ERROR : ResultStatus.OK,
      data: isResultOkKey(key[0]) ? (result[key[0]] as T) : undefined,
      message: message,
    };
  }

  return {
    status: ResultStatus.OK,
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

export const formatTokenAmount = (
  amount: string | number | bigint | undefined,
  decimals: number | bigint = 8
): BigNumber => {
  if (amount !== 0 && !amount) return new BigNumber(0);
  if (typeof amount === "bigint") amount = Number(amount);
  if (typeof decimals === "bigint") decimals = Number(decimals);
  if (Number.isNaN(Number(amount))) return new BigNumber(amount);
  return new BigNumber(amount).multipliedBy(10 ** Number(decimals));
};

export const NO_GROUP_SEPARATOR_FORMATTER = {
  groupSeparator: "",
};

export function numberToString(num: number | BigNumber | bigint): string {
  if (num === 0 || num === BigInt(0)) return "0";
  if (num) return new BigNumber(typeof num === "bigint" ? String(num) : num).toFormat(NO_GROUP_SEPARATOR_FORMATTER);
  return "";
}

export type Override<P, S> = Omit<P, keyof S> & S;

export type StatusResult<T> = {
  readonly status: ResultStatus;
  readonly data?: T;
  readonly message: string;
};

export function isBigIntMemo(val: bigint | number[] | undefined): val is bigint {
  if (typeof val === "bigint") return true;
  return false;
}

export function nullParamsFormat<T>(value: T | null | undefined): [T] | [] {
  return value ? [value] : [];
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

const toSignificantRounding = {
  [Rounding.ROUND_DOWN]: Decimal.ROUND_DOWN,
  [Rounding.ROUND_HALF_UP]: Decimal.ROUND_HALF_UP,
  [Rounding.ROUND_UP]: Decimal.ROUND_UP,
};

export function toSignificant(
  num: number | string | undefined,
  significantDigits = 6,
  format: { [key: string]: any } = { groupSeparator: "" },
  rounding: Rounding = Rounding.ROUND_HALF_UP
): string {
  if (!num) return "--";

  Decimal.set({
    precision: significantDigits + 1,
    rounding: toSignificantRounding[rounding],
  });

  const quotient = new Decimal(num).toSignificantDigits(significantDigits);
  return quotient.toFormat(quotient.decimalPlaces(), format);
}

export function numFormat(num: number | string | undefined, significantDigits = 6): string {
  return toSignificant(num, significantDigits, { groupSeparator: "," });
}

export * from "./nft";
