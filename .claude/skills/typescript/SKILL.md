---
name: typescript
description: TypeScript development specialist for strict typing, React/Next.js patterns, schema validation, and type-safe API workflows. Use when implementing or refactoring TypeScript codebases.
license: Apache-2.0
compatibility: Designed for Claude Code
allowed-tools: Read, Grep, Glob, Bash
metadata:
  version: "2.0.0"
  status: "active"
  updated: "2026-02-22"
---

# TypeScript Development

## Core Principles

- Maintain `strict: true` in TypeScript configuration
- Prefer type inference unless explicit types enhance readability
- Use schema validation (Zod) for untrusted input
- Employ discriminated unions instead of boolean flags
- Forbid `any` without documentation
- Require exhaustive branching for tagged unions
- Mandate runtime validation for API and form data

## Standard Workflow

1. Confirm type boundaries
2. Implement minimal typed changes
3. Add/update tests
4. Run validation checks

## Quality Requirements

```bash
bun install              # Install dependencies
tsc --noEmit             # Type check
bun run test             # Test
bun run lint             # Lint
```

## Key Patterns

```typescript
// Discriminated unions (prefer over boolean flags)
type State =
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: string };

// Zod for runtime validation
import { z } from 'zod';
const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});
type User = z.infer<typeof UserSchema>;

// Result type for error handling
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
```

## tsconfig Essentials

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## Export Policy

All public types should be exported from stable module boundaries.
