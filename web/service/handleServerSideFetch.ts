import axios, { AxiosInstance } from "axios";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { injectCookieService } from ".";

const handleServerSideFetch = (
  fetch: (
    service: AxiosInstance,
    ctx: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<any>>
) => {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<any>> => {
    try {
      const service = injectCookieService(ctx);

      return await fetch(service, ctx);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.response);

        switch (e.response?.status) {
          case 401:
            return {
              redirect: {
                destination: "/",
                permanent: true,
              },
            };
          default:
            return {
              redirect: {
                destination: `/error/${e.response?.status}`,
                permanent: false,
              },
            };
        }
      } else {
        return {
          redirect: {
            destination: "/error/500",
            permanent: false,
          },
        };
      }
    }
  };
};

export default handleServerSideFetch;
