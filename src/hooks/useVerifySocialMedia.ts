import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ResultStatus, SocialMedia } from "types/global";
import { getVerifyBaseInfo } from "hooks/calls";
import { useUserVerify } from "hooks/index";
import { useTips } from "./useTips";

export function useParamsCode() {
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    let code = undefined;

    for (const [key, value] of searchParams.entries()) {
      if (key === "code") {
        code = value;
      }
    }

    setCode(code);
  }, [searchParams]);

  return useMemo(() => code, [code]);
}

export function useURLCodeCheck() {
  const code = useParamsCode();

  const [social, setSocial] = useState<SocialMedia | undefined>(undefined);

  useEffect(() => {
    if (code) {
      if (code.length === 20) {
        setSocial(SocialMedia.Github);
      } else if (code.length === 30) {
        setSocial(SocialMedia.Discord);
      } else if (code.length === 91) {
        setSocial(SocialMedia.Twitter);
      }
    }
  }, [code]);

  return useMemo(
    () => ({
      code,
      social,
    }),
    [social, code]
  );
}

export default function useVerifySocialMedia() {
  const verify = useUserVerify();
  const { code, social } = useURLCodeCheck();
  const [openTip] = useTips();

  useEffect(() => {
    async function call() {
      if (code && social) {
        const result = await getVerifyBaseInfo(code, social);

        if (result.code === 200) {
          const res = await verify(social, result.data);
          if (res.status === ResultStatus.OK) {
            openTip("Verify successfully", "success");
          } else {
            openTip(res.message, "error");
          }
        }
      }
    }

    call();
  }, [code, social]);
}
