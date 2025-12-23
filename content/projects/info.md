---
title: "info"
date: "2025-12-23"
slug: "info"
description: "Ask questions in natural language and get concise, formatted responses directly in your terminal."
---

Repo: [github.com/frycz/info](https://github.com/frycz/info)

NPM: [npmjs.com/package/@frycz/info](https://www.npmjs.com/package/@frycz/info)

Ask questions in natural language and get concise, formatted responses directly in your terminal.

```
info capital of australia
# canberra

info mass of the sun in kg
# 1.989e30

info how to init python venv
# python -m venv venv
```

I like working with the terminal but I am bad at memorizing commands - I forget the ones that I don't use often. My previous techniques to improve the workflow were:

- reading command help,
- maintaining a list of useful snippets,
- asking AI to generate them on demand.

It all worked fine, but I noticed that I preferred to use the syntax that I already know, even though I knew there was a better way to do it. Why would I try to compose `git log --oneline --graph --decorate` if `git log` just works? Reading manuals was taking time, my commands cheat sheet needed constant updates, and AI was generating answers that were way too verbose.

One day, I wrote a very detailed prompt so that an LLM outputs the essence, the raw answer to my question. I liked the result so I kept refining it. Eventually, I created a bash script and added a CLI alias to speed up my lookups. The result was very satisfying - I could type `iinfo how to check what is on 9000 port` into the terminal to get the `lsof -i :9000` answer. No unnecessary comments, no formatting. The output is ready to be copied and executed.

I wrapped the script into a standalone CLI tool and published it on the NPM registry. Enjoy!