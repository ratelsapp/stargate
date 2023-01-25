import { Box, Typography, Avatar } from "@mui/material";
import m1 from "../assets/images/nft/m1.svg";
import m2 from "../assets/images/nft/m2.svg";
import m3 from "../assets/images/nft/m3.svg";
import m4 from "../assets/images/nft/m4.svg";
import m5 from "../assets/images/nft/m5.svg";
import { useGlobalStyles } from "./style";

export default function NFT() {
  const content = [
    {
      key: 1,
      title: "Entrepot",
      hasBadge: true,
      images: [m1, m2, m3, m4, m5],
    },
    {
      key: 2,
      title: "Entrepot",
      hasBadge: true,
      images: [m1, m2, m3, m4, m5],
    },
    {
      key: 3,
      title: "Entrepot",
      hasBadge: true,
      images: [m1, m2, m3, m4, m5],
    },
  ];

  const classes = useGlobalStyles();

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>NFT</Typography>

      <Box>
        {content.map((item) => {
          return (
            <Box
              key={item.key}
              className={classes.sectionContent}
              sx={{
                margin: "24px 0 0 0",
                "&:nth-of-type(1)": {
                  margin: "30px 0 0 0",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500, fontSize: "22px" }}>{item.title}</Typography>
                {item.hasBadge && (
                  <Box sx={{ margin: "0 0 0 10px" }} className={classes.standardLabel}>
                    <Typography color="text.light" fontSize="12px">
                      EXT
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ margin: "17px 0 0 0", display: "flex", gap: "16px 16px" }}>
                {item.images.map((img, key) => {
                  return <Avatar key={key} src={img} sx={{ width: "80px", height: "80px", borderRadius: "2px" }} />;
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
