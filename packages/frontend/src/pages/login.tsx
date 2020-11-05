import React from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import { Flex, Divider, Text, useColorMode } from "@chakra-ui/core";
import LoginForm from "../components/LoginForm";
import cookies from "next-cookies";

function LoginPage() {
  const { colorMode } = useColorMode();

  return (
    <Layout title="Login">
      <Flex
        justify="center"
        align="center"
        minHeight="100vh"
        minWidth="100vw"
        bg={colorMode === "light" ? "gray.100" : ""}
      >
        <Flex p={8} justify="center" align="center">
          <Flex px={8} align="center" justify="end">
            <Text as="h1" fontSize="2xl">
              Log in
            </Text>
          </Flex>
          <Divider
            orientation="vertical"
            borderColor="gray.300"
            minHeight="16em"
          />
          <Flex px={8} align="center" justify="start" minWidth="36em">
            <LoginForm />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}

LoginPage.getInitialProps = async (ctx: any) => {
  const token = cookies(ctx).access_token;
  if (token) {
    if (typeof window != "undefined") {
      Router.push("/");
    } else {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    }
  }
  return { message: "login" };
};

export default LoginPage;
