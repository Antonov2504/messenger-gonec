/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepClone<T>(obj: T): T {
  return _cloneDeep(obj, new WeakMap()) as T;
}

function _cloneDeep(item: unknown, weakMap: WeakMap<object, unknown>): unknown {
  if (item === null || typeof item !== 'object') {
    return item;
  }

  if (weakMap.has(item)) {
    return weakMap.get(item);
  }

  if (item instanceof Date) {
    return new Date(item.valueOf());
  }

  if (Array.isArray(item)) {
    const copy: unknown[] = [];
    weakMap.set(item, copy);

    item.forEach((el, i) => {
      copy[i] = _cloneDeep(el, weakMap);
    });

    return copy;
  }

  if (item instanceof Set) {
    const copy = new Set();
    weakMap.set(item, copy);

    item.forEach((v) => {
      copy.add(_cloneDeep(v, weakMap));
    });

    return copy;
  }

  if (item instanceof Map) {
    const copy = new Map();
    weakMap.set(item, copy);

    item.forEach((v, k) => {
      copy.set(k, _cloneDeep(v, weakMap));
    });

    return copy;
  }

  const proto = Object.getPrototypeOf(item);
  const copy = Object.create(proto);
  weakMap.set(item, copy);

  Object.getOwnPropertySymbols(item).forEach((s) => {
    copy[s] = _cloneDeep((item as any)[s], weakMap);
  });

  Object.keys(item).forEach((k) => {
    copy[k] = _cloneDeep((item as any)[k], weakMap);
  });

  return copy;
}
