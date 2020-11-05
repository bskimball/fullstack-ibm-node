import { NextPage } from "next";
import nextCookies from "next-cookies";
import Router from "next/router";

export default function withGuard(Component: any) {
  const Wrapper: NextPage<any> = (props) => <Component {...props} />;

  Wrapper.getInitialProps = async (ctx: any) => {
    const redirectOnError = () => {
      const url = process.env.CLIENT_ADDRESS || `http://localhost:3000`;
      if (typeof window != "undefined") {
        Router.push("/login");
      } else {
        ctx.res.writeHead(302, { Location: `${url}/login` });
        ctx.res.end();
      }
    };

    const token = nextCookies(ctx).access_token;

    if (!token) {
      return redirectOnError();
    }

    return token;
  };

  return Wrapper;
}
