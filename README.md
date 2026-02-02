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