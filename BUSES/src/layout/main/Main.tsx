import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Main = ({ children }: Props) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};
