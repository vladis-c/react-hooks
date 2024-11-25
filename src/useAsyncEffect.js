"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
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
const useAsyncEffect = (effect, dependencies) => {
    (0, react_1.useEffect)(() => {
        let isMounted = true;
        let cleanupFunction;
        const runEffect = () => __awaiter(void 0, void 0, void 0, function* () {
            const cleanup = yield effect();
            if (isMounted && cleanup) {
                if (typeof cleanup === 'function') {
                    cleanupFunction = cleanup;
                }
            }
        });
        runEffect();
        return () => {
            isMounted = false;
            if (cleanupFunction) {
                const result = cleanupFunction();
                if (result instanceof Promise) {
                    result.catch(error => console.error('Error during async cleanup:', error));
                }
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};
exports.default = useAsyncEffect;
