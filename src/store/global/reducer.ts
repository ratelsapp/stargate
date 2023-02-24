import { updateTokenLogo } from "./actions";
import { initialState } from "./states";

import { createReducer } from "@reduxjs/toolkit";

export default createReducer(initialState, (builder) => {
  builder.addCase(updateTokenLogo, (state, { payload }) => {
    return {
      ...state,
      logos: {
        ...state.logos,
        [payload.canisterId]: payload.logo,
      },
    };
  });
});
