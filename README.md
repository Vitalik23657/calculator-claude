# Student Calculator

A basic four-function calculator built with plain HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies.

## Live Demo

Open `index.html` in any modern web browser. That's it — no installation or server required.

## Project Structure

```
learning-claude/
├── index.html   # Page structure and button layout
├── style.css    # Visual styling (dark theme, grid layout)
└── script.js    # Calculator logic and event handling
```

### `index.html`

Defines the calculator's structure:
- A `.display` area with two lines: the running `#expression` (previous value + operator) and the current `#result`.
- A `.buttons` grid of digit, operator, and function buttons. Each button carries a `data-value` (for digits like `7`, `.`) or a `data-action` (for operations like `add`, `equals`, `clear`) attribute that `script.js` reads to decide what to do.

### `style.css`

A dark-themed, responsive layout:
- Centers the calculator on the page using flexbox.
- Lays out the buttons in a 4-column CSS grid.
- Color-codes button types: operators are highlighted in yellow, function keys (AC, DEL, %) in red, and `=` spans two columns as the primary action.

### `script.js`

Implements the calculator logic with no external libraries:
- **State** — three variables track everything: `currentOperand` (what you're typing), `previousOperand` (the value before the operator), and `operation` (the pending operator).
- **Core functions**:
  - `appendDigit(digit)` — adds a digit or decimal point to the current number.
  - `chooseOperation(op)` — stores the pending operator; if a calculation was already in progress, it computes it first (so chained operations like `2 + 3 + 4` work).
  - `compute()` — performs the actual math (`+`, `−`, `×`, `÷`) and rounds the result to avoid floating-point artifacts (e.g. `0.1 + 0.2` displaying as `0.30000000000000004`). Dividing by zero shows `Error`.
  - `clearAll()`, `deleteLast()`, `applyPercent()` — implement AC, DEL, and % respectively.
  - `updateDisplay()` — syncs the DOM with the current state after every action.
- **Input handling**:
  - Click events on all `.btn` elements read each button's `data-value`/`data-action` and dispatch to the appropriate function.
  - A `keydown` listener mirrors the same actions for keyboard input (digits, `+ - * /`, `Enter`/`=`, `Backspace`, `Escape`).

## How to Use

1. Open `index.html` in your browser (double-click the file, or use a local server if you prefer).
2. **With mouse/touch**: click the on-screen buttons.
3. **With keyboard**:
   - `0`–`9` and `.` — enter numbers
   - `+`, `-`, `*`, `/` — choose an operation
   - `Enter` or `=` — compute the result
   - `Backspace` — delete the last digit
   - `Escape` — clear everything (AC)
4. The `%` button converts the current number to a percentage (divides by 100).

## Notes for Learners

This project is intentionally framework-free to make it easy to see exactly how a calculator works under the hood: DOM selection, event listeners, `data-*` attributes for encoding intent in HTML, and basic state management in plain JavaScript.
