# Publishing changes

How a change gets from this working copy onto https://frycz.github.io without breaking it.

For everything else — project layout, writing posts, styling, synced articles — see [DOCS.md](DOCS.md).

## How publishing actually works

Pushing to `master` is the deploy.

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) runs on every push to `master`, does `npm ci`, then `npm run build`, then pushes `public/` to the `gh-pages` branch.

GitHub Pages serves the `gh-pages` branch.

There is also `npm run deploy`, which builds locally and pushes straight to `gh-pages`.
Avoid it.
It publishes whatever is in your `node_modules` instead of what the lockfile says, which is exactly the failure described below.

## The one rule

Never edit anything inside `node_modules`.

The build CI runs is not the build you run.
CI installs from `package-lock.json` and nothing else.
Your `node_modules` is whatever has accumulated there, and anything you copied in by hand is invisible to CI.

This has already broken production once.
`md-reader`'s new `dist/` was copied into `node_modules/md-reader` by hand while `package-lock.json` still pinned an older commit.
Locally everything passed.
CI installed the pinned commit, the deployed site called a function that did not exist in it, and every article page threw `toc.count is not a function` and failed to hydrate.

If you need a change in `md-reader`, publish it in `md-reader` and bump the pin here.
There is no shortcut.

## Publishing a change to this site only

If `md-reader` is untouched, these are the steps.

1. Make the change.

2. Run the unit tests.

```bash
npm test
```

3. Run the end-to-end tests.
They do their own production build and serve it, so this is the honest check.

```bash
npm run test:e2e
```

4. Look at it.

```bash
npm run build && npm run serve
```

Open http://localhost:9000, open an article, and check the browser console is clean.
A console error here is a console error on the live site.

5. Push to `master` and let the workflow deploy.

6. Watch the run finish, then load the live page and check its console.

## Publishing a change that touches md-reader

`md-reader` is consumed straight from GitHub, so its `dist/` has to be committed and pushed there before this repository can see it.

1. In the `md-reader` repository: make the change, run `npm run build`, commit the source and the built `dist/`, and push.

Nothing below works until that push has landed.
A commit that only exists on your machine cannot be installed by CI.

2. In this repository: move the pin to the new commit.

```bash
npm install github:frycz/md-reader
```

This rewrites the `md-reader` entry in `package-lock.json` to the current head of `md-reader`'s default branch.
Confirm the commit hash in that entry actually changed.

3. Reinstall from the lockfile, so `node_modules` is exactly what CI will get.

```bash
npm ci
```

This is the step that matters.
It throws away `node_modules` and rebuilds it from `package-lock.json`, which erases any hand-copied files and puts you on the same code as CI.

4. Rebuild from a clean cache, because Gatsby will otherwise reuse the old dependency.

```bash
npm run clean
```

5. Now run the normal checks: steps 2 through 6 of the previous section.

6. Commit `package-lock.json` along with the change.
A pin bump that is not committed does not reach CI.

## Two things that will fool you after a dependency change

A stale `public/`.
`npm ci` changes `node_modules`, and nothing else.
It does not touch `public/`, so the last build is still sitting there, built against the old dependency.
Open it and you will see the bug you just fixed and conclude the fix failed.
Run `npm run clean` before you believe anything.

A stale `gatsby serve`.
If a server from an earlier session is still on port 9000, it is serving that stale `public/`.
Worse, `playwright.config.js` sets `reuseExistingServer`, so `npm run test:e2e` will attach to it instead of building, and report a green run against the old code.
Check and kill it first.

```bash
lsof -ti :9000 | xargs kill
```

## Before any push, ask

Did I change anything under `node_modules`?
If yes, stop and do it properly.

Does `package-lock.json` need to move?
It does if `md-reader` changed, and it is the single easiest thing to forget.

Have I run `npm ci` since the last time I touched dependencies?
If not, the local build proves nothing about the deployed one.

Have I run `npm run clean` and rebuilt since that `npm ci`?
If not, I am looking at the old build.

Is the browser console clean on a real article page in `npm run serve`?

## When a deploy goes wrong

Check the Actions run first.
A red build never reached `gh-pages`, so the live site is still the previous deploy.

A green build with a broken live site is almost always a dependency mismatch.
Check the pin against `md-reader` before doing anything cleverer.

```bash
git ls-remote https://github.com/frycz/md-reader main
grep -n 'md-reader.git#' package-lock.json
```

If those two commit hashes differ, the pin is behind and that is your bug.

If you want to confirm it in the deployed code, know where to look.
`md-reader` is bundled into the `commons-*.js` chunk, not into the `component---*.js` chunk for the page.
The page's own chunk holds only the call site, so its content and its filename do not change when a dependency does.
`commons-*.js` is not referenced from the page HTML either, because the webpack runtime loads it from a chunk map.
The practical way to find it is the browser: open a live article, DevTools, Network, filter by JS, and search inside `commons-*.js` for the symbol the error names.

The same holds locally. After a build, grep the whole directory rather than one chunk.

```bash
grep -l 'the-symbol' public/*.js
```

React hydration errors (`#418`, `#423`, `#425`) on a page are usually a symptom, not the cause.
An exception thrown inside a component effect makes React abandon hydration and report these.
Find the real exception in the console first and fix that.

`ERR_BLOCKED_BY_CLIENT` on `cdn.counter.dev` is an ad blocker, not a bug.
