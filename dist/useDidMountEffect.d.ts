/** This effect skips the first trigger of useEffect on mount. AKA componentDidMount */
declare const useDidMountEffect: (callback: () => void, deps: React.DependencyList | undefined) => void;
export default useDidMountEffect;
