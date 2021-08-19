import axios from "axios";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

const baseConfig = {
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
};

const service = axios.create(baseConfig);

export const injectCookieService = (cookie?: string) =>
  axios.create(
    cookie
      ? {
          ...baseConfig,
          headers: {
            cookie,
          },
        }
      : baseConfig
  );

export default service;
