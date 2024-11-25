import {useEffect} from 'react';

type CleanupFunction = () => void;
type AsyncCleanupFunction = () => Promise<void>;
type AsyncEffectCallback = () =>
  | void
  | CleanupFunction
  | Promise<CleanupFunction | void>;

/**
 *  `useAsyncEffect` is a hook that extends the behavior of `useEffect` to support async functions.
 *
 * - Handles async operations within the `useEffect` callback, including optional cleanup.
 * - Ensures that the cleanup function is called only when the component is still mounted.
 * - Manages errors during async cleanup by logging them to the console.
 *
 * @param {AsyncEffectCallback} effect - The async function or synchronous function to execute.
 *   - Can return:
 *     - `void`: If no cleanup is required.
 *     - A synchronous cleanup function: `() => void`.
 *     - An async cleanup function: `() => Promise<void>`.
 * @param {React.DependencyList} dependencies - The dependency array that determines when the effect is executed.
 *
 * @example
 * useAsyncEffect(async () => {
 *   const data = await fetchData();
 *   setState(data);
 *
 *   // Cleanup function (optional)
 *   return () => {
 *     console.log('Cleanup logic here');
 *   };
 * }, [fetchData]);
 */
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
