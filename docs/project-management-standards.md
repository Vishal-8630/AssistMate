# Project Management Standards

## Table of Contents
- [Purpose](#purpose)
- [Work Hierarchy](#work-hierarchy)
- [Epic Standards](#epic-standards)
- [User Story Standards](#user-story-standards)
- [Task Standards](#tasks-standards)
- [Bug Management](#bug-management)
- [Sprint Structure](#sprint-strucutre)
- [Board Structure](#board-strucutre-github-projects)
- [Definition of Done](#definition-of-done)
- [Backlog Management](#backlog-management)

## Purpose
> This document defines are work is structured, planned, tracked, and completed.

## Work Hierarchy
> All work must follow a structured hierarchy

#### Epic:
> All Epic represents a large feature or system module.

**Examples:**

- Authentication System
- Chat Engine
- Notification System

#### User Story: 
> A User Story represents a functional feature from a user perspective.

It must describe:
- Who
- What
- Why

> User Stories belong to an Epic.

#### Task:
> A Task represents a technical implementation step required to complete a User Story.  
Tasks are developer-focused and actionable.

#### Bug:
> A Bug represents an issue in existing functionality.  
Bugs must not be mixed with feature tasks.

## Epic Standards

#### Naming Convention:
> Epic titles must be clear and module-based.

**Format:** `EPIC: <Module Name>`
**Example:** `EPIC: Authentication System`

#### Required Sections:
- Objective
- Scope
- Out of Scope
- High-level technical overview
- Success criteria

## User Story Standards

#### User Story Format:
All user stories must follow:  
```
As a <type of user>,
I want to <perform action>,  
So that <achieve benefit>.  
```

Example:
```
As a user,
I want to log in with email and password,
So that I can access my dashboard.
```

#### Acceptance Criteria (Mandatory):
> Each user story must include measurable acceptance criteria.

Example:
- User can input email
- User can input password
- System validates inputs
- JWT token in generated
- Error shown for invalid credentials

> No acceptance criteria = story not ready

#### Definition of Ready
A User Story is ready for development only if:

- Scope is clear
- Acceptance criteria defined
- Dependencies identified
- No ambiguity exists

## Tasks Standards
Tasks should be:

- Small
- Clear
- Achievable within 1-2 days

> Avoid tasks longer than 2 days.  
If too large -> break it down.

#### Technical Task Guidelines:
Tasks must:

- Reference related user story
- Define clear technical objective
- Avoid vague wording

## Bug Management

#### Severity Levels:
Bugs must be categorized as:

- Critical -> Production broken
- Major -> Core feature impacted
- Minor -> UI or small logic issue

#### Bug Workflow:
- Create bug issue
- Assign severity
- Create bugfix branch
- Fix and PR
- Merge after review

## Sprint Strucutre
> We follow a **Flexible 1-Week Sprint Model**.

#### Sprint Duration:
- 1 Week
- Monday -> Sunday

#### Sprint Planning:
At start of week:

- Review backlog
- Select stories for sprint
- Estimate loosely
- Define sprint goal

#### During Sprint:
- Continuous delivery
- Features merged to `develop`
- Scope change only if necessary
- New ideas go to backlog

#### Sprint Review:
At end of sprint:

- Reivew completed work
- Demo if applicable
- Move incomplete stories back to backlog
- Identify blockers

#### Retrospective (Lightweight):
Quick discussion:

- What worked well?
- What slowed us down?
- What can improve next sprint?

## Board Strucutre (GitHub Projects)
> We use a Kanban-style board.

Columns: 

- **Backlog:** -> Not priotized
- **Ready:** -> Approved for sprint
- **In Progress:** -> Being worked on
- **In Review:** -> PR created
- **Done:** -> Merged and completed

## Definition of Done
A work item is Done only if:

- Code implemented
- Acceptance criteria satisfied
- Reviewed and approved
- Merged to correct branch
- No console errors
- Documentation updated if required

## Backlog Management
- New ideas go to Backlog
- Backlog reviewed weekly
- Prioritize based on impact and effort
- Avoid unstructured feature creep.