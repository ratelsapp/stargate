import React from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export default function TextLink({ href, children }: LinkProps) {
  return (
    <a href={href} target="_blank" style={{ color: "#4CA0EB" }} rel="noreferrer">
      {children}
    </a>
  );
}
