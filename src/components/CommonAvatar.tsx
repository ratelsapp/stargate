import { Avatar } from "@mui/material";

interface CommonAvatarProps {
  src: string | undefined;
  width?: string;
  height?: string;
  borderRadius?: string;
}

export default function CommonAvatar({
  src,
  width = "80px",
  height = "80px",
  borderRadius = "2px",
}: CommonAvatarProps) {
  return <Avatar src={src} sx={{ width, height, borderRadius }} />;
}
