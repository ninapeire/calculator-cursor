import { describe, it, expect, beforeEach } from 'vitest';
import { CalculatorLogic } from './CalculatorLogic';

/**
 * Interview-style exercises for practising on this codebase.
 *
 * All tests in this file are initially skipped (`it.skip`). To work
 * on an exercise:
 *
 * 1. Pick one test (or group of tests) for an exercise.
 * 2. Read the test description and comments.
 * 3. Implement or change the corresponding code in `CalculatorLogic`.
 * 4. Un-skip the test (change `it.skip` to `it`) and run:
 *
 *    - pnpm:  pnpm test -- CalculatorExercises.test.ts
 *    - npm:   npm test -- CalculatorExercises.test.ts
 *
 * 5. Iterate until the test passes.
 */

describe('CalculatorLogic exercises', () => {
  let logic: CalculatorLogic;

  beforeEach(() => {
    logic = new CalculatorLogic();
  });

  /**
   * Exercise 1 – clearEntry (CE)
   *
   * Goal:
   *   Implement a `clearEntry()` method on `CalculatorLogic` that clears only
   *   the current entry (the number currently shown in the display) while
   *   keeping any pending operation.
   *
   * Example:
   *   2 + 9, CE, 4, =  should evaluate to 6 (2 + 4).
   *
   * Hints:
   *   - Compare the behaviour to `clear()`, which resets *everything*.
   *   - The tests here focus only on the logic, not the UI; you can later
   *     add a CE button in the view if you want extra practice.
   */
  it('Exercise 1: clearEntry only clears current entry and preserves pending operation', () => {
    logic.inputDigit('2');
    logic.inputOperator('+');
    logic.inputDigit('9');

    // Your new method should reset only the current entry to "0".
    logic.clearEntry();
    expect(logic.getDisplay()).toBe('0');

    // The previous value and operator should still be remembered so the
    // following sequence behaves like 2 + 4.
    logic.inputDigit('4');
    logic.calculateResult();
    expect(logic.getDisplay()).toBe('6');
  });

  /**
   * Exercise 2 – repeated equals
   *
   * Goal:
   *   Make `calculateResult()` support pressing "=" multiple times to repeat
   *   the last operation, a common calculator behaviour.
   *
   * Example:
   *   2 + 3 =  → 5
   *   =        → 8
   *   =        → 11
   *
   * Suggested approach:
   *   - After a successful calculation, remember the last operator and
   *     the last "right-hand side" operand somewhere in the class.
   *   - If the user presses "=" again with no new operator selected,
   *     apply the stored operation again to the current display value.
   */
  it('Exercise 2: pressing equals repeatedly repeats the last operation', () => {
    logic.inputDigit('2');
    logic.inputOperator('+');
    logic.inputDigit('3');
    logic.calculateResult(); // 5
    expect(logic.getDisplay()).toBe('5');

    // Press "=" again: should add 3 once more.
    logic.calculateResult(); // 8
    expect(logic.getDisplay()).toBe('8');

    // And again.
    logic.calculateResult(); // 11
    expect(logic.getDisplay()).toBe('11');
  });

  /**
   * Exercise 3 – square root
   *
   * Goal:
   *   Implement an `inputSquareRoot()` method that replaces the current
   *   display with the square root of the current value.
   *
   * Requirements:
   *   - If the display parses to a non‑negative number n, show √n.
   *   - If the display is negative or invalid, show "Error".
   *   - Re-use existing helpers such as `parseDisplay` and `formatResult`
   *     where reasonable.
   *
   * Bonus:
   *   Once the logic is working, add a "√" button to the UI and wire it up
   *   to this method.
   */
  it('Exercise 3: computes square root for non-negative values', () => {
    logic.inputDigit('9');
    logic.inputSquareRoot();
    expect(logic.getDisplay()).toBe('3');
  });

  it('Exercise 3: shows Error for negative values', () => {
    logic.inputDigit('9');
    logic.toggleSign(); // -9
    logic.inputSquareRoot();
    expect(logic.getDisplay()).toBe('Error');
  });
});

