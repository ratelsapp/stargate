import { Box } from "@mui/material";
import { useWallet } from "store/wallet/hooks";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function RedirectIndex() {
  const { principal } = useWallet();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (principal) {
      navigate(`/user/${principal}/?${searchParams.toString()}`);
    }
  }, [principal]);

  return <Box></Box>;
}
