"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * `useSpread` is hook that creates a new instance of an object or array.
 *
 * - If the input is an object, it returns a shallow copy of the object.
 * - If the input is an array, it returns a shallow copy of the array.
 * - If the input is `null`, `undefined`, or not an object/array, it returns `undefined`.
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
 *
 * @example
 * // For null or undefined
 * const result = useSpread(null);
 * console.log(result); // undefined
 */
const useSpread = (data) => (0, react_1.useMemo)(() => {
    if (Array.isArray(data)) {
        // If the data is an array, spread it into a new array
        return [...data];
    }
    else if (data && typeof data === 'object') {
        // If the data is an object, spread it into a new object
        return Object.assign({}, data);
    }
    return undefined; // Return undefined for other cases
}, [data]);
exports.default = useSpread;
