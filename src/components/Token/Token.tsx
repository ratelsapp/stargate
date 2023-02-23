import { Box, Typography } from "@mui/material";
import CommonAvatar from "../CommonAvatar";
import { useTokens } from "hooks/calls";
import { TokenMetadata } from "types/token";
import { useEffect, useMemo } from "react";
import { registerTokens } from "utils/adapter/Token";
import { TOKEN_STANDARD } from "utils/adapter/types";
import { useTokenLogo, useTokenBalance } from "hooks/token";
import { usePrincipalFromParams } from "hooks/index";
import { parseTokenAmount, numFormat, toSignificant } from "utils/index";
import { useUSDPrice } from "hooks/useUSDPrice";
import USDValueContext, { TokenUSDValue } from "./context";
import BigNumber from "bignumber.js";
import { useState, useContext } from "react";
import { ICP_ID } from "constants/index";

type Token0 = {
  canisterId: string;
  rank: number;
  decimals: number;
  symbol: string;
};

function Token({ token }: { token: TokenMetadata | Token0 }) {
  const principal = usePrincipalFromParams();
  const { result: logo } = useTokenLogo(token.canisterId);
  const { result: balance } = useTokenBalance(token.canisterId, principal);
  const price = useUSDPrice(token.canisterId);

  const { updateTokenUSDValue } = useContext(USDValueContext);

  useEffect(() => {
    if (price && balance) {
      updateTokenUSDValue({
        token: token.canisterId,
        usd: parseTokenAmount(balance, token.decimals).multipliedBy(price),
      });
    }
  }, [price, balance]);

  return (
    <Box sx={{ display: "flex", margin: "30px 0 0 0", "&:nth-of-type(1)": { margin: "0" } }} className="bg-light p-4">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CommonAvatar src={logo} width="50px" height="50px" borderRadius="50%" />
        <Typography sx={{ margin: "0 0 0 16px", fontWeight: 500 }}>{token.symbol}</Typography>
      </Box>

      <Box sx={{ flex: "auto", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <Box>
          <Typography color="text.333" fontSize="18px" align="right">
            {numFormat(parseTokenAmount(balance, token.decimals).toString(), 6)}
          </Typography>
          <Typography color="text.666" fontSize="12px" align="right">
            {price && balance
              ? `$${numFormat(parseTokenAmount(balance, token.decimals).multipliedBy(price).toString(), 6)}`
              : "--"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function Tokens() {
  const { result: _tokens } = useTokens();

  const tokens: (TokenMetadata | Token0)[] = useMemo(() => {
    if (!_tokens) return [];

    _tokens.forEach((token) => {
      registerTokens({
        canisterIds: [token.canisterId],
        standard: (token.standard.includes("DIP20") ? "DIP20" : token.standard) as TOKEN_STANDARD,
      });
    });

    registerTokens({
      canisterIds: [ICP_ID],
      standard: TOKEN_STANDARD.ICP,
    });

    return [{ canisterId: ICP_ID, symbol: "ICP", rank: 0, decimals: 8 }, ..._tokens];
  }, [_tokens]);

  const [usdValue, setUSDValue] = useState(new BigNumber(0));

  const updateTokenUSDValue = (usdValue: TokenUSDValue) => {
    setUSDValue((prevState) => prevState.plus(usdValue.usd));
  };

  return (
    <USDValueContext.Provider value={{ usdValue, updateTokenUSDValue }}>
      <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
        <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>Token</Typography>

        <Box
          sx={{
            background: "#FAFAFA",
            borderRadius: "8px",
            margin: "30px 0 0 0",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              margin: "0 0 24px 0",
              padding: "16px 25px 0 25px",
              textAlign: "center",
            }}
          >
            ${toSignificant(usdValue.toString(), 10)}
          </Typography>

          <Box
            sx={{
              maxHeight: "500px",
              overflow: "hidden auto",
              padding: "0 25px 16px 25px",
            }}
          >
            {tokens
              // @ts-ignore
              ?.sort((a, b) => {
                if (a.rank < b.rank) return -1;
                if (a.rank === b.rank) return 0;
                if (a.rank > b.rank) return 1;
              })
              .map((ele) => {
                return <Token key={ele.canisterId} token={ele}></Token>;
              })}
          </Box>
        </Box>
      </Box>
    </USDValueContext.Provider>
  );
}
