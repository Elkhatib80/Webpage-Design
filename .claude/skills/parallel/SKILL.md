---
name: parallel
version: "1.1.0"
description: High-accuracy web search and research via Parallel.ai API. Optimized for AI agents with rich excerpts and citations. Supports agentic mode for token-efficient multi-step reasoning.
author: mvanhorn
license: MIT
triggers:
  - parallel
  - deep search
  - research
metadata:
  openclaw:
    emoji: "🔬"
    requires:
      env:
        - PARALLEL_API_KEY
    tags:
      - search
      - research
      - web
      - citations
---

# Parallel.ai

High-accuracy web search API built for AI agents.

## Setup

```bash
pip install parallel-web
export PARALLEL_API_KEY="your-key-here"
```

```python
from parallel import Parallel
client = Parallel(api_key="YOUR_KEY")
response = client.beta.search(
    mode="one-shot",  # or "fast" or "agentic"
    max_results=10,
    objective="your query"
)
```

## Modes

| Mode | Use Case | Tradeoff |
|------|----------|----------|
| `one-shot` | Default, balanced accuracy | Best for most queries |
| `fast` | Quick lookups, cost-sensitive | Lower latency/cost |
| `agentic` | Complex multi-hop research | Higher accuracy, more expensive |

## When to Use

- Deep research requiring cross-referenced facts
- Company/person research with citations
- Fact-checking with evidence-based outputs
- Complex queries that need multi-hop reasoning

## API Reference

- Docs: https://docs.parallel.ai
- Platform: https://platform.parallel.ai
