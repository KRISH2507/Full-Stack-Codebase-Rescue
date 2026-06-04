# Codebase Audit

## Summary

* Total smells found: 13
* Critical count: 5
* High count: 4
* Medium count: 4

## Issues Table

| File | Issue | Severity | Explanation |
| :--- | :---- | :------- | :---------- |
| `src/routes.js` | NoSQL Injection (Spread Operator) | CRITICAL | Directly saving `req.body` into mongoose models enables injection attacks. |
| `src/routes.js` | MD5 Hashing | CRITICAL | Uses outdated, easily crackable MD5 algorithm for passwords. |
| `src/routes.js` | Missing Input Validation | CRITICAL | No validation before processing database payloads. |
| `src/routes.js` | Missing Authorization | CRITICAL | Anybody with a token can delete any shipment regardless of ownership. |
| `src/routes.js` | Magic Strings for Roles & Status | HIGH | Hardcoded statuses instead of enumerations causing fragility. |
| `src/routes.js` | Hardcoded JWT Secret | HIGH | Hardcoded fallback for JWT secret which can leak to source control. |
| `src/routes.js` | N+1 Query Problem | CRITICAL | Fetching user details iteratively inside a loop for shipments. |
| `src/routes.js` | Callback Hell / .then() chaining | MEDIUM | Chained promises instead of readable `async/await`. |
| `src/routes.js` | Mixing Concerns (Fat Routes) | HIGH | Route file contains routing, business logic, DB queries, and auth. |
| `src/routes.js` | Non-Existent Error Catch in Promises | HIGH | `findById` in profile route missing `.catch()` entirely leading to unhandled promise rejections. |
| `src/app.js` | Inconsistent `var` Usage | MEDIUM | Heavy use of `var` instead of block-scoped `let`/`const`. |
| `src/app.js` | Global Error Handler Missing | MEDIUM | No centralized error handling architecture, crashes on unhandled errors. |
| `src/routes.js` | Unused Imports | MEDIUM | Several imports (`path`, `http`, `os`, `fs`) imported but never used. |
