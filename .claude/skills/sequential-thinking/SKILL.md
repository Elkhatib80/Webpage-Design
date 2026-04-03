---
name: sequential-thinking
description: Structured problem-solving through iterative multi-step reasoning. Use when facing complex problems that require breaking down into sequential thought steps, dynamic scope adjustment, or exploring alternative reasoning paths.
---

# Sequential Thinking

Enables structured problem-solving through iterative reasoning for complex multi-stage analysis.

## When to Use

- Triggered by: "think through step by step", "break this down", "complex problem", "sequential reasoning"
- Multi-stage problems requiring iterative analysis
- When assumptions prove incorrect mid-way and need revision
- When multiple approaches seem viable and need exploring

## Core Capabilities

- Break complex problems into sequential thought steps
- Dynamically adjust scope as understanding evolves
- Reconsider and modify previous conclusions
- Explore alternative reasoning paths from any point

## Required Parameters

| Parameter | Type | Description |
|---|---|---|
| `thought` | string | Current reasoning step |
| `needsMoreThought` | boolean | Whether more reasoning is needed |
| `thoughtNumber` | number | Current step number |
| `totalThoughts` | number | Estimated total steps |

## Optional Parameters

| Parameter | Purpose |
|---|---|
| `isRevision` | Mark as revision of previous thinking |
| `revisesThought` | Which thought is being reconsidered |
| `branchFromThought` | Branch from specific thought number |
| `branchId` | Identify reasoning branches |

## Best Practices

1. Start with rough estimate for total steps — refine as you go
2. Use revision when assumptions prove incorrect
3. Branch when multiple approaches seem viable
4. Explicitly express uncertainty in thoughts
5. Don't force artificial closure — take as many steps as genuinely needed

## Example Flow

```
Thought 1: Understand the problem scope
Thought 2: Identify constraints and requirements
Thought 3: Consider approach A
Thought 4: [REVISION of 3] Approach A has flaw X, reconsider
Thought 5: Consider approach B
Thought 6: Evaluate tradeoffs
Thought 7: Final recommendation
```
