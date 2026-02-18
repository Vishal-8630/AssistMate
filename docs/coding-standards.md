# Coding Standards

## Table of Contents
- [Purpose](#purpose)
- [General Coding Principles](#general-coding-principles)
- [Naming Conventions](#naming-conventions)
- [TypeScript Standards](#typescript-standards)
- [C# / .NET Standards](#c--net-standards)
- [Function & Class Rules](#function--class-rules)
- [Error Handling Standards](#error-handling-standards)
- [Logging Standards](#logging-standards)
- [Security Practices](#security-practices)
- [Performance Guidelines](#performance-guidelines)
- [Testing Standards](#testing-standards)
- [Code Review Expectations](#code-review-expectations)
- [Linting & Formatting](#linting--formatting)


## Purpose
> This document defines coding rules and best practices for all applications within the platform.

## General Coding Principles
- **Readability First:** Code must be written for humans first, machines second.
- **Simiplicity Over Cleverness:** Avoid overly complex or "smart" solutions.
- **Single Responsibility Principle:** Each function, class, and module must have one clear responsibility.
- **Separation of concerns:** Business logic must not leak into UI or controller layers.

## Naming Conventions

**Variables:**

- camelCase
- Meaningful names
- No abbreviations unless common

**Functions:**

- camelCase
- Verb-based naming

**Classes (C#):**

- PascalCase

**Interfaces (C#):**

- Prefix with `I`

**Enums:**

- PascalCase
- Clear states

**Files & Folders:**  
Fontend: 

- kebab-case for files
- Feature-based grouping

Backend: 

- Pascalcase for classes
- Folder by layer

## TypeScript Standards
- Strict mode enabled
- No `any` type
- Explicit return types for exported functions
- Shared types stored in `/types`
- Use Zod for runtime validation

## C# / .NET Standards
- Follow Clear Architecture layer boundaries
- Use dependency injection
- No business logic in controllers
- Use async/await properly
- Avoid blocking calls

## Function & Class Rules

**Functions:**

- Maximum ~40 lines
- Avoid deep nesting
- Extract helper methods when necessary

**Classes:**

- Single responsibility
- Avoid god classes
- Constructor injection preferred

## Error Handling Standards
- Never swallow exceptions
- Use global exception middleware
- Return consistent error responses

Standard API response format:
```
{
    "success": fasle,
    "message": "Error message",
    "errors": []
}
```

## Logging Standards
- Log important business events
- Do not log sensitive information
- Use structured logging
- Error logs must include context

## Security Practices
- Never commit secrets
- Validate all inputs
- Authorize every request
- Authenticate SingnalR connections
- Sanitize user-generated content

## Performance Guidelines
- Avoid unnecessary re-renders in frontend
- Use indexing in datbase
- Avoid N + 1 queries
- Use pagination for large data sets

## Testing Standards
**Phase 1:**

- Manual testing acceptable

**Phase 2:**

- Unit tests for business logic
- Integration tests for API

> Test business logic, not controllers.

## Code Review Expectations
Reviewer must check:

- Logic correctness
- Architecture consistency
- Security issues
- Naming clarity 
- Performance implications

## Linting & Formatting
**Frontend:**

- ESLint
- Prettier
- Consistent formatting

**Backend:**

- Follow .NET conventions
- Consistent formatting rules