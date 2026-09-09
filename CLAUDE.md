# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A four-function calculator built with plain HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies, no package.json.

### Running it

There is no build/lint/test tooling for the app code itself — it's still plain HTML/CSS/JS.

- **Quick iteration:** open `index.html` directly in a browser. No dev server or CLI command needed.
- **Docker (nginx):** the app is also packaged behind nginx for a more production-like serving story.

  ```bash
  docker build -t calculator .
  docker run --rm -d -p 8080:80 --name calculator calculator
  ```

  Then open http://localhost:8080. Stop it with `docker stop calculator`.

### Architecture

- `index.html` — page structure. Each button carries a `data-value` attribute (digits, `.`) or a `data-action` attribute (`add`, `subtract`, `multiply`, `divide`, `equals`, `clear`, `delete`, `percent`) that `script.js` reads to decide what to do. Keep new buttons consistent with this `data-*` convention rather than adding ids/classes for behavior.
- `style.css` — dark theme, calculator centered via flexbox, buttons in a 4-column CSS grid, color-coded by button type (operators yellow, function keys red, `=` spans two columns).
- `script.js` — all logic, no external libraries:
  - State is three module-level variables: `currentOperand`, `previousOperand`, `operation`.
  - `chooseOperation()` auto-computes a pending calculation before starting the next one, which is what makes chained input like `2 + 3 + 4` work.
  - `compute()` rounds results (`Math.round(result * 1e10) / 1e10`) to avoid floating-point display artifacts (e.g. `0.1 + 0.2`), and returns `"Error"` on divide-by-zero instead of `Infinity`/`NaN`.
  - A single click listener is delegated across all `.btn` elements (reads `dataset.value`/`dataset.action`), and a parallel `keydown` listener mirrors the same actions for keyboard input (digits, `+ - * /`, `Enter`/`=`, `Backspace`, `Escape`). When adding a new operation, update both handlers plus `operatorSymbol()` (used for the expression-line display).
- `Dockerfile` — single-stage build on `nginx:alpine`. Copies the three static files into `/usr/share/nginx/html` and a custom `nginx.conf` into `/etc/nginx/conf.d/default.conf`. No build step exists, so no multi-stage image is needed.
- `nginx.conf` — minimal server block: explicit port 80, gzip for CSS/JS, short cache headers on static assets, `try_files` for request handling.
- `.dockerignore` — keeps `.git`, docs, and the Docker meta-files themselves out of the build context.

### Learning intent

This project is intentionally framework-free so the underlying mechanics — DOM selection, event listeners, `data-*` attributes for encoding intent in HTML, and plain-JS state management — stay visible. Don't introduce a framework, bundler, or dependency here; that defeats the point.

This guidance is about the app code (`index.html`/`style.css`/`script.js`) — the Dockerfile and `nginx.conf` are packaging for serving the app, not an application dependency, and don't change any of the above.
