import { updateNFT } from "./actions";
import { initialState } from "./states";

import { createReducer } from "@reduxjs/toolkit";

export default createReducer(initialState, (builder) => {
  builder.addCase(updateNFT, (state, { payload }) => {
    return {
      ...state,
      ...payload,
    };
  });
});
