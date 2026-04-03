---
name: rust
description: Rust development specialist for async services, CLI tools, and systems programming. Use when writing Rust code, configuring Cargo, handling lifetimes/ownership, or building async services.
license: Apache-2.0
compatibility: Designed for Claude Code
allowed-tools: Read, Grep, Glob, Bash
metadata:
  version: "2.0.0"
  status: "active"
  updated: "2026-02-22"
---

# Rust Development

## When to Use

- `.rs` files and `Cargo.toml` configurations
- Async services, CLI tools, and systems components
- Ownership, lifetime, trait, and performance-sensitive work

## Core Principles

- Use `clippy` and `rustfmt` as non-negotiable quality gates
- Explicit error types at library boundaries
- Unsafe code must be isolated and documented
- Avoid panics in production code paths — use `Result<T, E>` consistently

## Standard Workflow

1. Identify crate boundaries and APIs
2. Implement minimal changes with clear typing
3. Add/update tests for changed behavior
4. Run formatting and linting

## Quality Requirements

```bash
cargo fmt                    # Format
cargo clippy -- -D warnings  # Lint (warnings as errors)
cargo test                   # Test
cargo build                  # Build
```

All code must pass all three before marking work complete.

## Error Handling

```rust
// ✅ Use Result at boundaries
pub fn parse_config(path: &str) -> Result<Config, ConfigError> {
    // ...
}

// ❌ Avoid panics in production paths
// .unwrap() only in tests or when truly infallible
```

## Async Patterns

```rust
use tokio::runtime::Runtime;

// Async service entry point
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // ...
    Ok(())
}
```

## Common Commands

```bash
cargo new my_project          # New binary
cargo new --lib my_lib        # New library
cargo add serde               # Add dependency
cargo update                  # Update dependencies
cargo doc --open              # Build and open docs
```
