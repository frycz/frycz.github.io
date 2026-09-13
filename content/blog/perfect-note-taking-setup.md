---
title: "I Finally Found the Perfect Note-Taking Setup"
date: "2025-12-04"
slug: "perfect-note-taking-setup"
description: "After years of jumping between note-taking apps, I ended up with markdown files, nvim and git — and nothing has come close since."
---

It was a long journey. I tested many apps and systems for creating and organising notes: plain Notepad `txt` files, then `doc(x)`, then hosted tools like Evernote, Google Keep, OneNote and GitBook, then back to text files again (edited with Sublime this time), and finally I gave Notion a try.

---

## I Found It

Nothing stuck for long — I constantly felt there was something missing, or something too much, too complex or too restrictive. The most annoying thing I believe was the lack of full control over my notes. They sat somewhere in the cloud, accessed via a dedicated app only, hard to migrate.

Eventually, I gave up on dedicated systems and went completely pure — `md` files edited in `nvim`, and versioned with `git`. A notebook is initialised simply by creating a git repo in a directory. Notes are stored in files, organised in subdirectories. All managed purely from the command line.

This solution turned out to be the best so far, leaving all other tools way behind. A simple, flexible setup where I have all the power.

---

## The Command Line Renaissance

Terminals and command-line text editors started being broadly replaced by IDEs between the 1980s and the 2000s. Why? Because graphical user interfaces were more convenient. It was faster to click through menus and buttons for a few minutes than to spend half an hour figuring out a set of commands or configuring a CLI text editor.

Fast forward to 2022: ChatGPT gives us commands in seconds. Two years later, Claude Code configures our text editors and sets up environments directly via the command line.

It is late 2025 and I think the direction is clear. What can be done on the command line will be done on the command line. There is nothing preventing us from asking Claude to generate a few bash commands or scripts that we will save and later use as many times as we need.

---

## Agents Like It

AI agents understand text and the command line has become their interface. Why bother using GUI apps then? I store prompts, notes and guides for the AI tools in a place they can read — `md` files. As the notes grow, I organise them into directories and tree structures.

A few commands like `ls`, `tree`, `ripgrep` and `fd` are enough to manage notes on a daily basis. For editing I use `nvim` that I configured earlier. I am still testing the new approach but it looks very promising so far. The most important thing is that it fits nicely into my [Triangle of Success](/blog/triangle-of-success) strategy :)
