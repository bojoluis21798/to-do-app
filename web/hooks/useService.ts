import { AxiosResponse } from "axios";
import { useState } from "react";

const useService = (service: (payload?: any) => Promise<AxiosResponse>) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState();

  const fetch = async (payload?: any) => {
    try {
      setIsLoading(true);

      const res = await service(payload);

      setIsLoading(false);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { fetch, isLoading, error };
};

export default useService;
