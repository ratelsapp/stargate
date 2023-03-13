import { useState, useContext } from "react";
import { Box, Avatar, Typography, Button, CircularProgress } from "@mui/material";
import { usePrincipal } from "store/wallet/hooks";
import CopyIcon from "assets/images/Copy";
import { Twitter, ShallowTwitter } from "assets/images/Twitter";
import { Github, ShallowGithub } from "assets/images/Github";
import { Discord, ShallowDiscord } from "assets/images/Discord";
import Link from "components/Link";
import { useAccountProfile, useUser, useAccountFollower, follow, unFollow } from "hooks/index";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { Principal } from "@dfinity/principal";
import NickName from "components/Profile/NickName";
import { principalToAccount } from "utils/index";
import Copy, { CopyChildProps } from "components/Copy";
import GlobalContext from "../context";
import { DiscordVerifyURL, GithubVerifyURL, TwitterVerifyURL } from "utils/verify";

export default function Banner() {
  const [reload, setReload] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const { principal: userPrincipal } = useParams<{ principal: string }>();

  const principal = usePrincipal();

  const { avatar } = useContext(GlobalContext);

  const handleUnFollow = async () => {
    if (!principal || !userPrincipal) return;
    setFollowLoading(true);
    await unFollow(Principal.fromText(userPrincipal));
    setReload(!reload);
    setFollowLoading(false);
  };

  const handleFollow = async () => {
    if (!principal || !userPrincipal) return;
    setFollowLoading(true);
    await follow(Principal.fromText(userPrincipal));
    setReload(!reload);
    setFollowLoading(false);
  };

  const { result: profile } = useAccountProfile(userPrincipal, reload);
  const { result: user } = useUser(userPrincipal, reload);
  const { result: follower } = useAccountFollower(userPrincipal, reload);

  const isFollowing = useMemo(() => {
    if (!follower || !principal) return false;
    return !!follower.find((user) => user.toString() === principal.toString());
  }, [follower, principal]);

  const isOwner = useMemo(() => {
    if (!principal || !userPrincipal) return false;
    return principal?.toString() === userPrincipal;
  }, [principal, userPrincipal]);

  const handleNickUpdated = () => {
    setReload(!reload);
  };

  return (
    <Box sx={{ paddingTop: "60px", display: "flex" }}>
      <Box sx={{ width: "340px", height: "340px", position: "relative" }}>
        <Avatar
          src={avatar}
          sx={{
            width: "340px",
            height: "340px",
            borderRadius: "16px",
            background: "#fafafa",
            "& .MuiSvgIcon-root": { display: "none" },
          }}
        />
      </Box>

      <Box sx={{ flex: "auto", margin: "0 0 0 50px" }}>
        <NickName profile={profile} isOwner={isOwner} onUpdateSuccess={handleNickUpdated}></NickName>

        <Box
          sx={{
            display: "grid",
            gap: "10px 0",
            gridTemplateRows: "1fr 1fr",
            margin: "20px 0 0 0",
          }}
        >
          <Copy content={principalToAccount(userPrincipal) ?? ""}>
            {({ copy }: CopyChildProps) => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500, margin: "0 10px 0 0" }} component="span">
                  Account ID:
                </Typography>
                <Typography style={{ wordBreak: "break-all" }} component="span" color="secondary">
                  {principalToAccount(userPrincipal) ?? "--"}
                </Typography>

                <Box
                  sx={{
                    margin: "0 0 0 5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={copy}
                >
                  <CopyIcon />
                </Box>
              </Box>
            )}
          </Copy>

          <Copy content={userPrincipal ?? ""}>
            {({ copy }: CopyChildProps) => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500, margin: "0 10px 0 0" }} component="span">
                  Principal ID:
                </Typography>
                <Typography color="secondary" component="span">
                  {userPrincipal ?? "--"}
                </Typography>

                <Box
                  sx={{
                    margin: "0 0 0 5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={copy}
                >
                  <CopyIcon />
                </Box>
              </Box>
            )}
          </Copy>
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
            ) : isOwner ? (
              <Link target="_self" href={TwitterVerifyURL}>
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
            ) : isOwner ? (
              <Link target="_self" href={DiscordVerifyURL}>
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
            ) : isOwner ? (
              <Link target="_self" href={GithubVerifyURL}>
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
              {profile?.following.toString() ?? "--"}
            </Typography>
            <Typography color="text.secondary" sx={{ marginTop: "10px" }}>
              Followings
            </Typography>
          </Box>
          <Box sx={{ flex: "auto", margin: "0 0 0 80px" }}>
            <Typography fontSize="22px" fontWeight={600}>
              {profile?.followers.toString() ?? "--"}
            </Typography>
            <Typography color="text.secondary" sx={{ marginTop: "10px" }}>
              Followers
            </Typography>
          </Box>
        </Box>

        {!isOwner ? (
          <Box sx={{ margin: "40px 0 0 0" }}>
            <Button onClick={isFollowing ? handleUnFollow : handleFollow} variant="contained">
              {followLoading ? (
                <CircularProgress size={16} sx={{ color: "#fff", margin: "0 6px 0 0" }}></CircularProgress>
              ) : null}
              {isFollowing ? "UnFollow" : "Follow on STARGATE"}
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
