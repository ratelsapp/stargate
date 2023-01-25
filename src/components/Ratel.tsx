import { Avatar, Box, Typography } from "@mui/material";
import m1 from "../assets/images/banner/m1.svg";
import m2 from "../assets/images/banner/m2.svg";
import m3 from "../assets/images/banner/m3.svg";
import m4 from "../assets/images/banner/m4.svg";
import m5 from "../assets/images/banner/m5.svg";
import { useGlobalStyles } from "./style";

export default function Ratel() {
  const images = [
    {
      key: 1,
      src: m2,
    },
    {
      key: 2,
      src: m3,
    },
    {
      key: 3,
      src: m4,
    },
    {
      key: 4,
      src: m5,
    },
    {
      key: 4,
      src: m1,
    },
    {
      key: 4,
      src: m5,
    },
    {
      key: 4,
      src: m1,
    },
    {
      key: 4,
      src: m5,
    },
    {
      key: 4,
      src: m1,
    },
  ];

  const classes = useGlobalStyles();

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>Ratels</Typography>
      <Box className={classes.sectionContent}>
        <Box sx={{ display: "flex", gap: "16px 16px", overflow: "hidden", flexWrap: "wrap" }}>
          {images.map((data) => {
            return <Avatar key={data.key} src={data.src} sx={{ width: "80px", height: "80px", borderRadius: "2px" }} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
