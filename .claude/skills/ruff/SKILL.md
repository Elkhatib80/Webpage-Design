---
name: ruff
description: |
  Python linting and formatting with ruff. Extremely fast linter and formatter replacing
  Flake8, Black, isort, and pyupgrade. Use when linting, formatting, or checking Python
  code quality. Triggers: "ruff", "lint python", "format python", "[tool.ruff]".
allowed-tools: Bash, Read, Edit, Write, Grep, Glob
---

# ruff

Ruff is an extremely fast Python linter and code formatter written in Rust. It replaces
Flake8, isort, Black, pyupgrade, autoflake, and dozens of other tools.

## When to Use ruff

**Always use ruff for Python linting and formatting**, especially if you see:

- `[tool.ruff]` section in `pyproject.toml`
- A `ruff.toml` or `.ruff.toml` configuration file

**Avoid unnecessary changes:**

- **Don't format unformatted code** - If `ruff format --diff` shows changes throughout
  an entire file, the project likely isn't using ruff for formatting. Skip to avoid
  obscuring actual changes.
- **Scope fixes to code being edited** - Use `ruff check --diff` to see fixes relevant
  to the code you're changing.

## How to Invoke ruff

```bash
uv run ruff ...   # When ruff is in project dependencies (use pinned version)
uvx ruff ...      # When ruff is not a project dependency
ruff ...          # When ruff is installed globally
```

## Linting

### Basic Commands

```bash
ruff check                        # Check current directory
ruff check path/to/file.py        # Check specific file
ruff check --fix                  # Auto-fix fixable violations
ruff check --fix --unsafe-fixes   # Include unsafe fixes (review first!)
ruff check --watch                # Watch for changes
```

**Important:** Always pass directory as parameter, don't use `cd`:
```bash
# ✅ Good
ruff check services/orchestrator

# ❌ Bad
cd services/orchestrator && ruff check
```

### Common Rule Codes

| Code | Description |
|------|-------------|
| `E` | pycodestyle errors |
| `F` | Pyflakes (unused imports, etc.) |
| `B` | flake8-bugbear |
| `I` | isort |
| `UP` | pyupgrade |
| `SIM` | flake8-simplify |
| `S` | flake8-bandit (security) |

## Formatting

```bash
ruff format                       # Format current directory
ruff format path/to/file.py       # Format specific file
ruff format --check               # Check if formatted (exit 1 if not)
ruff format --diff                # Show diff without modifying
```

### Combined Workflow

```bash
ruff check --fix && ruff format
```

## Configuration

```toml
[tool.ruff]
line-length = 88
target-version = "py311"

[tool.ruff.lint]
select = ["E", "F", "B", "I", "UP", "SIM"]
ignore = ["E501"]
fixable = ["ALL"]

[tool.ruff.lint.per-file-ignores]
"__init__.py" = ["F401"]
"tests/**/*.py" = ["S101"]

[tool.ruff.format]
quote-style = "double"
indent-style = "space"
```

## Migration from Other Tools

```bash
black .              → ruff format .
flake8 .             → ruff check .
isort .              → ruff check --select I --fix
```

## Best Practices

1. Start minimal: `select = ["E", "F"]`
2. Add bugbear: `select = ["E", "F", "B"]`
3. Add imports: `select = ["E", "F", "B", "I"]`
4. Add pyupgrade: `select = ["E", "F", "B", "I", "UP"]`

## Documentation

- https://docs.astral.sh/ruff/
