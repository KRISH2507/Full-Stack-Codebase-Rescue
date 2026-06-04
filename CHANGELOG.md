# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-06-04

### Problem
The project started as a monolithic file containing severe anti-patterns:
- Monolithic routing file loaded with business logic.
- Vulnerable authentication using `md5` hashing.
- Severe N+1 Data Query operations causing slow shipment listing endpoints.
- Total lack of payload input validation mechanism before database interaction.
- Rampant use of global callback chaining & `var` variable declarations.

### Reason
Required structural transition to Model-View-Controller (MVC) and security updates following enterprise best practices in preparation for a production-grade release. 

### Solution
- **Restructured MVC Architecture**: Separated concerns into `controllers/`, `services/`, `models/`, `routes/`, `middlewares/`, `utils/`, and `validators/`.
- **Security Enhancements**: 
  - Migrated outdated `md5` password hashing to strict `bcrypt` algorithm.
  - Implemented generic environment var-loaded `JWT_SECRET`.
  - Tightened Role-based access control protecting delete/deliver queries.
- **Input Validation**: Set up extensive schema validations via `joi`.
- **Modern JavaScript Cleanup**: Completely eradicated `var` globally, rewriting callbacks to modern `async`/`await` implementation formats.
- **Error Extensibility**: Integrated centralized AppError inheritance and uniform error handling middleware returning 404, 401, 409, and 422 HTTP responses.

### Benefit
- Codebase is cleanly documented via JSDocs natively embedded inside controllers and services.
- The N+1 shipment population iteration has been resolved directly inside MongoDB `populate()` syntax providing dramatic performance relief.
- Enhanced robustness prevents Node application crashes upon failed promise rejections or duplicate indexes globally.