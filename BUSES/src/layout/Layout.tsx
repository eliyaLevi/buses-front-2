import React from "react";
import { Header } from "./header/Header";
import { Main } from "./main/Main";
import { Footer } from "./footer/Footer";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Main children={children} />
      <Footer />
    </>
  );
};
