import React, { ReactNode } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/core";
import ColorModeSwitch from "./ColorModeSwitch";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <Box position="fixed" p={4} right={1} top={1} zIndex={9999}>
      <ColorModeSwitch />
    </Box>
    {children}
  </div>
);

export default Layout;
