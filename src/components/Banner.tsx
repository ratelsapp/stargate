import { useState } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import avatar from "../assets/images/banner/m1.svg";
import m2 from "../assets/images/banner/m2.svg";
import m3 from "../assets/images/banner/m3.svg";
import m4 from "../assets/images/banner/m4.svg";
import m5 from "../assets/images/banner/m5.svg";
import { useAccount, usePrincipal } from "store/wallet/hooks";
import EditAvatarIcon from "assets/images/EditAvatarIcon.svg";
import CopyIcon from "assets/images/Copy";
import CopyToClipboard from "copy-to-clipboard";
import { Twitter, ShallowTwitter } from "assets/images/Twitter";
import { Github, ShallowGithub } from "assets/images/Github";
import { Discord, ShallowDiscord } from "assets/images/Discord";
import Link from "components/Link";
import { useAccountProfile, useUser, useAccountFollower, follow, unFollow } from "hooks/index";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { Principal } from "@dfinity/principal";
import NickName from "components/Profile/NickName";

export default function Banner() {
  const images = [
    {
      key: 1,
      src: m2,
    },
    {
      key: 2,
      src: m3,
    },
    {
      key: 3,
      src: m4,
    },
    {
      key: 4,
      src: m5,
    },
  ];

  const [reload, setReload] = useState(false);

  const { principal: userPrincipal } = useParams<{ principal: string }>();

  const account = useAccount();
  const principal = usePrincipal();

  const handleUnFollow = async () => {
    if (!principal || !userPrincipal) return;
    const result = await unFollow(Principal.fromText(userPrincipal));
    setReload(!reload);
  };

  const handleFollow = async () => {
    if (!principal || !userPrincipal) return;
    const result = await follow(Principal.fromText(userPrincipal));
    setReload(!reload);
  };

  const handleCopyPrincipal = () => {
    CopyToClipboard(principal?.toString() ?? "");
  };

  const handleCopyAccount = () => {
    CopyToClipboard(account);
  };

  const { result: profile } = useAccountProfile(userPrincipal, reload);
  const { result: user } = useUser(userPrincipal, reload);
  const { result: follower } = useAccountFollower(userPrincipal, reload);

  const isFollowing = useMemo(() => {
    if (!follower || !principal) return false;
    return !!follower.find((user) => user.toString() === principal.toString());
  }, [follower, principal]);

  return (
    <Box sx={{ paddingTop: "60px", display: "flex" }}>
      <Box sx={{ width: "340px", height: "340px", position: "relative" }}>
        <Avatar src={avatar} sx={{ width: "340px", height: "340px", borderRadius: "16px" }} />

        <Avatar
          src={EditAvatarIcon}
          sx={{
            width: "44px",
            height: "44px",
            position: "absolute",
            right: "16px",
            bottom: "16px",
            cursor: "pointer",
          }}
        ></Avatar>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0 10px",
            margin: "10px 0 0 0",
          }}
        >
          {images.map((data) => {
            return (
              <Avatar key={data.key} src={data.src} sx={{ width: "60px", height: "60px", borderRadius: "12px" }} />
            );
          })}
        </Box>
      </Box>

      <Box sx={{ flex: "auto", margin: "0 0 0 50px" }}>
        <NickName profile={profile}></NickName>

        <Box
          sx={{
            display: "grid",
            gap: "10px 0",
            gridTemplateRows: "1fr 1fr",
            margin: "20px 0 0 0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: 500, margin: "0 10px 0 0" }} component="span">
              Account ID:
            </Typography>
            <Typography style={{ wordBreak: "break-all" }} component="span" color="secondary">
              {user?.account}
            </Typography>

            <Box
              sx={{
                margin: "0 0 0 5px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleCopyAccount}
            >
              <CopyIcon />
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: 500, margin: "0 10px 0 0" }} component="span">
              Principal ID:
            </Typography>
            <Typography color="secondary" component="span">
              {user?.principalId}
            </Typography>

            <Box
              sx={{
                margin: "0 0 0 5px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleCopyPrincipal}
            >
              <CopyIcon />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            margin: "40px 0 0 0",
            display: "grid",
            gap: "0 20px",
            gridTemplateColumns: "fit-content(44px) fit-content(44px) fit-content(44px)",
          }}
        >
          <Box sx={{ width: "44px", height: "44px" }}>
            {user?.twitter[0] ? (
              <Link href={`https://twitter.com/${user?.twitter[0].replace(/@/g, "")}`}>
                <Twitter></Twitter>
              </Link>
            ) : (
              <ShallowTwitter></ShallowTwitter>
            )}
          </Box>

          <Box sx={{ width: "44px", height: "44px" }}>
            {user?.discord[0] ? (
              <Link href="https://discord.com">
                <Discord></Discord>
              </Link>
            ) : (
              <ShallowDiscord></ShallowDiscord>
            )}
          </Box>

          <Box sx={{ width: "44px", height: "44px" }}>
            {user?.github[0] ? (
              <Link href={`https://github.com/${user?.github[0]}`}>
                <Github></Github>
              </Link>
            ) : (
              <ShallowGithub></ShallowGithub>
            )}
          </Box>
        </Box>

        <Box sx={{ margin: "40px 0 0 0", display: "flex" }}>
          <Box>
            <Typography fontSize="22px" fontWeight={600}>
              {profile?.following.toString()}
            </Typography>
            <Typography color="text.secondary" sx={{ marginTop: "10px" }}>
              Followings
            </Typography>
          </Box>
          <Box sx={{ flex: "auto", margin: "0 0 0 80px" }}>
            <Typography fontSize="22px" fontWeight={600}>
              {profile?.followers.toString()}
            </Typography>
            <Typography color="text.secondary" sx={{ marginTop: "10px" }}>
              Followers
            </Typography>
          </Box>
        </Box>

        <Box sx={{ margin: "40px 0 0 0" }}>
          <Button onClick={isFollowing ? handleUnFollow : handleFollow} variant="contained">
            {isFollowing ? "UnFollow" : "Follow on STARGATE"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}