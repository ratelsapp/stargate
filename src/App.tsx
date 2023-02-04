import React, { useState } from "react";
import { useInitialWallet } from "store/wallet/hooks";
import GlobalContext from "./components/GlobalContext";

export default function App({ children }: { children: React.ReactElement }) {
  useInitialWallet();

  const [open, setOpen] = useState(false);

  return <GlobalContext.Provider value={{ open, setOpen }}>{children}</GlobalContext.Provider>;
}
