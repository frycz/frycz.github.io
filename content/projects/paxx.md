---
title: "paxx"
date: "2026-09-05"
slug: "paxx"
description: "Scaffold a production-ready FastAPI project you fully own."
---

## About

Repo: [github.com/frycz/paxx](https://github.com/frycz/paxx)

PyPI: [pypi.org/project/paxx/](https://pypi.org/project/paxx/)

Docs: [frycz.github.io/paxx/](https://frycz.github.io/paxx/)

`paxx` generates a production-ready API application using FastAPI, SQLAlchemy async, Pydantic v2, and Alembic. No wrapper abstractions — just clean, readable code you own and can modify freely.

## Philosophy

`paxx` is a scaffolding tool, not a framework:

- No magic — Generated code uses FastAPI, SQLAlchemy, and Pydantic directly
- No lock-in — After bootstrapping, your project has zero dependency on paxx
- Domain-driven — Features organized by business capability, not technical layer
- Production-ready — Includes Docker, migrations, logging, and deployment configs
- Your code, your rules — The generated structure is a starting point, not a constraint

## The Why

Generating short snippets of code is fast and feels nice. If I want a function that multiplies two matrices I can generate it every time I need it and I will get almost identical results. Things get more complicated when I scaffold a new application. There are plenty of small decisions to make — which API framework, which ORM, how to configure Docker, which database, how to deploy, how to structure the project — and remembering all of that a week later doesn't make sense. AI can absolutely generate that, but prompting everything is counterproductive.

This is how the idea for `paxx` was born. I was tired of prompting the same thing for the third time and recalling decisions I made a week ago. I wanted a tool that would help me prepare the groundwork so I can focus on the app itself. The requirements were simple — the tool must not be yet another framework that introduces new abstractions over what exists. It had to nicely integrate proven tools, libraries, architectures, and best practices. All the components should be loosely coupled and easy to replace. The generated project had to be modular — essential elements at the start, the rest only when needed.

`paxx` has a set of commands that initialize a project and later help to manage and extend it. The best thing is that once a project is generated, it has no dependency on `paxx`. It is a fully independent template without any additional tools or abstractions. `paxx` helps only when I want it to — create or apply a migration, add a new feature, or deploy the generated app.
