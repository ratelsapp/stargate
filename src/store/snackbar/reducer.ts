import { createReducer } from "@reduxjs/toolkit";
import { closeSnackbar, openSnackbar } from "./actions";
import { initialState } from "./states";

export default createReducer(initialState, (builder) => {
  builder
    .addCase(openSnackbar, (state, { payload }) => {
      return {
        ...state,
        open: true,
        message: payload.message ? payload.message : initialState.message,
        close: false,
        type: payload.type,
      };
    })
    .addCase(closeSnackbar, (state) => {
      return {
        ...state,
        open: false,
        message: "",
        close: true,
      };
    });
});
