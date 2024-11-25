import React, {useState} from 'react';
import useAsyncEffect from '../src/useAsyncEffect';
import useSpread from '../src/useSpread';

const UseAsyncEffectComponent = () => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const spreadedData = useSpread(data);

  useAsyncEffect(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
      );
      const json = await result.json();
      setData(json as Record<string, any>);
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

  return <div>Data: {JSON.stringify(spreadedData)}</div>;
};

export default UseAsyncEffectComponent;
