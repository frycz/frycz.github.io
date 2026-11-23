# Plan before implementing

Any change must be planned before implementation. Present the plan to the human and wait for their approval before changing any code.

# No hacks against md-reader

`md-reader` (github:frycz/md-reader) is a dependency of this project. If a change would require hacking around md-reader (patching it, overriding its internals, monkey-patching its output, fighting its CSS or DOM, and so on), do not implement the hack. Stop and work with the human to figure out a new approach instead.
