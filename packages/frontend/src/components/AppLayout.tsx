import React, { ReactNode } from "react";
import Layout from "./Layout";
import { Avatar, Box, Flex, useColorMode, Text } from "@chakra-ui/core";
import Sidebar from "./Sidebar";
import useAuth from "./useAuth";

type Props = {
  children?: ReactNode;
  title?: string;
};

function AppLayout({ children, title }: Props) {
  const { colorMode } = useColorMode();
  const { user } = useAuth();

  const sidebarWidth = 48;

  return (
    <Layout title={title}>
      <Box
        maxWidth={sidebarWidth}
        width="100%"
        height="100%"
        position="fixed"
        p={6}
        bg={colorMode === "dark" ? "gray.900" : "gray.200"}
      >
        <Sidebar />
      </Box>
      <Box pl={sidebarWidth} height="100%" minHeight="100vh">
        <Flex
          px={8}
          py={4}
          position="relative"
          direction="column"
          height="100%"
          minHeight="100vh"
        >
          <Flex mb={4} align="center" pr={16}>
            <Box>
              <Text fontSize="2xl">Fullstack JS App</Text>
            </Box>
            <Flex ml="auto" align="center">
              <Avatar name={user?.name} mr={4} />
              <Text alignItems="center">{user?.email}</Text>
            </Flex>
          </Flex>
          <Box as="main" flexGrow={1}>
            {children}
          </Box>
          <footer>
            <span>IBMi Fullstack JS Proof of Concept</span>
          </footer>
        </Flex>
      </Box>
    </Layout>
  );
}

export default AppLayout;
