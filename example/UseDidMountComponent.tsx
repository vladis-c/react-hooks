import React, {useState} from 'react';
import useDidMountEffect from '../src/useDidMountEffect';

const UseAsyncEffectComponent = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useDidMountEffect(() => {
    setLoading(false);
  }, [loading]);

  return <div>Loading? {loading}</div>;
};

export default UseAsyncEffectComponent;
