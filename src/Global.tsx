import React from "react";
import useWalletConnector from "hooks/useWalletConnector";

export default function App({ children }: { children: React.ReactElement }) {
  useWalletConnector();

  return <>{children}</>;
}
