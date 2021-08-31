import { AxiosError } from "axios";
import useSWR, { SWRConfiguration } from "swr";
import service from "../service";

const fetcher = (url: string) => service.get(url).then((res) => res.data);

type UseFetcher = <T>(
  url: string,
  options?: SWRConfiguration
) => { isLoading: boolean; data: T; error: AxiosError };

const useFetcher: UseFetcher = (url, options) => {
  const { data, error } = useSWR(url, fetcher, options);

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};

export default useFetcher;
