import { ReactNode } from "react";
import CopyToClipboard from "copy-to-clipboard";
import isFunction from "lodash/isFunction";
import { useTips } from "hooks/useTips";

export interface CopyProps {
  children: ReactNode;
  content: string;
}

export type CopyChildProps = {
  copy: () => void;
};

export default function Copy({ content, children }: CopyProps) {
  const [open] = useTips();

  const handleClick = () => {
    CopyToClipboard(content);

    open("Copy success", "success");
  };

  return <>{isFunction(children) ? children({ copy: handleClick }) : children}</>;
}
