# QA Automation: SauceDemo (Playwright + TypeScript)

[![Playwright Tests](https://github.com/SarkissArmaniUS/qa-playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/SarkissArmaniUS/qa-playwright-saucedemo/actions/workflows/playwright.yml)
[![Report](https://img.shields.io/badge/Test%20report-live-brightgreen)](https://SarkissArmaniUS.github.io/qa-playwright-saucedemo/)

End-to-end UI test framework for the demo shop [saucedemo.com](https://www.saucedemo.com).
24 tests cover login, inventory sorting, cart and checkout, built with the Page Object Model and a shared authenticated session.

## Tech stack
Playwright · TypeScript · Page Object Model · Fixtures · GitHub Actions · GitHub Pages (HTML report)

## What is covered
| Area | Tests | Examples |
|---|---|---|
| Login | 6 | valid user, locked-out user, wrong/empty credentials, direct URL access without login |
| Inventory | 7 | product count, 4 sort modes (name/price), cart badge, logout |
| Cart | 5 | add, remove (2 places), counter, continue shopping |
| Checkout | 6 | happy path, totals math (subtotal + tax), required-field validation |

## Project structure
```
pages/       Page Objects (Login, Inventory, Cart, Checkout)
fixtures/    Custom test fixtures + test data
tests/       *.spec.ts files + auth.setup.ts (logs in once, reuses the session)
.github/     CI workflow: run on every push/PR, publish report to Pages
```

## Design decisions
- **Auth once:** `auth.setup.ts` saves `storageState`; tests start already logged in (login tests opt out).
- **Page Objects expose locators and actions, assertions stay in tests.**
- **Locators by `data-test`** (`testIdAttribute` configured), not brittle CSS/XPath.
- **Independent tests:** each test sets up its own state and can run in parallel.

## Run locally
```bash
npm ci
npx playwright install chromium
npm test            # headless
npm run test:ui     # Playwright UI mode
npm run report      # open HTML report
```

## CI
Every push and pull request runs the suite on GitHub Actions. On `main` the HTML report is published to GitHub Pages.
# qa-playwright-saucedemo
