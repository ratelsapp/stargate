import { createAction } from "@reduxjs/toolkit";

export const updateTokenLogo = createAction<{ canisterId: string; logo: string }>("global/updateTokenLogo");
