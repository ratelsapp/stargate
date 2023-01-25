import { Box, Typography } from "@mui/material";
import { useGlobalStyles } from "./style";
import CommonAvatar from "./CommonAvatar";

function SwapArrow() {
  return (
    <svg width="56" height="6" viewBox="0 0 56 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M56 3L51 0.113249V5.88675L56 3ZM0 3.5H51.5V2.5H0V3.5Z" fill="#333333" />
    </svg>
  );
}

export default function TokenTrade() {
  const content = [
    {
      key: 1,
      title: "ICPSwap",
      p: [
        {
          key: 1,
          src1: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "10000.222",
          text2: "ICPS",
          src2: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          date: "2022-12-11 12:00",
        },
        {
          src1: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "10000.222",
          text2: "ICPS",
          src2: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          date: "2022-12-11 12:00",
        },
        {
          src1: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "10000.222",
          text2: "ICPS",
          src2: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          date: "2022-12-11 12:00",
        },
      ],
    },
    {
      key: 2,
      title: "Sonic",
      p: [
        {
          src1: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "10000.222",
          text2: "ICPS",
          src2: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          date: "2022-12-11 12:00",
        },
        {
          src1: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "10000.222",
          text2: "ICPS",
          src2: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          date: "2022-12-11 12:00",
        },
      ],
    },
    {
      key: 3,
      title: "Infinity Swap",
      p: [
        {
          src1: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "10000.222",
          text2: "ICPS",
          src2: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          date: "2022-12-11 12:00",
        },
        {
          src1: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          text1: "10000.222",
          text2: "ICPS",
          src2: "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
          date: "2022-12-11 12:00",
        },
      ],
    },
  ];

  const classes = useGlobalStyles();

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>Token Trade</Typography>

      {content.map((item) => {
        return (
          <Box
            sx={{ margin: "24px 0 0 0", "&:nth-of-type(1)": { margin: "30px 0 0 0" } }}
            className={classes.sectionContent}
            key={item.key}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>{item.title}</Typography>

            {item.p.map((row, key) => {
              return (
                <Box
                  sx={{ display: "flex", margin: "50px 0 0 0", "&:nth-of-type(1)": { margin: "30px 0 0 0" } }}
                  key={key}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CommonAvatar src={row.src1} borderRadius="50%" width="50px" height="50px" />
                      <Box sx={{ display: "flex", alignItems: "center", margin: "0 0 0 12px" }}>
                        <Box>
                          <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>{row.text1}</Typography>
                          <Typography sx={{ fontWeight: 500, fontSize: "16px", margin: "5px 0 0 0" }}>
                            {row.text2}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ margin: "0 20px" }}>
                      <SwapArrow></SwapArrow>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CommonAvatar src={row.src1} borderRadius="50%" width="50px" height="50px" />
                      <Box sx={{ display: "flex", alignItems: "center", margin: "0 0 0 12px" }}>
                        <Box>
                          <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>{row.text1}</Typography>
                          <Typography sx={{ fontWeight: 500, fontSize: "16px", margin: "5px 0 0 0" }}>
                            {row.text2}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ flex: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <Typography color="text.666">{row.date}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
