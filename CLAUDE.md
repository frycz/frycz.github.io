# Plan before implementing

Any change must be planned before implementation. Present the plan to the human and wait for their approval before changing any code.

# Publishing goes through README.md

[README.md](README.md) is the runbook for getting a change onto the live site. Follow it, and remind the human of the steps in it whenever a change is about to be pushed, deployed or published.

Never edit anything inside `node_modules`, and stop the human if they are about to. CI builds from `package-lock.json` alone, so a hand-edited `node_modules` makes the local build pass while the deployed site breaks. This has already shipped a broken production site once.

A change to `md-reader` is not finished when it works locally. It must be committed and pushed in the `md-reader` repository first, then pinned here with `npm install github:frycz/md-reader`, then installed with `npm ci` so the local tree matches what CI will get. The updated `package-lock.json` has to be committed with the change.

After any `npm ci`, run `npm run clean` and stop any `gatsby serve` still holding port 9000 before judging the result. `npm ci` does not touch `public/`, so the previous build survives it, and a leftover server keeps serving that build. Both will show the old behaviour and make a working fix look broken.

Before any push, check that the browser console is clean on a real article page under `npm run build && npm run serve`. The development server is not evidence: it does not use the same build, and the failures that reach production tend to show up only in the production one.

# No hacks against md-reader

`md-reader` (github:frycz/md-reader) is a dependency of this project. If a change would require hacking around md-reader (patching it, overriding its internals, monkey-patching its output, fighting its CSS or DOM, and so on), do not implement the hack. Stop and work with the human to figure out a new approach instead.
