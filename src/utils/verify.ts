import lowerFirst from "lodash/lowerFirst";
import { SocialMedia } from "types/global";
import { VerifyType } from "types/stargate";

export const WEBSITE_URL = window.location.origin;

export const TwitterVerifyURL = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=dVJLSzBFeVBEVTh6blhXdjY2VUQ6MTpjaQ&redirect_uri=${WEBSITE_URL}&scope=tweet.read+users.read+offline.access&state=ratels&code_challenge=challenge&code_challenge_method=plain`;

export const DiscordVerifyURL = `https://discord.com/api/oauth2/authorize?client_id=982876194980634686&redirect_uri=${WEBSITE_URL}&response_type=code&scope=identify`;

export const GithubVerifyURL = `https://github.com/login/oauth/authorize?client_id=f2e94d951f9681739f57&redirect_uri=${WEBSITE_URL}&scope=read:user`;

export const verifyTypeFormat = (type: SocialMedia) => {
  return { [lowerFirst(type)]: null } as VerifyType;
};
