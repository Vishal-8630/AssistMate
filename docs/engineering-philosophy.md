# Engineering Philosophy

## Table of Contents
- [Purpose](#purpose)
- [Principles](#principles)
- [Development Model](#development-model)
- [Project Layers](#project-layers-architecture-philosophy)
- [Code Ownership](#code-ownership)
- [Quality Expectations](#quality-expctations)
- [Review Culture](#review-culture)


## Purpose
This document defines how we build software.  
It represents our engineering mindset and serves as the foundation for all current and future projects.

## Principles

**1. Clarity over speed** - We prefer readable, maintainable, and scalable code over quick hacks.  
**2. Small increments** - We ship in small, manageable increments.  
**3. No silent assumptions** - If It is important, it must be written down. Documentation is prefered over memory.  
**4. Review everything** - All code must be reviewed before merging. There is no ego in code.  
**5. Clearn history matters** - Git history is the story of the project. Commits must be meaningful and structured. We avaoid messy, unclean commit messages.

## Development Model

#### Sprint Structure
- Sprint duration: **1 Week**.
- Sprint planning: Beginning of week.
- Sprint review: End of week.

#### Sprint Goals
- Deliver small, complete features.
- Maintain stability of main branch.
- Avoid unfinished long-running branches.

#### Backlog Management
- Work is defined as Epics -> User Stories -> Tasks.
- Every User Story must have acceptance criteria.
- No development starts without a defined scope.

## Project Layers (Architecture Philosophy)

#### Layered Structure
Client (Web / Mobile) -> API Layer -> Business Logic Layer -> External Services (AI / Blockchain etc.) -> Database

#### Rules
- UI must not contain business logic
- Controllers must not contain complex business rules.
- Business logic must not directly depend on UI.
- External services must be abstracted.
- No cross-layer shortcuts.

## Code Ownership
We follow a **Shared Ownership Model**.  

- Any developer can improve any module.
- No module belongs permanently to one person.
- Every pull request must be reviewed by the other developer.
- Knowledge must not be siloed.

## Quality Expctations
- Readable
- Moduler
- Testable
- Secure 
- Documented
- Versioned
- Reviewed

#### Definition of Done
A task is considered complete only when:  

- Code is implemented.
- Code is reviewed.
- Acceptance criteria are satisfied.
- No console errors or warnings.
- Documentation updated (if required).
- Merged properly via pull request.

## Review Culture
Code reviews are mandatory.  

#### Review Rules
- Reviews focus on code quality, not the developer.
- Suggestions must be constructive.
- Large pull requests should be avoided.
- Discussions should happen inside pull request threads.

#### Merge Policy
- No direct pushes to main.
- Pull request required.
- At least one approval required before merge.
