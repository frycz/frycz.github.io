---
title: "A Software Engineer"
date: "2026-04-12"
slug: "a-software-engineer"
description: "What I learned from building two apps entirely with AI, and why I think job titles in our industry are about to blur."
---

During Christmas, some people spend time with their families; others play with AI, trying to find its limits. I belong to the second group.

---

## The Experiments

My goal was to take a pet project idea, implement it fully with AI, and figure out when the generated code becomes unusable. That means the point at which generating new features starts breaking existing ones, or AI has trouble finding a sane solution. The rule was simple: don't look at the code and don't give any architectural guidelines. The only point where I gave any directions was at the beginning of the projects, in the first prompts. I asked for specific technologies and drafted initial shapes of the architectures. The results surprised and scared me at the same time.

I started two projects, an Android fitness app and a web app for creating 2D animations. You can see them here:

- Simple Calories: [Google Play](https://play.google.com/store/apps/details?id=com.frycz.simplecalories)
- Skeleton Rig: [github.com/frycz/skeleton-rig](https://github.com/frycz/skeleton-rig)

After finishing them, I learned that AI models are now capable of analyzing existing code, understanding its structure and implementing a new feature in a clean way, without breaking the app or starting a refactor revolution.

I have solid expertise in building web apps, but I had never tried creating an Android one. Yet I was able to build and publish Simple Calories on Google Play. The cost of crossing the boundary collapsed. I didn't need prior experience to start. The problems that previously would have required at least some knowledge were solved quickly.

---

## Software Engineer

Here is my bold prediction - specializations in software development will fade and mix. I am not saying they will completely disappear; there will still be areas of expertise, but it won't be as finely sliced as it is now. There won't be separate titles like Android developer, DevOps, Backend developer. There will be a software engineer, a person who uses AI to understand a problem, generate a few solutions, pick a proper one and apply it.

Why do we have specializations in the first place? They are needed because learning an unfamiliar area like a new stack or technology can take weeks before one can make a reasonable contribution. AI has almost eliminated that. "Can I write this?" is not a problem anymore. The question becomes: "Can I tell whether this is right?" That is where the focus moves: to a higher level.

Ownership will become end-to-end: problem -> design -> build -> deploy -> monitor -> cost -> iterate. There will be no handoffs, no ping-pong discussions like "that's the platform team's ticket".

These are the skills that will matter: problem framing, system decomposition, reading code you did not write, knowing what "good" looks like across many domains and debugging in production. We won't need to remember Terraform's syntax; we will need to know what a bad deploy topology looks like. Teams will become smaller. A whole category of coordination overhead will disappear.

---

## How to Adapt

Interesting times are coming, I must say, and here is what I think needs to be done. Let's stop optimizing our careers around a stack. We should optimize for what transfers - fundamentals, systems thinking, the ability to evaluate output. "5 years of React" will eventually be worth much less. AI needs to be used to help us build intuition, gain expertise and understand a problem. Let's not blindly ask for a solution that just works. It will bite us later.

I am looking forward to seeing how much of what I wrote will become true. Let's see in a year.
