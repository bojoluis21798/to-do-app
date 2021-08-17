import useSWR from "swr";
import service from "../service";
import RequestStatus from "../types/RequestStatus";

const fetcher = (url: string) => service.get(url).then((res) => res.data);

const useFetcher = (url: string) => {
  const { data, error } = useSWR(url, fetcher);

  const requestStatus: RequestStatus = (() => {
    if (!data && !error) return "loading";
    else if (data) return "success";
    else if (error) return "error";
  })();

  return {
    requestStatus,
    data,
    error,
  };
};

export default useFetcher;
