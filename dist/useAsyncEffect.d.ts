type CleanupFunction = () => void;
type AsyncEffectCallback = () => void | CleanupFunction | Promise<CleanupFunction | void>;
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
declare const useAsyncEffect: (effect: AsyncEffectCallback, dependencies: React.DependencyList) => void;
export default useAsyncEffect;
