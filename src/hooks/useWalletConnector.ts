import { useIsConnected } from "store/wallet/hooks";
import { useEffect, useContext } from "react";
import GlobalContext from "../context";

export default function useWalletConnector() {
  const globalContext = useContext(GlobalContext);

  const isConnected = useIsConnected();

  useEffect(() => {
    if (!isConnected) {
      globalContext.setConnectWalletOpen(true);
    }
  }, [isConnected]);
}
