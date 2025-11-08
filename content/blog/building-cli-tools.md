---
title: "Building Better CLI Tools"
date: "2024-02-20"
slug: "building-cli-tools"
---

Command-line interfaces are a powerful way to interact with software. They're fast, scriptable, and composable. Yet many CLI tools feel clunky or inconsistent. Here's what I've learned about building better ones.

## Follow Conventions

Users expect certain behaviors from CLI tools:

- **Exit codes**: 0 for success, non-zero for errors
- **Standard streams**: Output to stdout, errors to stderr
- **Flags**: Support both short (`-h`) and long (`--help`) forms
- **No output means success**: Don't be chatty unless something goes wrong

## Make It Pipeable

The best CLI tools work well with others. This means:

- Reading from stdin when no file is specified
- Writing to stdout by default
- One record per line when possible
- Supporting common formats (JSON, CSV, etc.)

## Provide Good Defaults

Most users will run your tool with minimal flags. Make the default behavior useful and safe:

- Non-destructive operations by default
- Sensible output format
- Clear, actionable error messages

## Example: A Simple Grep Wrapper

```bash
#!/usr/bin/env bash
# Search for pattern in files with sane defaults

set -euo pipefail

if [ $# -eq 0 ]; then
    echo "Usage: search <pattern> [path]" >&2
    exit 1
fi

pattern="$1"
path="${2:-.}"

grep -r --color=auto -n "$pattern" "$path"
```

Simple, composable, and predictable. That's the goal.
