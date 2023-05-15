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
    vi.runAllTimers();

    expect(Date.now() - t).toEqual(100);
  });

  it('should sleep for 200ms', () => {
    const t = Date.now();

    sleep(200);
    vi.runAllTimers();

    expect(Date.now() - t).toEqual(200);
  });
});
