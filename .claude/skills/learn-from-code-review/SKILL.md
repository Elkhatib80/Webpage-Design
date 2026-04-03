---
name: learn-from-code-review
description: Distill code review feedback from GitHub PRs into reusable skills and guidelines. This skill should be used when users ask to "learn from code reviews", "distill PR feedback", "improve coding standards", "extract learnings from reviews", or want to generate skills/guidelines from historical review comments.
triggers:
- /learn-from-reviews
- learn from code review
- distill reviews
---

# Learn from Code Review

Analyze code review comments from GitHub pull requests and distill them into reusable skills or repository guidelines that improve future code quality.

## Overview

Code review feedback contains valuable institutional knowledge that often gets buried across hundreds of PRs. This skill extracts meaningful patterns from review comments and transforms them into:

1. **Repository-specific skills** - Placed in `.openhands/skills/` for domain-specific patterns
2. **AGENTS.md guidelines** - Overall repository conventions and best practices

## Prerequisites

- `GITHUB_TOKEN` environment variable must be set
- GitHub CLI (`gh`) should be available

## Workflow

### Step 1: Identify Target Repository

```bash
gh repo view --json nameWithOwner -q '.nameWithOwner'
```

### Step 2: Fetch Review Comments

```bash
# Fetch merged PRs from the last 30 days
gh pr list --repo {owner}/{repo} \
  --state merged \
  --limit 50 \
  --json number,title,mergedAt

# For each PR, fetch review comments
gh api repos/{owner}/{repo}/pulls/{pr_number}/comments \
  --jq '.[] | {body: .body, path: .path, user: .user.login, created_at: .created_at}'

# Fetch review-level comments
gh api repos/{owner}/{repo}/pulls/{pr_number}/reviews \
  --jq '.[] | select(.body != "") | {body: .body, user: .user.login, state: .state}'
```

### Step 3: Filter and Categorize Comments

**Exclude:**
- Bot comments (dependabot, copilot, github-actions, etc.)
- Low-signal responses ("LGTM", "+1", "looks good", "thanks", "nice")
- Comments shorter than 30 characters
- Auto-generated comments (CI status, coverage reports)

**Categorize remaining comments by:**
- Security concerns
- Performance patterns
- Code style/conventions
- Architecture/design patterns
- Error handling
- Testing requirements
- Documentation standards

### Step 4: Distill Patterns

For each category with sufficient examples (3+ similar comments), identify:

1. **The recurring issue** - What mistake or oversight keeps appearing
2. **The desired pattern** - What reviewers consistently ask for
3. **Example context** - Concrete before/after code snippets when available

### Step 5: Generate Output

Place skills in `.openhands/skills/{domain-name}/SKILL.md`.

### Step 6: Create Draft PR

Open a draft PR with the proposed changes including:
- Number of PRs analyzed
- Number of comments processed
- Categories of patterns found
- List of proposed changes

## Defaults

Analyzes PRs from the past 30 days by default.

## Best Practices

1. **Run periodically** - Schedule monthly or quarterly to capture evolving patterns
2. **Review before merging** - Generated content is a draft; human review is essential
3. **Iterate** - Refine patterns based on team feedback
4. **Avoid duplication** - Check existing AGENTS.md and skills before adding
5. **Cite sources** - Reference PR numbers when documenting patterns

## Limitations

- Only analyzes accessible repositories (requires appropriate permissions)
- Cannot capture verbal feedback from pair programming or meetings
- Patterns may reflect individual reviewer preferences vs. team consensus
- Historical comments may reference outdated code patterns
