import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { params: memoizedParams });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, memoizedParams]);

  return { data, error, loading };
};

export default useFetch;
