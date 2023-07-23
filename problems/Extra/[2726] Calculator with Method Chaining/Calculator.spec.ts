import { describe, expect, it } from 'vitest';
import { Calculator } from './Calculator';

describe('Calculator', () => {
  it('should correctly perform addition, subtraction, and return result', () => {
    const calculator = new Calculator(10);

    const result = calculator.add(5).subtract(7).getResult();

    expect(result).toBeCloseTo(8);
  });

  it('should correctly perform multiplication, power, and return result', () => {
    const calculator = new Calculator(2);

    const result = calculator.multiply(5).power(2).getResult();

    expect(result).toBeCloseTo(100);
  });

  it('should throw an error when trying to divide by zero', () => {
    const calculator = new Calculator(20);
    expect(() => calculator.divide(0).getResult()).toThrowError('Division by zero is not allowed');
  });
});
