# Release Strategy

## Table of Contents
- [Purpse](#purpose)
- [Versioning Policy](#versioning-policy)
- [Release Types](#release-types)
- [Release Workflow](#release-workflow)
- [Environment Strategy](#environment-strategy)
- [Release Checklist](#release-checklist)
- [Rollback Strategy](#rollback-strategy)
- [Release Documentation](#release-documentation)
- [Future CI/CD Integration](#future-cicd-integration)

## Purpose
> This document defines how software versions are prepared, tagged, and released to production.

## Versioning Policy
> We follow **Semantic Versioning (SemVer)**.

**Format:** `MAJOR.MINOR.PATCH`  
**Example:** `1.0.0`, `1.1.0`, `1.1.1`, `2.0.0`

#### MAJOR version increment:
- Breaking API changes.
- Database schema incompatible changes.
- Architectural redesign.
- Removal of existing features.

**Example:** `1.4.2 -> 2.0.0`

#### MINOR version increment: 
- New features added.
- Backward-compatible enhancements.
- Significant improvements without breaking changes

**Example:** `1.4.2 -> 1.5.0`

#### PATCH version increment: 
- Bug fixes.
- Small improvements.
- Security patches.
- Performance tweaks.

**Example:** `1.4.2 -> 1.4.3`

## Release Types

#### Major Release:
- Contains breaking changes
- Requires full testing cycle
- May require migration steps

#### Minor Release:
- Adds new features
- Backward compitable
- Standard release cycle

#### Patch Release:
- Bux fixes
- No new features
- Fast deployment cycle

#### Hotfix Release: 
- Emergency production issue
- Created from `main`
- Must be merged back into `develop`

## Release Workflow

#### Preparing a Release:
- Ensure all planned features for sprint are merged into `develop`
- Verify no open critical bugs
- Confirm code review complete
- Update documentation if required

#### Release Merge:
- Create Pull Request from `develop -> main`
- Review changes
- Merge after approval
- Delete release branch (if created)

#### Creating a Release tag:
> After merging into `main`:

```git
git checkout main
git pull origin main
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin main
git push origin vX.Y.Z
```

> Each production release must have a Git tag.

#### Deployment Process:
- Deploy code from `main` branch only
- Confirm successful deployment
- Verify application health
- Monitor logs for issues

> Deployment must never occur directly from feature branches.

## Environment Strategy
> We maintain three environments.

#### Development:
- Local developer environment
- Used for feature implementation

**Branch mapping:** `feature/* -> local`, `bugfix/* -> local`

#### Staging: 
- Pre-production testing
- Mirrors production configuration
- Used for sprint validation

**Branch mapping:** `develop -> staging`

#### Production: 
- Live environment
- Real users
- Must remain stable

**Branch mapping:** `main -> production`

## Release Checklist
Before every production release:

- All Prs merged
- No open critical bugs
- Version number updated
- Documentaiton updated
- Database migrations reviewed (if any)
- Environment tested in staging
- Deployment tested in staging
- Tag created after merge

## Rollback Strategy
If production issues occur:

- Identify last stable tag
- Redeploy previous stable version
- Create hotfix branch
- Fix issue
- Release patch version

## Release Documentation
Every release must include:

- Version number
- Release date
- Summary of changes
- Known issues (if any)

Release notes should be stored:

- In GitHub Releases
- or `/docs/releases/<version>.md`

## Future CI/CD Integration
When CI/CD is introducted:

- Automated testing before merge
- Automatic tagging
- Automatic staging deployment
- Controlled production deployement
- Rollback automation