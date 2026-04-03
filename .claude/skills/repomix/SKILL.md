---
name: repomix
description: Packages repositories into AI-friendly bundles with Repomix and can reconstruct files from existing Repomix outputs. Use when packaging codebases for LLM analysis, creating repository snapshots, reversing bundles, or preparing security audits. Triggers include "repomix", "package codebase", "repomix-unmix", "extract-bundle", "AI-friendly", or "LLM context".
allowed-tools: Bash, Read, Write, Edit, Glob
user-invocable: true
---

# Repomix Skill

Repomix packs entire repositories into single, AI-friendly files for LLMs.

## Quick Start

```bash
# Check/install
repomix --version
bun install -g repomix

# Basic usage
repomix                          # Package current dir → repomix-output.xml
repomix --style markdown         # Markdown format
repomix --style json             # JSON format
bunx repomix --remote owner/repo # Remote repository
repomix --include "src/**/*.ts" --remove-comments -o output.md
```

## Core Capabilities

- AI-optimized formatting with clear separators
- Multiple output formats: XML, Markdown, JSON, Plain text
- Git-aware (respects .gitignore)
- Token counting for LLM context management
- Security checks for sensitive information

## Common Use Cases

```bash
# Code review
repomix --include "src/**/*.ts" --remove-comments -o review.md --style markdown

# Security audit
bunx repomix --remote vendor/library --style xml -o audit.xml

# Full codebase context
repomix --remove-comments --copy
```

## Bundle Reconstruction (Reverse)

When given a Repomix bundle, extract it back to files:
1. Identify format (XML, Markdown, or JSON)
2. Scan and extract file paths
3. Recreate each file with Write/Edit
4. Validate structure

## Command Reference

```bash
# File selection
repomix --include "src/**/*.ts,*.md"
repomix -i "tests/**,*.test.js"

# Output
repomix --style markdown -o output.md
repomix --remove-comments
repomix --copy                    # Copy to clipboard

# Config
repomix --init                    # Create repomix.config.json
```

## Exploration (after packing)

Never read entire output at once — search incrementally:

```bash
rg -i "export.*function|class " repomix-output.xml
Read("repomix-output.xml", offset=0, limit=500)
```

## Security

Uses Secretlint to detect API keys, passwords, credentials. Always review before sharing.

```bash
repomix --no-security-check  # Disable if needed
```

## Resources

- https://github.com/yamadashy/repomix
- https://repomix.com/guide/
