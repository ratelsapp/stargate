import { Box, Typography } from "@mui/material";
import { useGlobalStyles } from "./style";
import CommonAvatar from "./CommonAvatar";

export default function Token() {
  const content = [
    {
      Key: 1,
      src: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
      title: "ICP",
      text1: "1000.222",
      text2: "$888.111",
      hasBadge: false,
    },
    {
      Key: 2,
      src: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
      title: "WICP",
      text1: "1000.222",
      text2: "$888.111",
      hasBadge: true,
    },
    {
      Key: 3,
      src: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
      title: "WICP",
      text1: "1000.222",
      text2: "$888.111",
      hasBadge: true,
    },
    {
      Key: 4,
      src: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
      title: "XTC",
      text1: "1000.222",
      text2: "$888.111",
      hasBadge: false,
    },
    {
      Key: 5,
      src: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
      title: "OGY",
      text1: "1000.222",
      text2: "$888.111",
      hasBadge: false,
    },
  ];

  const classes = useGlobalStyles();

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>Token</Typography>

      <Box className={classes.sectionContent}>
        <Typography sx={{ fontSize: "24px", fontWeight: 500, margin: "0 0 24px 0", textAlign: "center" }}>
          -$10000.222
        </Typography>

        {content.map((ele, key) => {
          return (
            <Box
              sx={{ display: "flex", margin: "30px 0 0 0", "&:nth-of-type(1)": { margin: "0" } }}
              className="bg-light p-4"
              key={key}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CommonAvatar src={ele.src} width="50px" height="50px" borderRadius="50%" />
                <Typography sx={{ margin: "0 0 0 16px", fontWeight: 500 }}>{ele.title}</Typography>
              </Box>

              <Box sx={{ flex: "auto", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Box>
                  <Typography color="text.333" fontSize="18px">
                    {ele.text1}
                  </Typography>
                  <Typography color="text.666" fontSize="12px" align="right">
                    {ele.text2}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
