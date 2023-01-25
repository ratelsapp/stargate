import React from "react";
import { useInitialWallet } from "store/wallet/hooks";

export default function App({ children }: { children: React.ReactElement }) {
  useInitialWallet();

  return children;
}
