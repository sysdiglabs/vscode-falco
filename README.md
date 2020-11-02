# Falco Rules for VS Code

A simple extension that assists in wrtting, editing and testing [Falco rule files](https://falco.org/docs/rules/).

Take a look at the [Changelog](CHANGELOG.md) to learn about new features.

## Features

### IntelliSense
Autocompletion and tooltips for the following top-level code snippets:
- **rule** Creates the scaffold for a new rule:

    ~~~
    # OPTIONAL RULE COMMENTS
    - rule: Rule Name with Capital Initial Letters
      desc: Rule description (begins with 'Detect' and ends with full stop).
      enabled: true
      append: false
      condition:
        Condition(s)
      output:
        Output message
      priority: DEBUG
      tags: [inline comma separated tag list]
      source: syscall
    ~~~

- **list** Creates the scaffold for a new list:

    ~~~
    # OPTIONAL LIST COMMENTS
    - list: list_name
      append: false
      items: [inline comma separated list]
    ~~~

- **macro** Creates the scaffold for a new macro:

    ~~~
    # OPTIONAL MACRO COMMENTS
    - macro: macro_name
      append: false
      condition: macro condition
    ~~~

Autocompletion and tooltips for the most usual access to events:
- **jevt** Generic ways to access _json_ events: `jevt.time`, `jevt.rawtime`, `jevt.value`, `jevt.obj`.
- **ka** Access _K8s Audit Log_ events: `ka.auditid`, `ka.auth.decision`, `ka.auth.reason`, `ka.impuser.name`, `ka.req.binding.role`, `ka.req.binding.subjects`, `ka.req.binding.subject.has_name`, `ka.req.configmap.name`, `ka.req.configmap.obj`, `ka.req.container.host_network`, `ka.req.container.image`, `ka.req.container.image.repository`, `ka.req.container.privileged`, `ka.req.role.rules`, `ka.req.role.rules.apiGroups`, `ka.req.role.rules.nonResourceURLs`, `ka.req.role.rules.resources`, `ka.req.role.rules.verbs`, `ka.req.service.type`, `ka.req.service.ports`, `ka.req.volume.hostpath`, `ka.resp.name`, `ka.response.code`, `ka.response.reason`, `ka.stage`, `ka.target.name`, `ka.target.namespace`, `ka.target.resource`, `ka.target.subresource`, `ka.uri`, `ka.uri.param`, `ka.user.name`, `ka.user.groups`, `ka.verb`.

Syntax highlighting
- Highlights rule keywords: `rule`, `list`, `items`, `macro`, `condition`, `desc`, `output`, `priority`, `enabled`, `append`, `tags`, `warn_evttypes`, `skip-if-unknown-filter`, `source`.

Hover tooltips
- Shows tooltips when hovering over rule keywords: `rule`, `list`, `items`, `macro`, `condition`, `desc`, `output`, `priority`, `enabled`, `append`, `tags`, `warn_evttypes`, `skip-if-unknown-filter`, `source`.

Priority levels coloring
- Shows priority levels in different colors: `EMERGENCY`, `ALERT`, `CRITICAL`, `ERROR`, `WARNING`, `NOTICE`, `INFO`, `DEBUG`.

### Rule validation
`Validate Rule` command will launch a falco container to validate the rule file.

### File icon
Helps identifying rule files.

### File tidying up
Appends _new line character_ if the rule file doesn't end with one (this is work in progress).

## Requirements
Requires Docker to be installed.
