---
name: using-tmux-for-interactive-commands
description: Controls interactive CLI tools (vim, git rebase -i, REPLs) through tmux detached sessions and send-keys. Use when running tools requiring terminal interaction, programmatic editor control, or orchestrating Claude Code sessions. Triggers include "interactive command", "vim", "REPL", "tmux", or "git rebase -i".
---

# Using tmux for Interactive Commands

## Quick Reference

| Task | Command |
|------|---------|
| Start session | `tmux new-session -d -s <name> <command>` |
| Send input | `tmux send-keys -t <name> 'text' Enter` |
| Capture output | `tmux capture-pane -t <name> -p` |
| Stop session | `tmux kill-session -t <name>` |
| List sessions | `tmux list-sessions` |

### Core Pattern
```bash
tmux new-session -d -s edit vim file.txt  # Start detached
sleep 0.3                                   # Wait for init
tmux send-keys -t edit 'i' 'Hello' Escape ':wq' Enter
tmux kill-session -t edit
```

### When to Use

| Use tmux | Don't use |
|----------|-----------|
| vim, nano, editors | Simple non-interactive commands |
| Python/Node REPLs | Commands that accept stdin redirection |
| git rebase -i, git add -p | One-shot commands |
| Full-screen apps (htop) | |

## Special Keys

| Key | tmux name |
|-----|-----------|
| Return | `Enter` |
| ESC | `Escape` |
| Ctrl+C | `C-c` |
| Arrows | `Up`, `Down`, `Left`, `Right` |
| Space | `Space` |

## Common Patterns

### Python REPL
```bash
tmux new-session -d -s py python3 -i
tmux send-keys -t py 'import math' Enter
tmux send-keys -t py 'print(math.pi)' Enter
tmux capture-pane -t py -p
tmux kill-session -t py
```

### Vim Editing
```bash
tmux new-session -d -s vim vim /tmp/file.txt
sleep 0.3
tmux send-keys -t vim 'i' 'New content' Escape ':wq' Enter
```

### Interactive Git Rebase
```bash
tmux new-session -d -s rebase -c /repo git rebase -i HEAD~3
sleep 0.5
tmux capture-pane -t rebase -p
tmux send-keys -t rebase 'Down' 'Home' 'squash' Escape ':wq' Enter
```

## Common Mistakes

- **Not waiting after start**: Add `sleep 0.3` after session creation
- **Forgetting Enter**: Always explicitly send `Enter`
- **Not escaping special characters**: Use single quotes: `tmux send-keys -t s 'echo "hello"' Enter`

## Claude Code Orchestration

```bash
tmux new-session -d -s claude -c /project/path claude
sleep 2
tmux send-keys -t claude "Fix all TypeScript errors" Enter
sleep 30
tmux capture-pane -t claude -p
tmux send-keys -t claude '/exit' Enter
```
