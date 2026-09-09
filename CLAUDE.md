# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A four-function calculator built with plain HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies, no package.json.

### Running it

There is no build/lint/test tooling. Open `index.html` directly in a browser to run it; there's no dev server or CLI command involved.

### Architecture

- `index.html` — page structure. Each button carries a `data-value` attribute (digits, `.`) or a `data-action` attribute (`add`, `subtract`, `multiply`, `divide`, `equals`, `clear`, `delete`, `percent`) that `script.js` reads to decide what to do. Keep new buttons consistent with this `data-*` convention rather than adding ids/classes for behavior.
- `style.css` — dark theme, calculator centered via flexbox, buttons in a 4-column CSS grid, color-coded by button type (operators yellow, function keys red, `=` spans two columns).
- `script.js` — all logic, no external libraries:
  - State is three module-level variables: `currentOperand`, `previousOperand`, `operation`.
  - `chooseOperation()` auto-computes a pending calculation before starting the next one, which is what makes chained input like `2 + 3 + 4` work.
  - `compute()` rounds results (`Math.round(result * 1e10) / 1e10`) to avoid floating-point display artifacts (e.g. `0.1 + 0.2`), and returns `"Error"` on divide-by-zero instead of `Infinity`/`NaN`.
  - A single click listener is delegated across all `.btn` elements (reads `dataset.value`/`dataset.action`), and a parallel `keydown` listener mirrors the same actions for keyboard input (digits, `+ - * /`, `Enter`/`=`, `Backspace`, `Escape`). When adding a new operation, update both handlers plus `operatorSymbol()` (used for the expression-line display).

### Learning intent

This project is intentionally framework-free so the underlying mechanics — DOM selection, event listeners, `data-*` attributes for encoding intent in HTML, and plain-JS state management — stay visible. Don't introduce a framework, bundler, or dependency here; that defeats the point.
