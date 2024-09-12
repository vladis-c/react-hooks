import {useEffect, useRef} from 'react';

/** This effect skips the first trigger of useEffect on mount. AKA componentDidMount */
const useDidMountEffect = (
  callback: () => void,
  deps: React.DependencyList | undefined,
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback();
    }
    return () => {
      didMount.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDidMountEffect;
