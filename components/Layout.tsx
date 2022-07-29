import React, { ReactNode } from "react";
import { Header } from "./";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
};

export default Layout;
