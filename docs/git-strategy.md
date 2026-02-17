# Git Strategy

## Table of Contents
- [Purpose](#purpose)
- [Repository Model](#repository-model)
- [Branching Strategy](#branching-strategy)
- [Branch Workflow](#branch-workflow)
- [Commit Standards](#commit-standards)
- [Pull Request Policy](#pull-request-policy)

## Purpose
> This document defines how Git is used within the project.  

It establishes: 

- How repositories are structured.
- How branches are created and managed.
- How changes are committed.
- How collaboration happens through pull request.
- How history is maintained clean and meaningful.

## Repository Model

**Monorepo** - A single repository containing all services.

## Branching Strategy
> We follow a **Lightweight Git Flow model** using two primary branches and structured supporting branches.

#### Branch Types: 
- Primary Branches
- Supporting Branches

#### Primary Branches:

`main`

- Represents production-ready code.
- Always stable.
- Always deployable.
- Protected branch.
- No direct pushes allowed.  


`develop`

- Integration branch for active development.
- All feature branches merge into `develop`.
- Must remain stable.
- Used for staging development (if applicable).
- Acts as pre-production branch.

#### Supporting Branches:
> Supporting branches are short-lived and created for specific purposes.

**Rules:**

- Created from `develop`.
- Merged back into `develop`.
- Deleted after merge.

##### Feature Branch:
> Used for implementing new features.  

**Naming format:** `feature/<short-description>`

#### Bugfix Branch:
> Used for fixing non-production bugs.

**Naming format:** `bugfix/<short-description>`

#### Hotfix Branch:
> Used for urgent production issues.

**Naming format:** `hotfix/<short-description>`

## Branch Workflow
> This section defines how branches move through the system.

#### Feature Development Workflow:
1. Checkout `develop`.
2. Create new feature branch: `git checkout -b feature/<name>`.
3. Implement feature.
4. Commit using conventional commits.
5. Push branch to remote.
6. Create Pull Request targeting `develop`.
7. Code review required.
8. Merge after approval.
9. Delete feature branch.

#### Bugfix Workflow:
1. Create branch from `develop`.
2. Implement fix.
3. Create Pull Request to `develop`.
4. Review Required.
5. Merge and delete branch.

#### Hotfix Workflow:
1. Checkout `main`.
2. Create hotfix branch: `git checkout -b <hotfix/name>`.
3. Implement fix.
4. Open Pull Request to `main`.
5. Review required.
6. Merge into `main`.
7. Merge same fix into `develop`.
8. Delete hotfix branch.

## Commit Standards
> We follow the **Conventional Commits specification** to maintain a clean and meaningful Git history.

#### Commit Format:
> All commit must follow this format: `type(scope): short description`.

**Exmple:** feat(auth): implement JWT login

#### Allowed Types:
- `feat` -> New feature
- `fix` -> Bug fix
- `refactor` -> Code change without feature or bug fix
- `docs` -> Documentation changes
- `style` -> Formatting only (no logic change)
- `test` -> Adding or modifying tests
- `chore` -> Configuration or dependency updates
- `perf` -> Performance improvements

#### Scope Usage:
> Scope is optional but recommended.  
Scope should indicate the affected module.

**Example:** `feat(auth)`, `feat(chat)`, `refactor(api)`

#### Commit Rules:
- No vague commit messages (e.g., "updated", "final", "changes").
- No unrelated changes in a single commit.
- Each commit must represent a logical unit of change.
- Large changes must be broken into smaller commits.
- Code must compile before committing.

## Pull Request Policy
> All changes must go through a Pull Request (PR).  
Direct commits to `main` or `develop` are not allowed.  

#### PR Requirements:
>Every Pull Request must include:  

- Clear title
- Description of changes
- Reason for change
- Reference to related issue or user story
- Screenshots (if UI-related)

#### Review Rules:
- At least one approval required.
- Author must not approve their own PR.
- Review comments must be addressed before merge.
- Large PRs should be avoided.

#### Merge Conditions:
- It is approved.
- No unresolved review comments remain.
- Branch is up to date with target branch.
- No conflicts exist.