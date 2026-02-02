# Calculator

A TypeScript calculator with a clean, modern web interface.

## Features

- Basic operations: addition, subtraction, multiplication, division
- Decimal support
- Percentage
- Sign toggle (±)
- Backspace and clear (AC)
- Keyboard support: digits, operators, Enter, Escape
- Division by zero handling
- Eager evaluation: It immediately applies the pending operator whenever a new operator is entered, rather than building a full expression and evaluating it later.

## Setup

```bash
npm install

# or with pnpm (recommended for interview-style setups)
pnpm install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

## Build

```bash
npm run build
```

Outputs to the `dist` folder.

## Interview-style exercises

To practise working in a small TypeScript codebase (similar to many interview tasks),
this project includes an exercises file:

- `src/CalculatorExercises.test.ts`

Each exercise is written as a **skipped** test (`it.skip`) with detailed comments.
To work on an exercise:

1. Open `src/CalculatorExercises.test.ts`.
2. Pick an exercise and read the test description and comments.
3. Implement or modify the logic in `CalculatorLogic` as needed.
4. Un-skip the test by changing `it.skip` to `it`.
5. Run just the exercises file:

   ```bash
   # with pnpm
   pnpm test -- src/CalculatorExercises.test.ts

   # or with npm
   npm test -- src/CalculatorExercises.test.ts
   ```

6. Iterate until the tests pass.

The existing `CalculatorLogic.test.ts` file gives you a reference suite of
behaviour-focused tests that should always stay green while you work.