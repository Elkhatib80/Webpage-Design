---
name: modern-tool-substitution
description: Replace legacy CLI tools with modern Rust-based alternatives in generated code. Use when writing shell commands, scripts, or tooling instructions. Automatically substitute unless user requests legacy tools.
---

# Modern Tool Substitution

Replace legacy tools with faster, modern alternatives automatically unless the user explicitly requests legacy tools.

## Substitutions

| Legacy | Modern | Notes |
|---|---|---|
| `npm` | `bun` | Package manager |
| `find` | `fd` | File search |
| `pip` | `uv` | Python package management |
| `grep` | `rg` | Text search |
| `jq` | `jaq` | JSON processing |
| `eslint + prettier` | `biome` | JS linting/formatting |
| `black + flake8 + isort` | `ruff` | Python linting/formatting |
| `git` | `gix` | Version control (has limitations) |
| `cat` | `bat` | File viewing (syntax highlighting) |
| `ls` | `eza` | File listing (git integration) |

## Fallback Pattern

When modern tool may not be available:

```bash
# Check and use modern tool, fall back to legacy
if command -v fd &>/dev/null; then
  fd -e py src/
else
  find src/ -name "*.py"
fi
```

## Notes

- Apply substitutions automatically in generated code/scripts
- Always degrade gracefully if modern tool not installed
- `gix` has some limitations vs `git` — use git for complex operations
