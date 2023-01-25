import { Box, Typography } from "@mui/material";
import { useGlobalStyles } from "./style";
import TextLink from "./TextLink";

export default function Commnuity() {
  const content = [
    {
      key: 1,
      title: "FDAO",
      p: [
        {
          text: " Do you want to drop them all?",
          vote: "Voted 1, Yes",
          date: "2022-12-11 12:00",
        },
        {
          text: " Do you want to drop them all?",
          vote: "Voted 1, Yes",
          date: "2022-12-11 12:00",
        },
      ],
    },
  ];

  const classes = useGlobalStyles();

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>Community Voting</Typography>

      {content.map((item) => {
        return (
          <Box className={classes.sectionContent} key={item.key}>
            <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>{item.title}</Typography>

            {item.p.map((row, key) => {
              return (
                <Box sx={{ display: "flex", margin: "30px 0 0 0" }} key={key}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <Typography fontSize="18px">{row.text}</Typography>
                      <Box sx={{ margin: "5px 0 0 0" }}>
                        <TextLink href="/">{row.vote}</TextLink>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ flex: "auto", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
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
