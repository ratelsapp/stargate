import React, { useState } from "react";
import { useInitialWallet } from "store/wallet/hooks";
import GlobalContext from "./context";
// import { useFetchICPPrice } from "hooks/index";

export default function App({ children }: { children: React.ReactElement }) {
  useInitialWallet();

  // useFetchICPPrice();

  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>("");

  return <GlobalContext.Provider value={{ open, setOpen, setAvatar, avatar }}>{children}</GlobalContext.Provider>;
}
