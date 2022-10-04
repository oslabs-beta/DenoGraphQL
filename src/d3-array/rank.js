/// <reference lib="dom" />
import ascending from "./ascending.js";
import {ascendingDefined, compareDefined} from "./sort.js";

export default function rank(values, valueof = ascending) {
  if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
  let V = Array.from(values);
  const R = new Float64Array(V.length);
  if (valueof.length !== 2) V = V.map(valueof), valueof = ascending;
  const compareIndex = (i, j) => valueof(V[i], V[j]);
  let k, r;
  Uint32Array
    .from(V, (_, i) => i)
    .sort(valueof === ascending ? (i, j) => ascendingDefined(V[i], V[j]) : compareDefined(compareIndex))
    .forEach((j, i) => {
      const c = compareIndex(j, k === undefined ? j : k);
      if (c >= 0) {
        if (k === undefined || c > 0) k = j, r = i;
        R[j] = r;
      } else {
        R[j] = NaN;
      }
    });
  return R;
}
