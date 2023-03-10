import React from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  target?: "_self" | "_blank" | "_parent" | "_top" | string;
}

export default function Link({ href, children, target }: LinkProps) {
  return (
    <a href={href} target={target ?? "_blank"} rel="noreferrer">
      {children}
    </a>
  );
}
