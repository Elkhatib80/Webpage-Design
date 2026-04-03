---
name: gdcli
description: Google Drive CLI for listing, searching, uploading, downloading, and sharing files and folders.
---

## Installation
```bash
npm install -g @mariozechner/gdcli
```

## Setup Requirements
The tool requires Google Cloud Console configuration including creating a project, enabling the Drive API, setting OAuth branding, adding test users, and creating OAuth desktop app credentials.

## Configuration
Check existing accounts with `gdcli accounts list` and add new ones through either automated or manual OAuth flows using `gdcli accounts credentials` and `gdcli accounts add` commands.

## Core Commands
- List operations: `ls [folderId]` and `ls --query "<query>"`
- Search: `search "<text>"` for content, queries for metadata
- File operations: `download`, `upload`, `mkdir`, `share`

## Search Distinction
`search` targets file contents while `ls --query` filters by metadata properties like filename, type, and date.

## Query Syntax
Supports operators (`=`, `!=`, `contains`, `<`, `>`, `<=`, `>=`) for filtering by name, MIME type, dates, ownership, and sharing status, with ability to combine conditions using `and`/`or` logic.

## Data Storage
Configuration and account tokens store in `~/.gdcli/` directory with downloads defaulting to `~/.gdcli/downloads/`
