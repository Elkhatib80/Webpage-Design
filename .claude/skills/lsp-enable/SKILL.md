---
name: lsp-enable
description: LSP-first code intelligence protocols. Mandatory use of Language Server Protocol operations before modifying, refactoring, or verifying code. Use when working with unfamiliar code, doing refactors, or verifying correctness.
---

# LSP-First Code Intelligence

## Three Iron Laws

```
1. NO MODIFYING UNFAMILIAR CODE WITHOUT goToDefinition FIRST
2. NO REFACTORING WITHOUT findReferences IMPACT ANALYSIS FIRST
3. NO CLAIMING CODE WORKS WITHOUT LSP DIAGNOSTICS VERIFICATION
```

## Nine Primary LSP Operations

| Operation | Purpose |
|---|---|
| `goToDefinition` | Navigate to where a symbol is defined |
| `goToImplementation` | Find concrete implementations |
| `findReferences` | Locate all usages across the project |
| `workspaceSymbol` | Search symbols by name |
| `hover` | Get type info and docs |
| `documentSymbol` | Get file structure |
| `prepareCallHierarchy` | Start call graph analysis |
| `incomingCalls` | What calls this function |
| `outgoingCalls` | What this function calls |

Each operation requires: absolute file path, line number (1-based), character column (1-based).

## Pre-Edit Protocol (Mandatory)

1. `goToDefinition` → understand implementation
2. `findReferences` → assess change impact
3. `hover` → verify type signatures
4. Make changes

## Post-Edit Verification (Mandatory)

1. `LSP diagnostics` → check for errors
2. Verify no new type errors
3. Confirm imports resolve
4. Validate interface contracts

## When to Use LSP vs Grep/Glob

| Task | Use |
|---|---|
| Symbol navigation | LSP goToDefinition |
| Find all usages | LSP findReferences |
| Type info/docs | LSP hover |
| File structure | LSP documentSymbol |
| Literal text search | Grep (TODOs, strings, config) |
| File patterns | Glob (discovering files by name) |

## Why LSP

~50ms vs 45s grep, exact semantic matches, no false positives, saves tokens on large codebases.
When codebase > 20 files, LSP saves tokens vs grep.
