import React from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export default function Link({ href, children }: LinkProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
