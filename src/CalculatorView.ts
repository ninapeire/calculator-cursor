import { CalculatorLogic, isOperator } from './CalculatorLogic';

/**
 * DOM rendering and event handling. Delegates all calculation to CalculatorLogic.
 */
export class CalculatorView {
  private logic: CalculatorLogic;
  private container: HTMLElement;
  private keydownHandler: ((e: KeyboardEvent) => void) | null = null;

  constructor(container: HTMLElement, logic: CalculatorLogic) {
    this.container = container;
    this.logic = logic;
  }

  render(): void {
    this.container.innerHTML = `
      <div class="calculator">
        <div class="display" aria-live="polite">${this.logic.getDisplay()}</div>
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

  private updateDisplay(): void {
    const displayEl = this.container.querySelector('.display');
    if (displayEl) {
      displayEl.textContent = this.logic.getDisplay();
    }
  }

  private handleAction(action: string, value?: string): void {
    switch (action) {
      case 'digit':
        if (value) this.logic.inputDigit(value);
        break;
      case 'decimal':
        this.logic.inputDecimal();
        break;
      case 'operator':
        if (value && isOperator(value)) this.logic.inputOperator(value);
        break;
      case 'clear':
        this.logic.clear();
        break;
      case 'backspace':
        this.logic.backspace();
        break;
      case 'toggle':
        this.logic.toggleSign();
        break;
      case 'percent':
        this.logic.inputPercent();
        break;
      case 'equals':
        this.logic.calculateResult();
        break;
    }
    this.updateDisplay();
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (e.key >= '0' && e.key <= '9') {
      this.handleAction('digit', e.key);
    } else if (e.key === '.') {
      this.handleAction('decimal');
    } else if (e.key === '+') {
      this.handleAction('operator', '+');
    } else if (e.key === '-') {
      this.handleAction('operator', '-');
    } else if (e.key === '*') {
      this.handleAction('operator', '×');
    } else if (e.key === '/') {
      e.preventDefault();
      this.handleAction('operator', '÷');
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      this.handleAction('equals');
    } else if (e.key === 'Escape' || e.key === 'Backspace') {
      if (e.key === 'Backspace' && !e.ctrlKey && !e.metaKey) {
        this.handleAction('backspace');
      } else {
        this.handleAction('clear');
      }
    }
  }

  private attachEventListeners(): void {
    const buttons = this.container.querySelectorAll('.buttons button');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = (btn as HTMLButtonElement).dataset.action;
        const value = (btn as HTMLButtonElement).dataset.value;
        if (action) this.handleAction(action, value);
      });
    });

    this.keydownHandler = (e: KeyboardEvent) => this.handleKeydown(e);
    document.addEventListener('keydown', this.keydownHandler);
  }

  destroy(): void {
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }
  }
}
