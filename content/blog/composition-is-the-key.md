---
title: "Composition Is the Key"
date: "2019-02-21"
slug: "composition-is-the-key"
---

I keep an "idea box" where I put thoughts that come to my mind when I am bored enough. Recently, I wanted to add one more, but before I did so, I had started reading existing entries. To my surprise, the thought I wanted to write down was already there... twice.

The idea was: "Composition is the key".

The more I think about composition, the more I notice it, almost everywhere now. Here are some brief examples of what I mean.

### Music

Songs are composed of elements like bassline, hi-hats, melody, etc. Modifying some of these can result in a completely different song - no need to create a new one from scratch.

### Storytelling

Stories are composed of characters and environments. Storylines emerge when the characters interact with each other in given environments. Replacing or modifying a character can move a story in a new direction.

### Electronics (both digital and analog)

This is my favorite example. There are electronic components with well-defined interfaces and communication standards. Thanks to that, we can create complex devices - a single person can build a PC with abstractions that were carefully designed, manufactured and tested before. Modifications and extensions of an existing PC are easy because of its modularity.

### Chemistry and Biology

Our world is composed of basic building blocks that interact with each other. Starting from the Standard Model (still a theory though), we go through atoms and fundamental forces to more and more complex organisms - including us, humans. Yes - modifications and extensions of our bodies are possible to some extent.

---

## Composition in Software

Software is no different. It is perhaps less tangible than PC hardware but all in all, making software composable gives the benefits listed in the examples above:
- different parts can be developed and tested independently,
- components can be replaced or reused,
- composition allows for creating complex systems with easy-to-understand abstractions.

I am not saying anything new here. "Favor composition over inheritance" is a fundamental principle in object-oriented programming and a "component" or a "composite" is an actual design pattern described in the "Design Patterns: Elements of Reusable Object-Oriented Software" book.

All other design patterns described in the book exist to make software building blocks actually composable. What's interesting is that inspiration for these patterns came from the physical world, where composition already works.

Examples are: adapter, facade, mediator, observer/pub-sub, chain of responsibility, decorator, factory, builder, etc.

---

## Finally I Got It

It just took me some time to understand that composition is not a software-specific thing. It is how our world is built.

Seeing everything as composable structures helps me understand complex problems and makes decision-making easier. When I look at a problem, I ask myself:
- Can this piece of code be easily replaced with other modules without breaking the app?
- Can it be reused in other apps?
- Is it easy to understand by other devs?
- Will it work nicely with the code added in the future?

Getting answers to these questions becomes clear if I look at composition as the ultimate goal. I know that selling a vibecoded SaaS and becoming a billionaire is the actual goal, but you get the idea.