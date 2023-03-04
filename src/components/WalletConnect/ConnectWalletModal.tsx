import { Dialog, Box, Typography } from "@mui/material";
import { useState, useContext } from "react";
import PlugIcon from "./PlugIcon";
import StoicIcon from "./StoicIcon";
import { WalletType } from "constants/index";
import { Connector } from "utils/connector/index";
import GlobalContext from "../../context";

interface ConnectWalletModalProps {
  onClose?: () => void;
  title: string;
}

const Wallets = [
  { icon: PlugIcon, name: WalletType.PLUG },
  { icon: StoicIcon, name: WalletType.STOIC },
];

export default function ConnectWalletModal({ onClose, title }: ConnectWalletModalProps) {
  const [loading, setLoading] = useState<undefined | string>(undefined);

  const { connectWalletOpen, setConnectWalletOpen } = useContext(GlobalContext);

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
        setConnectWalletOpen(false);
      }

      setLoading(undefined);
    } catch (error) {
      console.error(error);
      setLoading(undefined);
      // const w = getWallet(wallet);
      // openErrorTip(t`Failed to connect to ${w ? w.label : "wallet"}.`);
    }
  };

  return (
    <Dialog
      open={connectWalletOpen}
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
