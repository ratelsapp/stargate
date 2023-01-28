import { Principal } from "@dfinity/principal";
import isObject from "lodash/isObject";
import { ResultKey, Result } from "../types/global";
import { AccountIdentifier } from "./ic/account_identifier";

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
