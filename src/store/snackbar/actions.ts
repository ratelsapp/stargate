import { createAction } from "@reduxjs/toolkit";
import { MessageTypes } from "types/tips";

export const openSnackbar = createAction<{ message: string; type: MessageTypes }>("snackbar/openSnackbar");
export const closeSnackbar = createAction<void>("snackbar/closeSnackbar");
