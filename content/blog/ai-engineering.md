---
title: "AI Engineering"
date: "2026-05-02"
slug: "ai-engineering"
description: "Software engineering is being automated from one side and reinvented from the other. I am moving toward the side that is growing."
---

The assignments that took two months to implement three years ago are now generated in a day. If you are a software engineer and you are wondering what you will be doing in a year, then you are not alone. I am wondering that too. I also bet that every other developer is trying to figure that out as well.

Good news: I see an area where the opposite is happening. What used to be a small update three years ago now starts to look like a full-time job. Yes, you guessed it, it's the AI landscape itself, and the occupation has a name already — AI engineering :)

---

## Sad Reality

Some subdisciplines of software engineering are getting less and less cool because they are getting automated. Single-file scripts, no-server mobile apps, simple games and more don't require big teams and weeks to be built. In most cases they need to be decently specified in plain English. If an app is common enough, a coding agent will come up with sane defaults.

Investors' money isn't going to finance these apps anymore. They are taken for granted. Exploring what AI models can do is where investors are looking now. Billions of dollars are flowing into turning LLMs and other models into actual products.

We started from building thin wrappers around ChatGPT, then we went through prompt engineering, context engineering, and now we are at the point where we need to adapt these solutions to enterprise-grade systems. As we've seen many times, this is not an easy job. The more complex a product becomes, the more limitations and edge cases are discovered. All these come from the nature of AI models — they are non-deterministic.

---

## New Problems Need Solutions

That brings new classes of issues to the table that don't exist in classic software development. At scale, dealing with them looks like a full-time job for a dedicated specialist.

First of all, the correctness of an app can't be measured by comparing the input with the output. Classic tests break here. We need evals with graded rubrics, run over samples, judged statistically. A suite at 96% is a pass, not a broken build — and it's a human's role to decide what number is acceptable before the app is shipped.

Bug reproduction becomes tricky. Literally the same system run in the exact same environment can give different results. Noticing a bug in the first place isn't obvious either. Bugs aren't thrown, they are hidden in a confident but wrong answer.

Another thing is the context. There are models with 1 million token windows, but if a system handles thousands of requests daily then the cost of tokens can exceed the cost of a team doing the same job manually. Does that mean that it is actually better to hire humans? Absolutely not, no one is hiring humans anymore. This is so 2022. Now we have RAG, Retrieval-Augmented Generation, yet another pipeline in a company's infrastructure that needs to be maintained. RAG prepares the right amount of context that is needed for an AI model to give a correct answer without occupying the entire context window for every request.

---

## I Am Shifting

There are plenty of other issues that arise around AI systems, I won't be listing all of them here. Maybe I will write more in next articles, but you see where this is all heading.

I see it this way: AI engineering will become part of software engineering, just like e.g. cloud engineering, DevOps or security. Some specializations will merge or at least will get closer. Frontend, backend and mobile specialists will be able to operate on multiple areas.

I am shifting towards AI engineering. I will give myself a year. After that time I will come back to the article to see how much of it turned out to be true.
