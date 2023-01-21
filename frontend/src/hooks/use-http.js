import { useState, useCallback } from "react";

const useHttp = instance => {
  const initialIsLoading = instance ? true : false;
  const [isLoading, setIsLoading] = useState(initialIsLoading);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async requestConfig => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      setIsLoading(false);

      if (!response.ok) {
        throw new Error("Authentication failed!");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Something went wrong!");
      alert(err.message || "Something went wrong!");
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
