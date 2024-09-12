type CleanupFunction = () => void;
type AsyncEffectCallback = () => void | CleanupFunction | Promise<CleanupFunction | void>;
declare const useAsyncEffect: (effect: AsyncEffectCallback, dependencies: React.DependencyList) => void;
export default useAsyncEffect;
