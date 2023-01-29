import Logo from "../assets/images/logo.svg";
import { Box, Typography } from "@mui/material";
import ConnectWalletModal from "./WalletConnect/ConnectWalletModal";
import { useConnectorModalManager } from "store/wallet/hooks";
import { useIsConnected } from "store/wallet/hooks";
import { useEffect } from "react";

function ConnectIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.206 4.23255C23.067 4.23255 22.9558 4.23255 22.8446 4.23255C16.7299 4.23255 10.6159 4.23186 4.50117 4.23534C4.32184 4.23534 4.13277 4.24438 3.96456 4.29932C3.45297 4.46694 3.17077 4.98231 3.25904 5.54289C3.33689 6.03461 3.78245 6.42548 4.2982 6.43035C5.20877 6.438 6.11934 6.43383 7.02991 6.43383C11.9908 6.43383 16.9516 6.43383 21.9132 6.43383C22.7779 6.43383 23.2185 6.86504 23.2192 7.72051C23.2206 11.687 23.2213 15.6541 23.2185 19.6206C23.2179 20.867 22.5248 21.7419 21.3682 21.97C21.2417 21.9951 21.1096 21.9985 20.9804 21.9985C15.0651 21.9999 9.15062 22.0006 3.23541 21.9992C2.04403 21.9992 1.10983 21.1229 1.01599 19.9273C1.00695 19.8147 1.00209 19.702 1.00209 19.5893C1.00209 14.5274 1.00487 9.46762 1 4.40712C0.999306 3.39099 1.3969 2.62246 2.33388 2.19333C2.59315 2.0744 2.90107 2.00833 3.18675 2.00763C9.49191 1.99789 15.7971 1.99998 22.1022 2.00068C22.6917 2.00068 23.1567 2.41102 23.1998 2.99803C23.2297 3.39377 23.206 3.79369 23.206 4.23255ZM17.6738 14.2103C17.6696 15.1311 18.3849 15.8635 19.3031 15.8781C20.229 15.8927 20.9727 15.1631 20.9811 14.2318C20.9887 13.3152 20.2596 12.5703 19.3504 12.5668C18.4127 12.5626 17.678 13.2832 17.6738 14.2103Z"
        fill="black"
      />
    </svg>
  );
}

export default function TopBar() {
  const [, connectorManager] = useConnectorModalManager();

  const isConnected = useIsConnected();

  useEffect(() => {
    if (!isConnected) {
      connectorManager(true);
    }
  }, [isConnected]);

  return (
    <>
      <Box sx={{ display: "flex", padding: "40px 60px 0", alignItems: "center" }}>
        <img src={Logo} style={{ width: "172px", height: "36px" }} />

        {/* <Box sx={{ flex: "auto", display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => connectorManager(true)}>
            <ConnectIcon></ConnectIcon>
            <Typography sx={{ margin: "0 0 0 10px" }}>Connect Wallet</Typography>
          </Box>
        </Box> */}
      </Box>

      <ConnectWalletModal title="Connect Wallet"></ConnectWalletModal>
    </>
  );
}
