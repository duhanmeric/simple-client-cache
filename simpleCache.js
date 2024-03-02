class SimpleCache {
  static limit = 2;

  constructor() {
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    return undefined;
  }

  set(key, value) {
    if (this.cache.size === SimpleCache.limit) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, value);
  }
}

export default SimpleCache;
