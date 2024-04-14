import { useState, useEffect } from "react";

export function useFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Changed from true to null for error state
  const [data, setData] = useState(null); // Changed from true to null for data state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]); // Added url to the dependency array so useEffect runs when url changes

  return { isLoading, error, data };
}
