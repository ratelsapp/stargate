import React from "react";
import useWalletConnector from "hooks/useWalletConnector";
import ConnectWalletModal from "./components/WalletConnect/ConnectWalletModal";

export default function App({ children }: { children: React.ReactElement }) {
  useWalletConnector();

  return (
    <>
      {children}
      <ConnectWalletModal title="Connect Wallet"></ConnectWalletModal>
    </>
  );
}
