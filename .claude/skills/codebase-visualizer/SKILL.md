---
name: codebase-visualizer
description: Generate an interactive collapsible tree visualization of your codebase. Use when exploring a new repo, understanding project structure, or identifying large files.
allowed-tools: Bash(python *)
---

# Codebase Visualizer

Generate an interactive collapsible tree visualization of your codebase.

## Usage

Run from your project's root directory:

```bash
python ~/.claude/skills/codebase-visualizer/scripts/visualize.py .
```

This generates `codebase-map.html` in the current directory and automatically opens it in your default browser.

## Visualization Features

The interactive HTML tree view displays:

- **Collapsible directories**: Click folders to expand/collapse
- **File sizes**: Displayed next to each file
- **Colors**: Different colors for different file types
- **Directory totals**: Shows aggregate size of each folder
