import React, { useState } from "react";
import { useInitialWallet } from "store/wallet/hooks";
import GlobalContext from "./context";
// import { useFetchICPPrice } from "hooks/index";
import Global from "./Global";

export default function App({ children }: { children: React.ReactElement }) {
  useInitialWallet();

  // useFetchICPPrice();

  const [connectWalletOpen, setConnectWalletOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>("");

  return (
    <GlobalContext.Provider value={{ connectWalletOpen, setConnectWalletOpen, setAvatar, avatar }}>
      <Global>{children}</Global>
    </GlobalContext.Provider>
  );
}
