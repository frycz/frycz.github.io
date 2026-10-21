---
title: "The Unified Theory of Constraints"
date: "2026-09-19"
slug: "unified-theory-of-constraints"
description: "Every trick that makes AI agents work better is the same move: narrowing the space until the good answer is the likely one."
---

Whenever an AI agent gives me satisfying results, I look back at the context I provided. It's never that the instructions were precise enough; rather, it feels like I defined good limits and still left space for the model to be "creative".

I'd been thinking of my prompts as requests, same as I would ask someone for a favor. But the requests that worked best weren't single direct orders but rather a set of rules: use these three tools, follow this style, don't touch that folder, stop when this test passes. Each rule removed a set of possible outcomes, and the result got better every time I specified more limits.

Then it reminded me of something much older than AI.

## The painter picks the paint first

Look at how people make things. A painter doesn't start with every color that exists. They squeeze out five or six onto a palette, and that small set is a big part of why the painting looks like theirs. A musician picks a handful of sounds for an album and sticks to them for a year. A sculptor chooses marble or wood, a chisel or a rasp, and those choices decide half the shape before the first cut.

None of these people feel trapped by their choices. The choices are where the style comes from. An artist with infinite options and no limits usually produces nothing, or produces mud.

Working with an AI model feels like that. The painter starts with an empty canvas and adds. With a model, you start with a canvas that already holds every possible picture at once, and your job is to take things away until only the one you want is left. That's much closer to sculpting than painting. You're cutting away stone.

## From instructing to designing space

For most of computing history, we told machines exactly what to do, step by step: load this, compare that, add these two numbers, you get the idea. The computer did nothing we didn't spell out (in a general sense).

Agents don't work this way, and trying to make them do so is exhausting. We can't list every step for "build me a small web app for tracking my eating habits." There are thousands of steps and we don't know most of them in advance. That's the whole reason we asked the agent to do it for us :)

What you can do is shape the room the agent works in. Asking for React and Tailwind closes Vue, Angular and hand-written CSS off without mentioning them. Tell it the API should be stateless and follow REST, and you've ruled out a huge number of designs it might have wandered into. This way we tell the agent where to go, not how.

I find this mental model comfortable to work with. I stop trying to predict every move and start asking a different question: what does the space look like where only good answers fit?

## Managing the probability space

A language model works on likelihoods. Ask it something vague and it gives the most average answer it can find, because the average is the safest bet when it knows nothing about what you want to create. That's why "write a blog post about productivity" gets you the same post everyone has already read.

Every detail you add shifts those odds. When you name your audience, the average moves. Handing it an example of your writing moves it again. Say which words you hate and a whole family of bland answers drops out. I picture it as a cloud of possible outputs that gets smaller and denser with each thing I add, until most of what's left is close to what I had in my head.

So the rule I keep coming back to is simple. The more specific the limits, the more likely the result is the one you wanted. A one-line prompt is a lottery ticket, but a prompt plus a tool list plus a style guide plus a clear finish line is closer to a recipe.

This also explains something that used to irritate me. When an agent produced something weird, like an answer that was too long or requirements that were too complex, I'd blame the model. Now my first question is what I left open. Usually there's a door I forgot to close, and the agent walked through it.

## The unified theory of constraints

By constraint, I don't mean a rule like "maximum 50 characters." I mean it much more loosely. Anything that pushes the agent down one path and away from the others counts.

The prompt itself is a constraint. A list of tools for a web app is a constraint. A page of architecture guidelines for an API server is... yes, a constraint. Acceptance criteria are a constraint too. Even the example files you drop into the conversation count, because the agent will lean toward whatever patterns it sees in them.

Once I saw it this way, all the separate tricks people share online started to look like one idea. "Give the model a role", "Show it examples", "Write a style guide", "Use a system prompt", "Give the agent only the tools it needs". These sound like five different techniques. To me they're the same move made five ways: narrowing the space until the good answer is the likely one.

They also stack. When I build an API server with an agent, I end up with something like this:

```
┌──────────────────────────────────────────────────────────────┐
│  GOAL          these endpoints exist, these tests pass       │
├──────────────────────────────────────────────────────────────┤
│  ARCHITECTURE  domain-driven design, strict types,           │
│                no clever tricks                              │
├──────────────────────────────────────────────────────────────┤
│  TOOLS         Node, Express, PostgreSQL                     │
├──────────────────────────────────────────────────────────────┤
│  PROMPT        build a small production API for this         │
│                purpose                                       │
└──────────────────────────────────────────────────────────────┘
```

The nice thing is that each layer can change without touching the others. If I swap Node and PostgreSQL for Python and MongoDB, the prompt, the philosophy and the goal stay exactly as they were. The agent adjusts because I moved one wall of the room, and the rest of the room is still there.

## Managing constraints

This is where the idea gets practical, and where I think most of us are wasting effort right now.

If constraints are what make the results good, then they're worth more than the results. A good set of API guidelines works for the next ten projects. A style guide I spent an evening on improves every piece of writing after it. Yet most of this work lives in a chat window and disappears when we close the tab. Next week we type a weaker version from memory.

Constraints should be treated like any other thing we build carefully. You write one down. You try it on real tasks and watch where the agent ignores it or misreads it. You fix the wording. You keep it somewhere you can find it, and you share it with people who do similar work. Someone else takes your guidelines, changes two lines for their team, and passes that version on.

Software engineers already do this with code: nobody writes their own date library; they pull in one that thousands of people have tested. I'd like the same for the things that shape agents. Picture starting a project by picking a tested set of architecture guidelines, a writing voice you trust, and a short tool list, instead of starting from a blank prompt box and hoping.

## The human part

This changes how I see my own role. I write less of the actual code or text than I used to. What I do more is decide what good looks like, and then describe the space where good is the only thing that fits.

That's still craft. It's the same craft the painter uses when choosing six colors out of hundreds, and it still comes from taste, experience and knowing what you want. The agent has every option in the world. Our job is to give it the right few.
