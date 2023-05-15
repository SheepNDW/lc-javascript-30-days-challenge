import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { sleep } from './sleep';

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should sleep for 100ms', () => {
    const t = Date.now();

    sleep(100);
    vi.advanceTimersByTime(100);

    expect(Date.now() - t).toBeGreaterThanOrEqual(100);
  });

  it('should sleep for 200ms', () => {
    const t = Date.now();

    sleep(200);
    vi.advanceTimersByTime(200);

    expect(Date.now() - t).toBeGreaterThanOrEqual(200);
  });
});
