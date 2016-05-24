// Returns true if any [keys] for [a] and [b] are strictly not equal
export default (a, b, keys = Object.keys(a)) => keys.some(k => a[k] !== b[k]);
