/**
 * `useDidMountEffect` is a hook that skips the first invocation of `useEffect` on mount,
 * effectively mimicking the behavior of `componentDidMount`.
 *
 * - Executes the callback function only after the component has mounted
 *   and the dependencies (`deps`) have changed.
 * - The callback is skipped during the initial render.
 *
 * @param {() => void} callback - The function to execute after the first render and when dependencies change.
 * @param {React.DependencyList | undefined} deps - The dependency array that determines when the callback should be executed.
 *
 * @example
 * const [count, setCount] = useState(0);
 * useDidMountEffect(() => {
 *   console.log('Count updated:', count);
 * }, [count]);
 *
 * // Logs "Count updated: X" only after the first render and subsequent `count` changes,
 * // but not on the initial render.
 */
declare const useDidMountEffect: (callback: () => void, deps: React.DependencyList | undefined) => void;
export default useDidMountEffect;
