import React, { useState } from "react";
import { Box, Typography, TextField, CircularProgress } from "@mui/material";
import { updateNickName } from "hooks/index";
import { UserAccountResponse } from "types/api";
import { ResultKey } from "types/global";
import { useEffect } from "react";

interface NickNameProps {
  profile: UserAccountResponse | undefined;
  isOwner: boolean;
  onUpdateSuccess?: () => void;
}

export default function NickName({ profile, isOwner, onUpdateSuccess }: NickNameProps) {
  const [isEditNick, setIsEditNick] = useState(false);
  const [nickName, setNickName] = useState<string | undefined>(undefined);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setNickName(profile?.nickname);
  }, [profile]);

  const handleSaveNick = async () => {
    if (!nickName) return;

    setUpdating(true);

    const { status } = await updateNickName(nickName);

    if (status === ResultKey.OK) {
      setIsEditNick(false);
      if (onUpdateSuccess) onUpdateSuccess();
    }

    setUpdating(false);
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

  const handleCancel = () => {
    setIsEditNick(false);
    setNickName(profile?.nickname);
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
        <Typography
          fontSize="58px"
          fontWeight={700}
          sx={{ maxWidth: "240px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {nickName}
        </Typography>
      )}

      {isOwner ? (
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
          {updating ? (
            <CircularProgress size={16} sx={{ color: "#666", margin: "0 6px 0 0" }}></CircularProgress>
          ) : null}
          <Typography color="secondary" fontSize="16px" fontWeight={500}>
            {isEditNick ? "Save" : "Edit"}
          </Typography>
        </Box>
      ) : null}

      {isOwner && isEditNick ? (
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
          onClick={handleCancel}
        >
          <Typography color="secondary" fontSize="16px" fontWeight={500}>
            {"Cancel"}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}
