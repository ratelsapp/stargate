import { Box, Typography, Popper } from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import { useIsConnected, usePrincipal, useUserLogout } from "store/wallet/hooks";
import { useState, useRef, useContext } from "react";
import ComLogo from "../assets/images/ratelsComLogo.svg";
import Logo from "../assets/images/logo.svg";
import Online from "../assets/images/online.svg";
import GlobalContext from "../context";
import { useNavigate, useParams } from "react-router-dom";

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
  const globalContext = useContext(GlobalContext);

  const isConnected = useIsConnected();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const logout = useUserLogout();

  const principal = usePrincipal();

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleDisconnect = () => {
    logout();
  };

  const navigate = useNavigate();

  const { principal: paramPrincipal } = useParams() as { principal: string };

  const handleProfile = () => {
    if (paramPrincipal === principal?.toString()) return;
    navigate(`/user/${principal?.toString()}`);
  };

  return (
    <>
      <Box sx={{ display: "flex", padding: "40px 60px 0", alignItems: "center" }}>
        <img src={Logo} style={{ width: "172px", height: "36px" }} alt="" />

        <Box sx={{ flex: "auto", display: "flex", justifyContent: "flex-end" }}>
          {!isConnected ? (
            <Box
              sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              onClick={() => globalContext.setConnectWalletOpen(true)}
            >
              <ConnectIcon></ConnectIcon>
              <Typography sx={{ margin: "0 0 0 10px" }}>Connect Wallet</Typography>
            </Box>
          ) : null}
          {isConnected ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <a href="https://5fcuc-3aaaa-aaaam-qabea-cai.raw.ic0.app/#/" target="_blank" rel="noreferrer">
                <img src={ComLogo} style={{ width: "92px", height: "32px" }} alt=""></img>
              </a>
              <Box sx={{ width: "1px", height: "24px", background: "#CCCCCC", margin: "0 32px" }}></Box>
              <Box
                sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
              >
                <img src={Online} style={{ width: "40px", height: "40px" }} alt=""></img>
                <Typography
                  sx={{
                    margin: "0 0 0 10px",
                    width: "100px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {principal?.toString()}
                </Typography>

                <Popper open={open} anchorEl={ref?.current} placement="bottom">
                  <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "120px",
                        borderRadius: "8px",
                        background: "#000",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 5px",
                      }}
                    >
                      <Typography
                        sx={{
                          height: "40px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        fontWeight={500}
                        color="#ffffff"
                        onClick={handleProfile}
                      >
                        Profile
                      </Typography>
                      <Box sx={{ background: "#fff", height: "1px", width: "100%" }}></Box>
                      <Typography
                        sx={{
                          height: "40px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        fontWeight={500}
                        color="#ffffff"
                        onClick={handleDisconnect}
                      >
                        Disconnect
                      </Typography>
                    </Box>
                  </ClickAwayListener>
                </Popper>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
