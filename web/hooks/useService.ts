import { AxiosResponse } from "axios";
import { useState } from "react";
import RequestStatus from "../types/RequestStatus";
import { mutate } from "swr";

const useService = (
  service: (payload?: any) => Promise<AxiosResponse>,
  mutateSWRKey?: string
) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>();

  const fetch = async (payload?: any) => {
    try {
      setRequestStatus("loading");

      const res = await service(payload);

      if (mutateSWRKey) mutate(mutateSWRKey);

      setRequestStatus("success");
      return res.data;
    } catch (error) {
      setRequestStatus("error");
      throw error;
    }
  };

  return { fetch, requestStatus };
};

export default useService;
