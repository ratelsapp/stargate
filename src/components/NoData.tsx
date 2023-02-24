import { Box, Typography } from "@mui/material";

export default function NoData() {
  return (
    <Box sx={{ display: "flex", minHeight: "150px", alignItems: "center", justifyContent: "center" }}>
      <Typography>No Data</Typography>
    </Box>
  );
}
