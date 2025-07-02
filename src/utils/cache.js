// Simple cache mechanism for API responses
class ApiCache {
  constructor(maxAge = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.maxAge = maxAge;
  }

  set(key, data) {
    try {
      const item = {
        data,
        timestamp: Date.now()
      };
      this.cache.set(key, item);
    } catch (error) {
      console.warn('Cache set error:', error);
    }
  }

  get(key) {
    try {
      const item = this.cache.get(key);
      if (!item) return null;

      const isExpired = Date.now() - item.timestamp > this.maxAge;
      if (isExpired) {
        this.cache.delete(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('Cache get error:', error);
      return null;
    }
  }

  clear() {
    try {
      this.cache.clear();
    } catch (error) {
      console.warn('Cache clear error:', error);
    }
  }

  delete(key) {
    try {
      this.cache.delete(key);
    } catch (error) {
      console.warn('Cache delete error:', error);
    }
  }
}

export const hobbyCache = new ApiCache();
export const userCache = new ApiCache();
