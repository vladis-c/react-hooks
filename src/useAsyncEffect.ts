import {useEffect} from 'react';

type CleanupFunction = () => void;
type AsyncCleanupFunction = () => Promise<void>;
type AsyncEffectCallback = () =>
  | void
  | CleanupFunction
  | Promise<CleanupFunction | void>;

const useAsyncEffect = (
  effect: AsyncEffectCallback,
  dependencies: React.DependencyList,
): void => {
  useEffect(() => {
    let isMounted = true;
    let cleanupFunction: CleanupFunction | AsyncCleanupFunction | undefined;

    const runEffect = async () => {
      const cleanup = await effect();
      if (isMounted && cleanup) {
        if (typeof cleanup === 'function') {
          cleanupFunction = cleanup;
        }
      }
    };

    runEffect();

    return () => {
      isMounted = false;
      if (cleanupFunction) {
        const result = cleanupFunction();
        if (result instanceof Promise) {
          result.catch(error =>
            console.error('Error during async cleanup:', error),
          );
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useAsyncEffect;
