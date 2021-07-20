import { useState, useEffect, useCallback } from 'react';

const useFetch = url => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('something went wrong');

  const getData = useCallback(async () => {
    try {
      const response = await fetch(url);
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
  }, [url, getData]);

  return { loading, data, errorMessage };
};

export default useFetch;
