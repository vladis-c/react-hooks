var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect } from 'react';
const useAsyncEffect = (effect, dependencies) => {
    useEffect(() => {
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
export default useAsyncEffect;
