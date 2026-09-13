---
title: "dfa"
date: "2026-08-13"
slug: "dfa"
description: "A lightweight alternative to RAG: index files that point agents to the right docs."
---

## About

- Repo: [github.com/frycz/docs-for-ai](https://github.com/frycz/docs-for-ai)
- NPM: [npmjs.com/package/@frycz/dfa](https://www.npmjs.com/package/@frycz/dfa)

`dfa` is like RAG (Retrieval-Augmented Generation), but instead of embeddings stored in a vector database, it uses index files with hints about which documents contain what. An agent reads the index first and uses it to pick only the docs it actually needs, instead of loading everything.

## Why

Setting up RAG can be overkill in many cases. A few pages of docs don't need it. At the same time, loading all of them into the context every time you need an answer doesn't make much sense either.

`dfa` sits right in the middle. It helps manage context for mid-sized projects before you need a more advanced solution.
