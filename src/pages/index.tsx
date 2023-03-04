import TopBar from "../components/TopBar";
import Main from "../components/main";
import Banner from "../components/Banner";
import { Box } from "@mui/material";
import useVerifySocialMedia from "hooks/useVerifySocialMedia";

export default function Index() {
  useVerifySocialMedia();

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <TopBar></TopBar>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "1000px" }}>
          <Banner />
          <Main />
        </Box>
      </Box>
    </Box>
  );
}
