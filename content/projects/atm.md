---
title: "atm"
date: "2025-12-20"
slug: "atm"
description: "Set up private GitHub repos and push commits quickly."
---

## About

Repo: [github.com/frycz/atm](https://github.com/frycz/atm)

NPM: [npmjs.com/package/@frycz/atm](https://www.npmjs.com/package/@frycz/atm)

In the era of AI tools, drafting new ideas is easier than ever. `atm` helps you set up private GitHub repos for your ideas and save iterations quickly.

With a single `atm init` command, the tool prepares a private repository. Develop your project by adding changes and quickly pushing them with `atm s`. That's it.

No need to visit github.com to create a private repo and set it up locally. No need for "add" -> "commit" -> "push" repetitive flow.

## The Why

I like storing my side projects, even tiny ones, in private git repos. It provides a nice separation and makes the ideas accessible from anywhere.

I wasn't always doing that though. I used to keep code in git repos locally on disks or even without any version control for single-file ideas. Time passed. Moving repos from one disk to another got tedious and single-file ideas became complex codebases. Then, I promised to myself that everything I create would go to GitHub.

With all the AI models and tools around, I started creating more repos than usual. Going to GitHub to add yet another one started feeling repetitive, so I created a short script that used `gc` to setup a repo for me. Later, I added an alias to my terminal to quickly stage all local changes, commit them and push to GitHub.

I have been using these two tools for a few months and I really like them. Following my new year resolution for 2025 to publish more stuff that I create, I decided to combine these two commands into a one and publish it.

Feel free to try it and give some feedback. Enjoy!
