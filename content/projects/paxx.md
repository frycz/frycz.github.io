---
title: "paxx"
date: "2026-09-05"
slug: "paxx"
description: ""
---

## About

Repo: [https://github.com/frycz/paxx](https://github.com/frycz/paxx)

PyPi: [https://pypi.org/project/paxx/](https://pypi.org/project/paxx/)

Docs: [https://frycz.github.io/paxx/](https://frycz.github.io/paxx/)

`paxx` generates production-ready server API application using FastAPI, SQLAlchemy async, Pydantic v2, and Alembic. No wrapper abstractions—just clean, readable code you own and can modify freely.

## Philosophy

`paxx` is a scaffolding tool, not a framework:

- No magic — Generated code uses FastAPI, SQLAlchemy, and Pydantic directly
- No lock-in — After bootstrapping, your project has zero dependency on paxx
- Domain-driven — Features organized by business capability, not technical layer
- Production-ready — Includes Docker, migrations, logging, and deployment configs
- Your code, your rules — The generated structure is a starting point, not a constraint

## The Why

Generating short snippets of code is fast and feels nice. If I want a function that multiplies two matrices I can generate it every time I need it and I will get almost identical results. Things get more complicated when I scaffold a new application. There is plenty of small decisions to be made and remembering all of that doesn't make sense - which API framework to use, which ORM, how to configure Docker, which database to use, how to deploy the app, how to structure the project. AI can absolutely generate that, but prompting everything is counter-productive. 

This is how an idea to `paxx` was born. I was tired of prompting the same thing for the third time and recalling decisions I made a week ago. I wanted a tool that will help me preparing the ground work so I can focus on an app itself. The requirements were simple - the tool must not be yet another framework that introduces new abstractions over what exists. It had to nicely integrate proven tools, libraries, architectures and best practices. All the components should have been loosely coupled and easy to replace. The generated project had to be modular - essential elements added at the beginning, the rest is added when needed. 

`paxx` has a set of commands that initialize a project and later help to manage and extend it. The best thing is that once a project is generated, it has no dependency on `paxx`. It is fully independent template without any additional tools and abstraction. `paxx` can only help when I want it to - create or apply migration, add a new feature or deploy the generated app.
