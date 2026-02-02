import { describe, it, expect, beforeEach } from 'vitest';
import { CalculatorLogic } from './CalculatorLogic';

describe('CalculatorLogic', () => {
  let logic: CalculatorLogic;

  beforeEach(() => {
    logic = new CalculatorLogic();
  });

  describe('initial state', () => {
    it('displays "0" initially', () => {
      expect(logic.getDisplay()).toBe('0');
    });
  });

  describe('inputDigit', () => {
    it('replaces leading zero with digit', () => {
      logic.inputDigit('5');
      expect(logic.getDisplay()).toBe('5');
    });

    it('appends digits', () => {
      logic.inputDigit('1');
      logic.inputDigit('2');
      logic.inputDigit('3');
      expect(logic.getDisplay()).toBe('123');
    });
  });

  describe('inputDecimal', () => {
    it('adds decimal point', () => {
      logic.inputDigit('5');
      logic.inputDecimal();
      logic.inputDigit('2');
      expect(logic.getDisplay()).toBe('5.2');
    });

    it('does not add duplicate decimal', () => {
      logic.inputDigit('5');
      logic.inputDecimal();
      logic.inputDecimal();
      logic.inputDigit('2');
      expect(logic.getDisplay()).toBe('5.2');
    });
  });

  describe('clear', () => {
    it('resets to zero', () => {
      logic.inputDigit('5');
      logic.inputOperator('+');
      logic.clear();
      expect(logic.getDisplay()).toBe('0');
    });
  });

  describe('backspace', () => {
    it('removes last digit', () => {
      logic.inputDigit('1');
      logic.inputDigit('2');
      logic.inputDigit('3');
      logic.backspace();
      expect(logic.getDisplay()).toBe('12');
    });

    it('shows zero when last digit removed', () => {
      logic.inputDigit('5');
      logic.backspace();
      expect(logic.getDisplay()).toBe('0');
    });
  });

  describe('toggleSign', () => {
    it('negates positive number', () => {
      logic.inputDigit('5');
      logic.toggleSign();
      expect(logic.getDisplay()).toBe('-5');
    });

    it('removes negative sign', () => {
      logic.inputDigit('5');
      logic.toggleSign();
      logic.toggleSign();
      expect(logic.getDisplay()).toBe('5');
    });
  });

  describe('operations', () => {
    it('adds two numbers', () => {
      logic.inputDigit('2');
      logic.inputOperator('+');
      logic.inputDigit('3');
      logic.calculateResult();
      expect(logic.getDisplay()).toBe('5');
    });

    it('subtracts two numbers', () => {
      logic.inputDigit('1');
      logic.inputDigit('0');
      logic.inputOperator('-');
      logic.inputDigit('3');
      logic.calculateResult();
      expect(logic.getDisplay()).toBe('7');
    });

    it('multiplies two numbers', () => {
      logic.inputDigit('4');
      logic.inputOperator('×');
      logic.inputDigit('5');
      logic.calculateResult();
      expect(logic.getDisplay()).toBe('20');
    });

    it('divides two numbers', () => {
      logic.inputDigit('1');
      logic.inputDigit('5');
      logic.inputOperator('÷');
      logic.inputDigit('3');
      logic.calculateResult();
      expect(logic.getDisplay()).toBe('5');
    });

    it('shows Error on division by zero', () => {
      logic.inputDigit('5');
      logic.inputOperator('÷');
      logic.inputDigit('0');
      logic.calculateResult();
      expect(logic.getDisplay()).toBe('Error');
    });
  });

  describe('chained operations', () => {
    it('evaluates 2 + 3 + 4', () => {
      logic.inputDigit('2');
      logic.inputOperator('+');
      logic.inputDigit('3');
      logic.inputOperator('+');
      logic.inputDigit('4');
      logic.calculateResult();
      expect(logic.getDisplay()).toBe('9');
    });
  });

  describe('inputPercent', () => {
    it('converts to percentage', () => {
      logic.inputDigit('5');
      logic.inputDigit('0');
      logic.inputPercent();
      expect(logic.getDisplay()).toBe('0.5');
    });
  });
});
