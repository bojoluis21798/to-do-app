import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

const baseConfig = {
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
};

const service = axios.create(baseConfig);

export const injectCookieService = (ctx: GetServerSidePropsContext) =>
  axios.create(
    ctx.req?.headers?.cookie
      ? {
          ...baseConfig,
          headers: {
            cookie: ctx.req.headers.cookie,
          },
        }
      : baseConfig
  );

export default service;
