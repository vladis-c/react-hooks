"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * `useSpread` is hook that creates a new instance of an object or array.
 *
 * - If the input is an object, it returns a shallow copy of the object.
 * - If the input is an array, it returns a shallow copy of the array.
 *
 * @template D - The type of the input data (object or array).
 * @param {D} data - The data to be spread (object or array).
 * @returns {D | undefined} - A new instance of the object or array, or `undefined` if the input is invalid.
 *
 * @example
 * // For an object
 * const obj = { a: 1, b: 2 };
 * const spreadObj = useSpread(obj);
 * console.log(spreadObj); // { a: 1, b: 2 }
 *
 * @example
 * // For an array
 * const arr = [1, 2, 3];
 * const spreadArr = useSpread(arr);
 * console.log(spreadArr); // [1, 2, 3]
 */
const useSpread = (data, deps) => {
    const memoized = (0, react_1.useMemo)(() => {
        if (!data) {
            return data;
        }
        if (Array.isArray(data)) {
            return [...data];
        }
        if (typeof data === 'object') {
            return Object.assign({}, data);
        }
        return data;
    }, deps ? deps : [data]);
    return memoized;
};
exports.default = useSpread;
//# sourceMappingURL=useSpread.js.map