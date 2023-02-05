export function componentStyleOverrides() {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "inherit",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          " .MuiPaper-root": {
            background: "#000",
            borderRadius: "8px",
            minWidth: "190px",
            padding: "12px 24px",
            " .MuiSnackbarContent-message": {
              fontSize: "18px",
              fontWeight: 500,
            },
          },
        },
      },
    },
  };
}
