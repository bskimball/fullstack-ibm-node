import React from "react";
import NextLink from "next/link";
import { Flex, Stack, Button, Box } from "@chakra-ui/core";
import { http } from "../utils";
import { useRouter } from "next/router";

const items = [
  { title: "Home", href: "/" },
  { title: "Todo", href: "/todo" },
];

type Item = {
  title: string;
  href: string;
};

const currentYear = new Date().getFullYear();

function Sidebar() {
  const router = useRouter();

  return (
    <Flex direction="column" height="100%">
      <Stack as="nav" spacing={2}>
        {items.map((item: Item) => (
          <Box key={item.title}>
            <NextLink href={item.href} passHref>
              <Button as="a" variant="ghost" justifyContent="start">
                {item.title}
              </Button>
            </NextLink>
          </Box>
        ))}
        <Box>
          <Button onClick={handleLogout} variant="ghost" justifyContent="start">
            Logout
          </Button>
        </Box>
      </Stack>
      <Box mt="auto">&copy;{currentYear} BDKinc</Box>
    </Flex>
  );

  async function handleLogout() {
    try {
      await http.post("logout");
      await router.push("/login");
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Sidebar;
