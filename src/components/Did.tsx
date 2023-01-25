import { Box, Typography } from "@mui/material";
import { useGlobalStyles } from "./style";

export default function Did() {
  const content = [
    {
      key: 1,
      title: "ICNS",
      text: "tomada.icp",
    },
    {
      key: 2,
      title: "ICNAMING",
      text: "tomada.icp",
    },
    {
      key: 3,
      title: "Dmail",
      text: "topme111@dmail.icp | tomada.icp ",
    },
  ];

  const classes = useGlobalStyles();

  return (
    <Box sx={{ padding: "0 0 0 390px", margin: "60px 0 0 0" }}>
      <Typography sx={{ fontWeight: 500, fontSize: "36px" }}>DID</Typography>

      {content.map((item) => {
        return (
          <Box className={classes.sectionContent} sx={{ margin: "24px 0 0 0" }} key={item.key}>
            <Typography fontSize="20px" fontWeight={500}>
              {item.title}
            </Typography>
            <Typography fontSize="18px" sx={{ margin: "15px 0 0 0" }} color="text.333">
              {item.text}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
