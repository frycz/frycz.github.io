---
description: Sync an article from its source repository into content/blog and check it reads as a published post
allowed-tools: Bash(npm run sync:articles*), Bash(git status*), Bash(git diff*), Bash(npm run build*), Read, Grep, Edit
---

Publish, or re-publish, an article whose source lives in another repository.

The manifest of such articles is in `scripts/sync-articles.js`. `$ARGUMENTS` names one of them by
slug; with no argument, work on all of them.

1. Run `npm run sync:articles` and report what it wrote.

2. Show what actually changed in the post: `git diff --stat content/blog` and, unless the diff is
   huge, `git diff content/blog`. For a new file, say so instead.

3. Read the changed parts of the generated file and look for what reads as published prose and
   what does not. The source is written for its own repository, so watch for:
   - references to documents that exist only in the source repository, such as "developed in
     separate documents" or a link to a sibling `.md` file, which a reader here cannot follow;
   - notes to self, TODOs, placeholder text;
   - a first paragraph that assumes the reader arrived from the repository rather than the blog.

   Report these rather than fixing them: the fix belongs in the source, not in the copy, which the
   next sync would overwrite. Offer to make the edits in the source file.

4. Check the manifest entry still fits: the `description` is what the RSS feed carries, and the
   `date` is the publication date, which should not move when the source changes.

5. If diagrams changed, the source repository has `scripts/shots.js` for checking that mermaid
   renders; mention it rather than running it.

Never commit. Report the state and stop.
