type Operator = '+' | '-' | '×' | '÷';

export class Calculator {
  private display: string = '0';
  private previousValue: number | null = null;
  private operator: Operator | null = null;
  private waitingForOperand: boolean = false;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
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

  private parseDisplay(display: string): number | null {
    if (display.trim() === '' || display === 'Error') return null;
    const n = Number(display);
    return Number.isFinite(n) ? n : null;
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

  render(): void {
    this.container.innerHTML = `
      <div class="calculator">
        <div class="display" aria-live="polite">${this.display}</div>
        <div class="buttons">
          <button data-action="clear" class="btn btn-function">AC</button>
          <button data-action="toggle" class="btn btn-function">±</button>
          <button data-action="percent" class="btn btn-function">%</button>
          <button data-action="operator" data-value="÷" class="btn btn-operator">÷</button>

          <button data-action="digit" data-value="7" class="btn btn-number">7</button>
          <button data-action="digit" data-value="8" class="btn btn-number">8</button>
          <button data-action="digit" data-value="9" class="btn btn-number">9</button>
          <button data-action="operator" data-value="×" class="btn btn-operator">×</button>

          <button data-action="digit" data-value="4" class="btn btn-number">4</button>
          <button data-action="digit" data-value="5" class="btn btn-number">5</button>
          <button data-action="digit" data-value="6" class="btn btn-number">6</button>
          <button data-action="operator" data-value="-" class="btn btn-operator">−</button>

          <button data-action="digit" data-value="1" class="btn btn-number">1</button>
          <button data-action="digit" data-value="2" class="btn btn-number">2</button>
          <button data-action="digit" data-value="3" class="btn btn-number">3</button>
          <button data-action="operator" data-value="+" class="btn btn-operator">+</button>

          <button data-action="digit" data-value="0" class="btn btn-number btn-zero">0</button>
          <button data-action="decimal" class="btn btn-number">.</button>
          <button data-action="backspace" class="btn btn-function">⌫</button>
          <button data-action="equals" class="btn btn-equals">=</button>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const display = this.container.querySelector('.display')!;
    const buttons = this.container.querySelectorAll('.buttons button');

    const updateDisplay = () => {
      display.textContent = this.display;
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = (btn as HTMLButtonElement).dataset.action;
        const value = (btn as HTMLButtonElement).dataset.value;

        switch (action) {
          case 'digit':
            this.inputDigit(value!);
            break;
          case 'decimal':
            this.inputDecimal();
            break;
          case 'operator':
            this.inputOperator(value as Operator);
            break;
          case 'clear':
            this.clear();
            break;
          case 'backspace':
            this.backspace();
            break;
          case 'toggle':
            this.toggleSign();
            break;
          case 'percent':
            const n = this.parseDisplay(this.display);
            this.display = this.formatResult(n === null ? NaN : n / 100);
            break;
          case 'equals':
            this.calculateResult();
            break;
        }
        updateDisplay();
      });
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        this.inputDigit(e.key);
        updateDisplay();
      } else if (e.key === '.') {
        this.inputDecimal();
        updateDisplay();
      } else if (e.key === '+') {
        this.inputOperator('+');
        updateDisplay();
      } else if (e.key === '-') {
        this.inputOperator('-');
        updateDisplay();
      } else if (e.key === '*') {
        this.inputOperator('×');
        updateDisplay();
      } else if (e.key === '/') {
        e.preventDefault();
        this.inputOperator('÷');
        updateDisplay();
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        this.calculateResult();
        updateDisplay();
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        if (e.key === 'Backspace' && !e.ctrlKey && !e.metaKey) {
          this.backspace();
        } else {
          this.clear();
        }
        updateDisplay();
      }
    });
  }
}
