import { WalletType } from "constants/index";

export type LoginState = {
  principal: string;
  type: null | WalletType;
  account: string;
};

export interface AuthState {
  principal: string;
  type: null | WalletType;
  isConnected: boolean;
  account: string;
}

export const initialState: AuthState = {
  principal: "",
  type: null,
  isConnected: false,
  account: "",
};
