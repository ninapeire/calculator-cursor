const OPERATORS = ['+', '-', '×', '÷'] as const;
export type Operator = typeof OPERATORS[number];

export const isOperator = (x: unknown): x is Operator =>
  typeof x === 'string' && OPERATORS.includes(x as Operator);

/**
 * Pure calculator logic with no DOM dependencies.
 * Easily testable in isolation.
 */
export class CalculatorLogic {
  private display: string = '0';
  private previousValue: number | null = null;
  private operator: Operator | null = null;
  private waitingForOperand: boolean = false;

  getDisplay(): string {
    return this.display;
  }

  inputDigit(digit: string): void {
    if (this.waitingForOperand) {
      this.display = digit;
      this.waitingForOperand = false;
    } else {
      this.display = this.display === '0' ? digit : this.display + digit;
    }
  }

  inputDecimal(): void {
    if (this.waitingForOperand) {
      this.display = '0.';
      this.waitingForOperand = false;
    } else if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  inputPercent(): void {
    const n = this.parseDisplay(this.display);
    this.display = this.formatResult(n === null ? NaN : n / 100);
    this.waitingForOperand = false;
  }

  clear(): void {
    this.display = '0';
    this.previousValue = null;
    this.operator = null;
    this.waitingForOperand = false;
  }

  backspace(): void {
    if (this.waitingForOperand) return;
    this.display = this.display.length > 1 ? this.display.slice(0, -1) : '0';
  }

  toggleSign(): void {
    if (this.display === '0') return;
    this.display = this.display.startsWith('-') ? this.display.slice(1) : '-' + this.display;
  }

  inputOperator(op: Operator): void {
    const currentValue = this.parseDisplay(this.display);
    if (currentValue === null) {
      this.display = 'Error';
      this.waitingForOperand = true;
      return;
    }

    if (this.previousValue !== null && this.operator !== null && !this.waitingForOperand) {
      this.previousValue = this.calculate(this.previousValue, currentValue, this.operator);
      this.display = this.formatResult(this.previousValue);
    } else {
      this.previousValue = currentValue;
    }

    this.operator = op;
    this.waitingForOperand = true;
  }

  calculateResult(): void {
    if (this.previousValue === null || this.operator === null) return;

    const currentValue = this.parseDisplay(this.display);
    if (currentValue === null) {
      this.display = 'Error';
      this.waitingForOperand = true;
      return;
    }
    const result = this.calculate(this.previousValue, currentValue, this.operator);

    this.display = this.formatResult(result);
    this.previousValue = null;
    this.operator = null;
    this.waitingForOperand = true;
  }

  private parseDisplay(display: string): number | null {
    if (display.trim() === '' || display === 'Error') return null;
    const n = Number(display);
    return Number.isFinite(n) ? n : null;
  }

  private calculate(a: number, b: number, op: Operator): number {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? NaN : a / b;
    }
  }

  private formatResult(value: number): string {
    if (Number.isNaN(value)) return 'Error';
    if (!Number.isFinite(value)) return 'Error';

    const str = value.toString();
    if (str.length > 12) {
      return value.toExponential(6);
    }
    return str;
  }
}
