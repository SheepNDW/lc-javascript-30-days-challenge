import { describe, expect, it, vi } from 'vitest';
import { EventEmitter } from './EventEmitter';

describe('EventEmitter', () => {
  it('should be able to subscribe and emit events', () => {
    const emitter = new EventEmitter();
    const callback = vi.fn((...args: any[]) => args.join(','));

    // Subscribe to an event
    emitter.subscribe('firstEvent', callback);

    // Emit the event
    const result = emitter.emit('firstEvent', [1, 2, 3]);

    // The callback should have been called
    expect(callback).toHaveBeenCalled();
    // The callback should have been called with the arguments passed to emit
    expect(callback).toHaveBeenCalledWith(1, 2, 3);
    // The result should be an array with the result of the callback
    expect(result).toEqual(['1,2,3']);
  });

  it('should be able to unsubscribe from events', () => {
    const emitter = new EventEmitter();
    const callback = vi.fn((...args: any[]) => args.join(','));

    // Subscribe to an event
    const subscription = emitter.subscribe('firstEvent', callback);

    // Unsubscribe from the event
    subscription.unsubscribe();

    // Emit the event
    const result = emitter.emit('firstEvent', [1, 2, 3]);

    // The callback should not have been called
    expect(callback).not.toHaveBeenCalled();
    // The result should be an empty array
    expect(result).toEqual([]);
  });

  it('should not call callback after unsubscribe', () => {
    const emitter = new EventEmitter();
    const callback = vi.fn();

    const subscription = emitter.subscribe('test', callback);
    subscription.unsubscribe();

    emitter.emit('test', ['payload']);

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should return an empty array when emitting an event with no subscribers', () => {
    const emitter = new EventEmitter();

    const result = emitter.emit('noSubscribersEvent', [1, 2, 3]);

    expect(result).toEqual([]);
  });
});
