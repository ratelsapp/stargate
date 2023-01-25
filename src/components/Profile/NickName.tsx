import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { updateNickName } from "hooks/index";
import { UserAccountResponse } from "types/api";
import { ResultKey } from "types/global";
import { useEffect } from "react";

interface NickNameProps {
  profile: UserAccountResponse | undefined;
}

export default function NickName({ profile }: NickNameProps) {
  const [isEditNick, setIsEditNick] = useState(false);
  const [nickName, setNickName] = useState<string | undefined>(undefined);

  useEffect(() => {
    setNickName(profile?.nickname);
  }, [profile]);

  const handleSaveNick = async () => {
    if (!nickName) return;
    const { status } = await updateNickName(nickName);
    if (status === ResultKey.OK) {
      setIsEditNick(false);
    }
  };

  const handleNickName = async () => {
    if (isEditNick) {
      await handleSaveNick();
    } else {
      setIsEditNick(true);
    }
  };

  const handleNickChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {isEditNick ? (
        <TextField
          value={nickName}
          variant="standard"
          sx={{ height: "32px", "& .MuiInputBase-root": { height: "100%" } }}
          onChange={handleNickChange}
        ></TextField>
      ) : (
        <Typography fontSize="58px" fontWeight={700}>
          {nickName}
        </Typography>
      )}
      <Box
        sx={{
          width: "60px",
          height: "32px",
          background: "#F7F7F7",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          margin: "0 0 0 12px",
          position: "relative",
          top: "5px",
        }}
        onClick={handleNickName}
      >
        <Typography color="secondary" fontSize="16px" fontWeight={500}>
          {isEditNick ? "Save" : "Edit"}
        </Typography>
      </Box>
    </Box>
  );
}
