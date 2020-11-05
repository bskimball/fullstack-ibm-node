import React from "react";
import Layout from "../components/Layout";
import { Divider, Flex, Text, useColorMode } from "@chakra-ui/core";
import RegistrationForm from "../components/RegistrationForm";
import cookies from "next-cookies";
import Router from "next/router";

function RegisterPage() {
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
              Register
            </Text>
          </Flex>
          <Divider
            orientation="vertical"
            borderColor="gray.300"
            minHeight="16em"
          />
          <Flex px={8} align="center" justify="start" minWidth="36em">
            <RegistrationForm />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}

RegisterPage.getInitialProps = async (ctx: any) => {
  const token = cookies(ctx).access_token;
  if (token) {
    if (typeof window != "undefined") {
      Router.push("/");
    } else {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    }
  }
  return {};
};

export default RegisterPage;
