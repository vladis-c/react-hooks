import React, {useState} from 'react';
import useAsyncEffect from '../src/useAsyncEffect';

const UseAsyncEffectComponent = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useAsyncEffect(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
      );
      const json = await result.json();
      setData(json.title);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return <div>Data: {data}</div>;
};

export default UseAsyncEffectComponent;
