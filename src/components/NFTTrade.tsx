import { Box, Typography } from "@mui/material";
import { useGlobalStyles } from "./style";
import CommonAvatar from "./CommonAvatar";

export default function NFTTrade() {
  const content = [
    {
      key: 1,
      title: "Entrepot",
      p: [
        {
          src: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "Buy@12.0 ICP",
          text2: "2022-12-11 12:00",
        },
        {
          src: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "Sale@12.0 ICP",
          text2: "2022-12-11 12:00",
        },
      ],
    },
    {
      key: 2,
      title: "ICPSwap",
      p: [
        {
          src: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "Buy@12.0 ICP",
          text2: "2022-12-11 12:00",
        },
        {
          src: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "Sale@12.0 ICP",
          text2: "2022-12-11 12:00",
        },
      ],
    },
    {
      key: 3,
      title: "CCC",
      p: [
        {
          src: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "Buy@12.0 ICP",
          text2: "2022-12-11 12:00",
        },
        {
          src: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "Sale@12.0 ICP",
          text2: "2022-12-11 12:00",
        },
      ],
    },
  ];

  const classes = useGlobalStyles();

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>NFT Trade</Typography>

      {content.map((item) => {
        return (
          <Box
            key={item.key}
            sx={{ margin: "24px 0 0 0", "&:nth-of-type(1)": { margin: "30px 0 0 0" } }}
            className={classes.sectionContent}
          >
            <Typography sx={{ fontWeight: 500, fontSize: "22px" }}>{item.title}</Typography>

            {item.p.map((ele) => (
              <Box sx={{ display: "flex", alignItems: "center", margin: "20px 0 0 0" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CommonAvatar src={item.p[0].src} width="50px" height="50px" />
                  <Typography color="text.333" sx={{ margin: "0 0 0 16px", fontSize: "16px" }}>
                    {ele.text1}
                  </Typography>
                </Box>
                <Box sx={{ flex: "auto", display: "flex", justifyContent: "flex-end" }}>
                  <Typography color="text.666">{ele.text2}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        );
      })}
    </Box>
  );
}
