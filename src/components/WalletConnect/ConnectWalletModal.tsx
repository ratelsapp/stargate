import { Dialog, Box, Typography } from "@mui/material";
import { useState, useContext } from "react";
import PlugIcon from "./PlugIcon";
import StoicIcon from "./StoicIcon";
import { WalletType } from "constants/index";
import { Connector } from "utils/connector/index";
import GlobalContext from "../GlobalContext";

interface ConnectWalletModalProps {
  onClose?: () => void;
  title: string;
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.6508 13.9643L15.6254 13.939L9.68645 8.00004L15.0468 2.63978L15.6253 2.06122L15.6507 2.03579C16.1164 1.57012 16.1164 0.815044 15.6507 0.349334C15.1851 -0.116376 14.43 -0.116336 13.9643 0.349334L13.9389 0.374804H13.9389L8.00004 6.31359L2.24975 0.563379L2.03566 0.349252C1.56999 -0.116417 0.814922 -0.116417 0.349252 0.349252C-0.116417 0.814962 -0.116417 1.57 0.349252 2.03571L0.563338 2.24979L0.953204 2.63966L6.31355 8L0.563338 13.7503L0.349252 13.9643C-0.116417 14.4301 -0.116417 15.1851 0.349252 15.6508C0.814922 16.1165 1.56999 16.1165 2.0357 15.6508L2.24975 15.4367L2.6397 15.0468L7.99996 9.68654L13.3603 15.0468L13.9388 15.6254L13.9642 15.6508C14.4299 16.1165 15.185 16.1165 15.6507 15.6508C16.1163 15.1852 16.1164 14.4301 15.6507 13.9644L15.6508 13.9643Z"
        fill="#CCCCCC"
      />
    </svg>
  );
}

const Wallets = [
  { icon: PlugIcon, name: WalletType.PLUG },
  { icon: StoicIcon, name: WalletType.STOIC },
];

export default function ConnectWalletModal({ onClose, title }: ConnectWalletModalProps) {
  const [loading, setLoading] = useState<undefined | string>(undefined);

  const { open, setOpen } = useContext(GlobalContext);

  const handleConnect = async (wallet: string) => {
    if (loading) return;

    try {
      if (window.ic && !window.ic.plug && wallet === WalletType.PLUG) {
        // openErrorTip(t`Please install the plug wallet extension!`);
        return;
      }

      setLoading(wallet);

      const connector = new Connector();
      await connector.create(wallet as WalletType);
      const isConnected = await connector.connect();

      if (isConnected) {
        setOpen(false);
      }

      setLoading(undefined);
    } catch (error) {
      console.error(error);
      setLoading(undefined);
      // const w = getWallet(wallet);
      // openErrorTip(t`Failed to connect to ${w ? w.label : "wallet"}.`);
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          minWidth: "544px",
          padding: "32px",
          borderRadius: "24px",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", margin: "0 0 32px 0" }}>
        <Typography sx={{ fontSize: "36px", fontWeight: 600, flex: " auto" }}>{title}</Typography>
        {/* <Box sx={{ cursor: "pointer" }} onClick={handleClose}>
          <CloseIcon></CloseIcon>
        </Box> */}
      </Box>

      <Box>
        {Wallets.map((wallet) => (
          <Box
            key={wallet.name}
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #E7E7E7",
              borderRadius: "8px",
              padding: "17px 20px",
              marginTop: "24px",
              cursor: "pointer",
              "&:nth-of-type(0)": {
                marginTop: "0",
              },
            }}
            onClick={() => handleConnect(wallet.name)}
          >
            <Box>
              {(() => {
                const Icon = wallet.icon;
                return <Icon loading={loading === wallet.name} />;
              })()}
            </Box>
            <Typography sx={{ margin: " 0 0 0 24px" }} fontSize="24px">
              {wallet.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Dialog>
  );
}
