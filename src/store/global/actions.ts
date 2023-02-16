import { createAction } from "@reduxjs/toolkit";
import { GlobalState } from "./states";

export const updateNFT = createAction<GlobalState>("global/updateNFT");
