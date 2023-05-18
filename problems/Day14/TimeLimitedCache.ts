class TimeLimitedCache0 {
  private cache: {
    [key: number]: {
      value: number;
      expiredTime: number;
    };
  };
  constructor() {
    this.cache = {};
  }

  set(key: number, value: number, duration: number): boolean {
    const currentTime = Date.now();
    const existed = this.cache[key] ? this.cache[key].expiredTime > currentTime : false;

    this.cache[key] = {
      value,
      expiredTime: Date.now() + duration,
    };
    return existed;
  }

  get(key: number): number {
    const currentTime = Date.now();
    if (this.cache[key]?.expiredTime > currentTime) {
      return this.cache[key].value;
    }
    return -1;
  }

  count(): number {
    const currentTime = Date.now();
    let counts = 0;
    for (const value of Object.values(this.cache)) {
      if (value.expiredTime - currentTime > 0) {
        counts++;
      }
    }
    return counts;
  }
}

// ==== Alternatives ====

// setTimeout + clearTimeout
class TimeLimitedCache1 {
  cache = new Map<number, { value: number; timeout: NodeJS.Timeout }>();

  set(key: number, value: number, duration: number) {
    const valueInCache = this.cache.get(key);
    if (valueInCache) {
      clearTimeout(valueInCache.timeout);
    }
    const timeout = setTimeout(() => this.cache.delete(key), duration);
    this.cache.set(key, { value, timeout });
    return Boolean(valueInCache);
  }

  get(key: number) {
    return this.cache.has(key) ? this.cache.get(key)?.value : -1;
  }

  count() {
    return this.cache.size;
  }
}

// Priority Queue
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

type Entry = {
  key: number;
  value: number;
  expiration: number;
  overwritten: boolean;
};

class TimeLimitedCache {
  cache: Record<string, Entry> = {};
  queue = new MinPriorityQueue<Entry>();
  size = 0;

  handleExpiredData() {
    const now = Date.now();
    while (this.queue.size() > 0 && this.queue.front().expiration < now) {
      const entry = this.queue.dequeue();
      if (!entry.overwritten) {
        delete this.cache[entry.key];
        this.size -= 1;
      }
    }
  }

  set(key: number, value: number, duration: number) {
    this.handleExpiredData();
    const hasVal = key in this.cache;
    if (hasVal) {
      this.cache[key].overwritten = true;
    } else {
      this.size += 1;
    }
    const expiration = Date.now() + duration;
    const entry: Entry = { key, value, expiration, overwritten: false };
    this.cache[key] = entry;
    this.queue.enqueue(entry);
    return hasVal;
  }

  get(key: number) {
    this.handleExpiredData();
    if (this.cache[key] === undefined) return -1;
    return this.cache[key].value;
  }

  count() {
    this.handleExpiredData();
    return this.size;
  }
}

/**
 * Your TimeLimitedCache object will be instantiated and called as such:
 * var obj = new TimeLimitedCache()
 * obj.set(1, 42, 1000); // false
 * obj.get(1) // 42
 * obj.count() // 1
 */

export { TimeLimitedCache };
