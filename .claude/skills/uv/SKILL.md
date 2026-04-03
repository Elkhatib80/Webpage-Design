---
name: uv
description: |
  Python package and project management with uv. Extremely fast tool replacing pip, poetry,
  pyenv, and virtualenv. Use when installing packages, running scripts, managing environments,
  or working with workspaces. Triggers: "uv", "pip install", "python project", "uv.lock".
allowed-tools: Bash, Read, Edit, Write, Grep, Glob
---

# uv

uv is an extremely fast Python package and project manager written in Rust. It replaces
pip, pip-tools, pipx, pyenv, virtualenv, and poetry.

## When to Use uv

**Always use uv for Python work**, especially if you see:
- The `uv.lock` file
- uv headers in `requirements*` files

**Don't use uv** in projects managed by other tools (Poetry, PDM).

## Workflows

### Scripts

```bash
uv run script.py                      # Run a script
uv run --with requests script.py      # Run with additional packages
uv add --script script.py requests    # Add inline dependencies to script
```

### Projects

```bash
uv init                   # Create new project
uv add requests           # Add dependency
uv add --dev pytest       # Add dev dependency
uv remove requests        # Remove dependency
uv sync                   # Install from lockfile
uv run <command>          # Run in project environment
uv run -p 3.12 <command>  # Run with specific Python version
```

### Tools (CLI without installation)

```bash
uvx <tool> <args>            # Run tool without installation
uvx ruff check .             # Example: run ruff
```

### Pip Interface (legacy)

```bash
uv venv                                # Create virtual environment
uv pip install -r requirements.txt     # Install from requirements
uv pip compile requirements.in -o requirements.txt
uv pip sync requirements.txt
```

## Python Version Management

```bash
uv python install 3.12           # Install Python version
uv python list --only-installed  # List installed versions
uv python pin 3.12               # Pin version for project
```

## Common Patterns

```bash
# ❌ Bad — don't use pip in uv projects
uv pip install requests
# ✅ Good
uv add requests

# ❌ Bad
python script.py
# ✅ Good
uv run script.py

# ❌ Bad
python -m venv .venv && source .venv/bin/activate
# ✅ Good
uv run <command>
```

## Migration

```bash
# From pyenv
pyenv install 3.12       → uv python install 3.12
pyenv local 3.12         → uv python pin 3.12

# From pipx
pipx run ruff            → uvx ruff
pipx install ruff        → uv tool install ruff

# From pip
pip install package      → uv pip install package  (or uv add)
virtualenv .venv         → uv venv
```

## Documentation

- https://docs.astral.sh/uv/
- https://docs.astral.sh/uv/llms.txt
