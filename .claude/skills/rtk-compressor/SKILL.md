---
name: rtk-compressor
description: Intelligently compress CLI command output to reduce token consumption by 60-90%. Use when processing large command outputs, ls/tree listings, test results, or JSON/log data.
---

# RTK Compressor

Compress CLI command output to reduce token consumption by 60-90%.

## Features

- Remove comments, blank lines, boilerplate code
- Aggregate similar items
- Preserve core information
- Supports multiple output types: ls/tree, cat/read, test output, JSON/logs

## Usage

```bash
# Compress output directly
echo "output content" | rtk-compressor

# Or in code
python3 -m rtk_compressor compress "raw output"
```

## Compression Results

| Command Type | Original tokens | Compressed | Savings |
|---|---|---|---|
| ls/tree | 2000 | 400 | 80% |
| cat/read | 40000 | 12000 | 70% |
| Test output | 25000 | 2500 | 90% |

## Install

```bash
pip install rtk-compressor
```
