---
name: data-formats
description: Data format specialist covering TOON encoding, JSON/YAML optimization, serialization patterns, and data validation for modern applications. Use when optimizing data for LLM transmission, implementing high-performance serialization, validating data schemas, or converting between data formats.
allowed-tools: Read Write Edit Grep Glob mcp__context7__resolve-library-id mcp__context7__get-library-docs
user-invocable: false
---

# Data Format Specialist

## Quick Reference

Advanced Data Format Management covering TOON encoding, JSON/YAML optimization, serialization patterns, and data validation for performance-critical applications.

**Core Capabilities:**
- TOON Encoding: 40-60% token reduction vs JSON for LLM communication
- JSON/YAML Optimization: Efficient serialization and parsing patterns
- Data Validation: Schema validation, type checking, error handling
- Format Conversion: Seamless transformation between data formats
- Performance: Optimized data structures and caching strategies
- Schema Management: Dynamic schema generation and evolution

**When to Use:**
- Optimizing data transmission to LLMs within token budgets
- High-performance serialization/deserialization
- Schema validation and data integrity
- Format conversion and data transformation
- Large dataset processing and optimization

## Implementation Guide

### Core Concepts

**TOON (Token-Optimized Object Notation):**

Custom binary-compatible format optimized for LLM token usage with type markers:
- `#` for numbers
- `!` for booleans
- `@` for timestamps
- `~` for null

Achieves 40-60% size reduction vs JSON for typical data structures with lossless encoding/decoding.

**Performance Optimization:**

Ultra-fast JSON processing using orjson, streaming for large datasets via ijson, intelligent caching with LRU eviction, and schema compression.

**Data Validation:**

Type-safe validation with custom rules, schema evolution support, cross-field validation, and performance-optimized batch processing.

## Technology Stack

**Core Libraries:** orjson, PyYAML, ijson, python-dateutil, regex

**Performance Tools:** lru_cache, pickle, hashlib, functools

**Validation Libraries:** jsonschema, cerberus, marshmallow, pydantic

---

**Status:** Production Ready
**Last Updated:** 2026-01-11
