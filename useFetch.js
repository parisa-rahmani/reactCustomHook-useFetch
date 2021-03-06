import { useState, useEffect, useCallback } from 'react';

const useFetch = url => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('something went wrong');

  const abortControl = new AbortController();

  const getData = useCallback(async () => {
    try {
      const response = await fetch(url, { signal: abortControl.signal });
      if (!response.ok) {
        throw Error('could not fetch the data');
      }
      const resData = await response.json();
      setData(resData);
      setLoading(false);
    } catch (error) {
      setLoading(loading);
      setErrorMessage(error.response.message);
    }
  }, [url]);

  useEffect(() => {
    getData();
    // cleanup pause the fetch request on unmount component
    return () => abortControl.abort();
  }, [url, getData]);

  return { loading, data, errorMessage };
};

export default useFetch;
