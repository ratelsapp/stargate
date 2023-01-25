export interface SnackbarState {
  action: boolean;
  open: boolean;
  message: string;
  anchorOrigin: {
    vertical: string;
    horizontal: string;
  };
  variant: string;
  alertSeverity: string;
  transition: string;
  close: boolean;
  actionButton: boolean;
  autoHideDuration: number;
}

export const initialState: SnackbarState = {
  action: false,
  open: false,
  message: "No Message Founded",
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
  variant: "default",
  alertSeverity: "success",
  transition: "Fade",
  close: true,
  actionButton: false,
  autoHideDuration: 4000,
};
