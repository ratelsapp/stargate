import { MessageTypes } from "types/tips";

export interface SnackbarState {
  open: boolean;
  message: string;
  close: boolean;
  type: MessageTypes;
}

export const initialState: SnackbarState = {
  open: false,
  message: "No Message Founded",
  close: true,
  type: "normal",
};
