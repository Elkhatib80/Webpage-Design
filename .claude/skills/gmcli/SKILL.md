---
name: gmcli
description: Gmail CLI for searching emails, reading threads, sending messages, managing drafts, and handling labels/attachments.
---

## Installation
```bash
npm install -g @mariozechner/gmcli
```

## Setup Requirements

### Google Cloud Console Configuration
1. Create or select a Google Cloud project
2. Enable the Gmail API
3. Configure the OAuth branding with an app name
4. Add test users (all Gmail addresses for use)
5. Create an OAuth desktop application client and download credentials

### Account Configuration
Check existing accounts via `gmcli accounts list`. If unconfigured, guide users through obtaining Google Cloud credentials, then run `gmcli accounts credentials ~/path/to/credentials.json` followed by `gmcli accounts add <email>`.

## Main Commands
- Search: `gmcli <email> search "<query>"`
- Read threads: `gmcli <email> thread <threadId>`
- Send messages: `gmcli <email> send --to <emails> --subject <s> --body <b>`
- Manage labels: `gmcli <email> labels list`
- View drafts: `gmcli <email> drafts list`

## Local Storage Locations
- `~/.gmcli/credentials.json` - OAuth credentials
- `~/.gmcli/accounts.json` - Account tokens
- `~/.gmcli/attachments/` - Downloaded attachments
