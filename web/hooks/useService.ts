import { useState } from "react";
import RequestStatus from "../types/RequestStatus";

const useService = (service: (payload?: any) => Promise<any>) => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>();

  const fetch = async (payload?: any) => {
    try {
      setRequestStatus("loading");

      const res = await service(payload);

      setRequestStatus("success");
      return res;
    } catch (error) {
      setRequestStatus("error");
      throw error;
    }
  };

  return { fetch, requestStatus };
};

export default useService;
