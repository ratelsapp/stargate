import { createContext } from "react";

export type GlobalContext = {
  avatar: string;
  setAvatar: (avatar: string) => void;
  connectWalletOpen: boolean;
  setConnectWalletOpen: (open: boolean) => void;
};

export default createContext<GlobalContext>({} as GlobalContext);
