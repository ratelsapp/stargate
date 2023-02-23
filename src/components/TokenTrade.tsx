import { Box, Typography } from "@mui/material";
import { useGlobalStyles } from "./style";
import CommonAvatar from "./CommonAvatar";
import { useUserTradeTransactions } from "hooks/useSwap";
import { usePrincipal } from "store/wallet/hooks";
import { TransactionsType } from "types/token";
import { useTokenLogo } from "hooks/token";
import { numFormat } from "utils";
import dayjs from "dayjs";

function SwapArrow() {
  return (
    <svg width="56" height="6" viewBox="0 0 56 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M56 3L51 0.113249V5.88675L56 3ZM0 3.5H51.5V2.5H0V3.5Z" fill="#333333" />
    </svg>
  );
}

function Transaction({ transaction }: { transaction: TransactionsType }) {
  const { result: token0Logo } = useTokenLogo(transaction.token0Id);
  const { result: token1Logo } = useTokenLogo(transaction.token1Id);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CommonAvatar src={token0Logo} borderRadius="50%" width="50px" height="50px" />
          <Box sx={{ display: "flex", alignItems: "center", margin: "0 0 0 12px" }}>
            <Box>
              <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
                {numFormat(transaction.amountToken0, 8)}
              </Typography>
              <Typography sx={{ fontWeight: 500, fontSize: "16px", margin: "5px 0 0 0" }}>
                {transaction.token0Symbol}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ margin: "0 20px" }}>
          <SwapArrow></SwapArrow>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CommonAvatar src={token1Logo} borderRadius="50%" width="50px" height="50px" />
          <Box sx={{ display: "flex", alignItems: "center", margin: "0 0 0 12px" }}>
            <Box>
              <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
                {numFormat(transaction.amountToken1, 8)}
              </Typography>
              <Typography sx={{ fontWeight: 500, fontSize: "16px", margin: "5px 0 0 0" }}>
                {transaction.token1Symbol}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Typography color="text.666">
          {dayjs(Number(transaction.timestamp) * 1000).format("YYYY-MM-DD HH:mm:ss")}
        </Typography>
      </Box>
    </Box>
  );
}

export default function TokenTrade() {
  const principal = usePrincipal();

  const { result: transactions } = useUserTradeTransactions(principal?.toString());

  const classes = useGlobalStyles();

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>Token Trade</Typography>

      <Box
        sx={{ margin: "30px 0 0 0", display: "flex", gap: "50px 0", flexDirection: "column" }}
        className={classes.sectionContent}
      >
        {transactions?.content.map((ele, index) => {
          return <Transaction key={`${ele.from}_${index}`} transaction={ele}></Transaction>;
        })}
      </Box>
    </Box>
  );
}
