import { Box, Typography } from "@mui/material";
import { useGlobalStyles } from "./style";
import CommonAvatar from "./CommonAvatar";
import { useTokens } from "hooks/calls";
import { TokenMetadata } from "types/token";
import { useMemo } from "react";
import { registerTokens } from "utils/adapter/Token";
import { TOKEN_STANDARD } from "utils/adapter/types";
import { useTokenLogo, useTokenBalance } from "hooks/token";
import { usePrincipalFromParams } from "hooks/index";
import { parseTokenAmount } from "utils/index";
import { useUSDPrice } from "hooks/useUSDPrice";

function Token({ token }: { token: TokenMetadata }) {
  const principal = usePrincipalFromParams();
  const { result: logo } = useTokenLogo(token.canisterId);
  const { result: balance } = useTokenBalance(token.canisterId, principal);
  const price = useUSDPrice(token.canisterId);

  return (
    <Box sx={{ display: "flex", margin: "30px 0 0 0", "&:nth-of-type(1)": { margin: "0" } }} className="bg-light p-4">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CommonAvatar src={logo} width="50px" height="50px" borderRadius="50%" />
        <Typography sx={{ margin: "0 0 0 16px", fontWeight: 500 }}>{token.symbol}</Typography>
      </Box>

      <Box sx={{ flex: "auto", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <Box>
          <Typography color="text.333" fontSize="18px">
            {parseTokenAmount(balance, token.decimals).toFormat(10)}
          </Typography>
          <Typography color="text.666" fontSize="12px" align="right">
            {price && balance ? `$${parseTokenAmount(balance, token.decimals).multipliedBy(price).toFormat(10)}` : "--"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function Tokens() {
  const classes = useGlobalStyles();

  const { result: _tokens } = useTokens();

  const tokens = useMemo(() => {
    if (!_tokens) return [];

    _tokens.forEach((token) => {
      registerTokens({
        canisterIds: [token.canisterId],
        standard: (token.standard.includes("DIP20") ? "DIP20" : token.standard) as TOKEN_STANDARD,
      });
    });

    return _tokens;
  }, [_tokens]);

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>Token</Typography>

      <Box className={classes.sectionContent}>
        <Typography sx={{ fontSize: "24px", fontWeight: 500, margin: "0 0 24px 0", textAlign: "center" }}>
          -$10000.222
        </Typography>

        {tokens
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
  );
}
