# Falco Rules for VS Code

A simple extension that assists in wrtting, editing and testing [Falco rule files](https://falco.org/docs/rules/).

Take a look at the [Changelog](CHANGELOG.md) to learn about new features.

## Features

### IntelliSense
Autocompletion for the following top-level code snippets:
- **rule** Creates the scaffold for a new rule.
- **list** Creates the scaffold for a new list.
- **macro** Creates the scaffold for a new macro.

Autocompletion for the most usual access to events:
- **jevt** Generic ways to access _json_ events.
- **ka** Access _K8s Audit Log_ events.

Syntax highlighting

Priority levels coloring

### File tidying up
Appends _new line character_ if the rule file doesn't end with one (this is work in progress).

### Rule validation
This is work in progress.

### File icon
Helps identifying rule files.

## Requirements
None.
