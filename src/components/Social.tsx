import { Box, Typography } from "@mui/material";
import { useGlobalStyles } from "./style";

export default function Social() {
  const content = [
    {
      key: 1,
      title: "DSCVR",
      text: "Coming soon",
    },
    {
      key: 2,
      title: "Distrikt",
      text: "Coming soon",
    },
    {
      key: 3,
      title: "Duance",
      text: "Title list",
      date: "2022-02-20 12:00",
    },
  ];

  const classes = useGlobalStyles();

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>Social media</Typography>

      {content.map((item) => {
        return (
          <Box className={classes.sectionContent} key={item.key}>
            <Typography fontSize="20px" fontWeight={500}>
              {item.title}
            </Typography>

            <Box sx={{ height: "120px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography color="text.666">Coming soon</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
