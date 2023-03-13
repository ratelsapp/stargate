import { Box, Typography, Avatar } from "@mui/material";
import { useGlobalStyles } from "./style";
import { useUserNFTs, useNFTImage, getNFTImage } from "hooks/calls";
import { useParams } from "react-router-dom";
import { UserNFTElement } from "types/nft";
import NoData from "./NoData";
import GlobalContext from "../context";
import { useContext, useEffect } from "react";

function NFT({ nft }: { nft: UserNFTElement }) {
  const { result: img } = useNFTImage(nft.id);

  return (
    <a href={`https://entrepot.app/marketplace/asset/${nft.id}`} target="_blank" rel="noreferrer">
      <Avatar src={img} sx={{ width: "80px", height: "80px", borderRadius: "2px" }}></Avatar>
    </a>
  );
}

export default function NFTs() {
  const classes = useGlobalStyles();

  const { principal: userPrincipal } = useParams<{ principal: string }>();
  const { result: nfts } = useUserNFTs(userPrincipal);
  const { setAvatar } = useContext(GlobalContext);

  useEffect(() => {
    if (nfts && nfts.length) {
      setAvatar(getNFTImage(nfts[0].id));
    }
  }, [nfts]);

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>NFT</Typography>

      <Box
        className={classes.sectionContent}
        sx={{
          margin: "30px 0 0 0",
        }}
      >
        <Box sx={{ display: "flex", gap: "16px 16px", flexWrap: "wrap", width: "100%" }}>
          {nfts?.map((ele) => (
            <NFT nft={ele} key={ele.id} />
          ))}

          {nfts?.length === 0 || !nfts ? (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
              <NoData></NoData>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
