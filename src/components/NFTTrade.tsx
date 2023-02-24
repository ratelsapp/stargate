import { Box, Typography } from "@mui/material";
import { useGlobalStyles } from "./style";
import CommonAvatar from "./CommonAvatar";
import { useNFTImage, useUserNFTTransactions } from "hooks/calls";
import { useParams } from "react-router-dom";
import { NFTTransaction } from "types/nft";
import { useMemo } from "react";
import { principalToAccount, parseTokenAmount, nanosecond2Timestamp } from "utils";
import NoData from "./NoData";

function TransactionElement({ transaction }: { transaction: NFTTransaction }) {
  const { result: image } = useNFTImage(transaction.token);

  const { principal: userPrincipal } = useParams<{ principal: string }>();

  const desc = useMemo(() => {
    if (transaction.buyer === principalToAccount(userPrincipal))
      return `Buy@${parseTokenAmount(transaction.price, 8).toFormat()} ICP`;
    return `Sell@${parseTokenAmount(transaction.price, 8).toFormat()} ICP`;
  }, [transaction]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box sx={{ display: "flex", flex: "auto", alignItems: "center" }}>
        <a href={`https://entrepot.app/marketplace/asset/${transaction.token}`} target="_blank" rel="noreferrer">
          <CommonAvatar src={image} width="50px" height="50px" />
        </a>
        <Typography color="text.333" sx={{ margin: "0 0 0 16px", fontSize: "16px" }}>
          {desc}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography color="text.666">{nanosecond2Timestamp(transaction.time)}</Typography>
      </Box>
    </Box>
  );
}

export default function NFTTrade() {
  const classes = useGlobalStyles();

  const { principal: userPrincipal } = useParams<{ principal: string }>();
  const { result: transactions } = useUserNFTTransactions(userPrincipal);

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>NFT Trade</Typography>

      <Box
        sx={{ margin: "30px 0 0 0", maxHeight: "500px", overflow: "hidden auto" }}
        className={classes.sectionContent}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "20px 0" }}>
          {transactions?.map((ele) => {
            return <TransactionElement key={ele.id} transaction={ele} />;
          })}

          {transactions?.length === 0 || !transactions ? <NoData></NoData> : null}
        </Box>
      </Box>
    </Box>
  );
}
