// Deep merge (lodash.merge-like) for common JS objects/arrays.
// - Mutates `target` (like lodash.merge)
// - Recursively merges plain objects and arrays
// - Preserves non-plain objects by direct assignment (Date, RegExp, functions, class instances, Map/Set, etc.)
// - Merges array indices (array treated as object with numeric keys)
// - Copies own enumerable string + symbol keys
// - Handles circular references

type AnyObj = Record<PropertyKey, any>;

function isObjectLike(value: any): value is object {
  return value !== null && typeof value === "object";
}

function isPlainObject(value: any): value is AnyObj {
  if (!isObjectLike(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function isMergeable(value: any): boolean {
  return Array.isArray(value) || isPlainObject(value);
}

function cloneContainer<T>(value: T): T {
  if (Array.isArray(value)) return [] as unknown as T;
  if (isPlainObject(value)) return Object.create(Object.getPrototypeOf(value));
  return value;
}

function ownKeys(obj: object): (string | symbol)[] {
  return [...Object.keys(obj as AnyObj), ...Object.getOwnPropertySymbols(obj)];
}

/**
 * merge(target, ...sources)
 * Mutates and returns `target`.
 */
export function merge<T extends AnyObj>(target: T, ...sources: any[]): T {
  if (!isObjectLike(target)) {
    throw new TypeError("merge target must be an object");
  }

  // Track circular refs: map source object -> merged result
  const stack = new WeakMap<object, any>();

  const _merge = (dst: any, src: any): any => {
    if (dst === src) return dst; // trivial case

    if (!isObjectLike(src)) {
      // primitives or functions overwrite
      return src;
    }

    // Handle circular references from src
    const cached = stack.get(src);
    if (cached) return cached;

    if (!isMergeable(src)) {
      // Non-mergeable objects are assigned by reference
      return src;
    }

    // Prepare destination container
    let out = dst;
    const needContainer =
      !isMergeable(dst) ||
      (Array.isArray(dst) !== Array.isArray(src)) ||
      (isPlainObject(dst) !== isPlainObject(src));

    if (needContainer) {
      out = cloneContainer(src);
    }

    // Cache before descending to handle self-references
    stack.set(src, out);

    if (Array.isArray(src)) {
      // Merge array indices (like lodash.merge)
      const maxLen = Math.max((out as any[]).length || 0, src.length);
      for (let i = 0; i < maxLen; i++) {
        if (i in src) {
          const mergedVal = _merge((out as any[])[i], src[i]);
          (out as any[])[i] = mergedVal;
        }
      }
      // Also merge any enumerable non-index properties/symbols on the array
      for (const k of ownKeys(src)) {
        if (typeof k === "symbol" || !/^(?:0|[1-9]\d*)$/.test(String(k))) {
          (out as AnyObj)[k] = _merge((out as AnyObj)[k], (src as AnyObj)[k]);
        }
      }
      return out;
    }

    // Plain object
    for (const key of ownKeys(src)) {
      (out as AnyObj)[key] = _merge((out as AnyObj)[key], (src as AnyObj)[key]);
    }

    return out;
  };

  for (const src of sources) {
    if (src == null) continue; // skip null/undefined sources
    _merge(target, src);
  }
  return target;
}
