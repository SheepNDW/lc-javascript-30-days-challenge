type Callback = (...args: any[]) => any;
type Subscription = {
  unsubscribe: () => void;
};

class EventEmitter {
  private subscriptions: Map<string, Callback[]> = new Map();

  subscribe(eventName: string, callback: Callback): Subscription {
    if (!this.subscriptions.has(eventName)) {
      this.subscriptions.set(eventName, []);
    }

    this.subscriptions.get(eventName)?.push(callback);

    return {
      unsubscribe: () => {
        const callbacks = this.subscriptions.get(eventName);
        if (callbacks) {
          const index = callbacks.indexOf(callback);
          if (index !== -1) {
            callbacks.splice(index, 1);
          }
        }
      },
    };
  }

  emit(eventName: string, args: any[] = []): any {
    const callbacks = this.subscriptions.get(eventName);
    if (callbacks) {
      return callbacks.map((callback) => callback(...args));
    }
    return [];
  }
}

export { EventEmitter };
