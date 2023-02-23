import BigNumber from "bignumber.js";
import { createContext } from "react";

export type TokenUSDValue = {
  token: string;
  usd: BigNumber;
};

export default createContext<{ usdValue: BigNumber; updateTokenUSDValue: (usdValue: TokenUSDValue) => void }>({
  updateTokenUSDValue: (usdValue: TokenUSDValue) => {},
  usdValue: new BigNumber(0),
});
