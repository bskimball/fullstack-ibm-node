import ky from "ky-universal";
import Cookies from "universal-cookie";
import Router from "next/router";
import { NormalizedOptions } from "ky";

const cookies = new Cookies();

const refreshToken = async (request: any) => {
  const { accessToken } = await ky
    .post("http://localhost:3000/api/refresh")
    .json();
  cookies.set("access_token", accessToken);
  request.headers.set("Authorization", `Bearer ${accessToken}`);
};

export default ky.create({
  prefixUrl: "http://localhost:3000/api",
  hooks: {
    beforeRequest: [
      (request: Request) => {
        const accessToken = cookies.get("access_token");
        request.headers.set("Authorization", `Bearer ${accessToken}`);
      },
    ],
    beforeRetry: [
      async ({ request }: { request: Request }) => {
        await refreshToken(request);
      },
    ],
    afterResponse: [
      async (
        request: Request,
        _options: NormalizedOptions,
        response: Response
      ) => {
        [403, 401].map(async (code: number) => {
          if (response.status === code) {
            if (request.url.includes("/api/refresh")) {
              cookies.remove("access_token");
              return await Router.push("/login");
            }
            await refreshToken(request);
            await ky(request);
          }
        });
      },
    ],
  },
});
