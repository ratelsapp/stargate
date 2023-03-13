// import Community from "./Community";
import NFTTrade from "./NFTTrade";
// import Ratel from "./Ratel";
import TokenTrade from "./TokenTrade";
// import Social from "./Social";
import Token from "./Token/Token";
// import Did from "./Did";
import NFT from "./NFT";
import { Box } from "@mui/material";

export default function Main() {
  return (
    <Box sx={{ padding: "0 0 20px 0" }}>
      {/* <Ratel /> */}
      <NFT />
      <NFTTrade />
      <Token />
      <TokenTrade />
      {/* <Community />
      <Did />
      <Social /> */}
    </Box>
  );
}
