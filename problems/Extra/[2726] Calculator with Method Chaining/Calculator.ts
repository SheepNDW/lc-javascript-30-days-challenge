class Calculator {
  private count: number;

  constructor(value: number) {
    this.count = value;
  }

  add(value: number): Calculator {
    this.count += value;
    return this;
  }

  subtract(value: number): Calculator {
    this.count -= value;
    return this;
  }

  multiply(value: number): Calculator {
    this.count *= value;
    return this;
  }

  divide(value: number): Calculator {
    if (value === 0) {
      throw new Error('Division by zero is not allowed');
    }
    this.count /= value;
    return this;
  }

  power(value: number): Calculator {
    this.count **= value;
    return this;
  }

  getResult(): number {
    return this.count;
  }
}

export { Calculator };
