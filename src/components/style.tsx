import { makeStyles } from "@mui/styles";

export const useGlobalStyles = makeStyles(() => {
  return {
    sectionTitle: {
      fontWeight: 500,
      fontSize: "36px",
    },
    sectionContent: {
      background: "#FAFAFA",
      borderRadius: "8px",
      padding: "16px 25px",
      margin: "30px 0 0 0",
    },
    sectionContentTitle: {
      fontWeight: 500,
      fontSize: "22px",
    },
    standardLabel: {
      background: "#4CA0EB",
      borderRadius: "2px",
      padding: "0 5px",
      height: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});
