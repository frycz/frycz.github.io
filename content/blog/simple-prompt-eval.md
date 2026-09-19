---
title: "If You Can't Score It, You Are Vibing"
date: "2026-09-19"
slug: "simple-prompt-eval"
description: "I finally ran a proper eval on a toy prompt. The score went up as expected — everything else I learned was a surprise."
---

A few months ago I wrote that [AI engineering](/blog/ai-engineering) means evals with graded rubrics, run over samples, judged statistically. Then I went back to my own prompts and kept doing what I always did: tweak a line, look at one output, decide it felt better, move on.

That is not engineering. That is [vibe-coding](/blog/vibe-conding-is-awesome) with extra steps, and I like vibe-coding, but I should at least know when I am doing it.

So I ran a real evaluation on a deliberately small problem, wrote down everything, and published it. It cost seven cents.

---

## A Toy Experiment

The task: sort a support ticket into one of eight categories. I hand-wrote 44 tickets and labelled them — eight easy ones, fourteen sitting deliberately on a category boundary, and twenty-two held back to check whether my rules generalise or just memorise.

Then two prompts. The first one is the prompt we all write:

```text
Classify this support ticket into one of these categories:
billing, bug, feature_request, account_access, how_to, integration, performance, spam

Answer with the category name and nothing else.
```

Twenty-five words. The second one is 283 — a definition for every category, and four rules for what to do when two of them both look right:

```text
Classify this support ticket into exactly one of these categories:
billing, bug, feature_request, account_access, how_to, integration, performance, spam.

Categories:
billing - what the customer pays or is subscribed to: charges, refunds, invoices, plan changes, cancelling or closing an account.
bug - our app behaves incorrectly: wrong results, wrong data shown, errors, a state that isn't applied.
performance - our app works correctly but is too slow, freezes or hangs.
account_access - who can get into or control an account: sign-in, credentials, 2FA, roles, ownership. Not closing an account.
integration - a connection between our app and an external system misbehaves. If it works correctly inside our app but goes wrong in or through the external system, it is integration.
how_to - the user asks how to do something or whether something exists or is included.
feature_request - the user asks for a capability that doesn't exist, or for an intended limit to change.
spam - unsolicited sales, marketing or partnership pitches, scams.

How to decide:
1. Classify by the action support must take to resolve the ticket, not by the user's wording ("broken", "bug") or by where in the product it happened.
2. If the fix is to change money or a subscription, it is billing. If the fix is to change our app's behaviour, it is bug or performance. An external system mentioned only as background doesn't make it integration.
3. Incorrect result -> bug. Correct result, delivered too slowly -> performance.
4. When a ticket reports a concrete problem and also asks a question or makes a suggestion, classify the problem. A question with a hypothetical "if not, add it" is still how_to.

Answer with the category name and nothing else.
```

That is the entire difference. Same model (`claude-haiku-4-5`), same 44 tickets, three repeats each:

| Prompt | Accuracy | Edge cases | $ / 1k tickets |
|---|---|---|---|
| lazy | 0.780 | 0.595 | $0.10 |
| spec | 0.970 | 0.952 | $0.46 |

Nice, big, and honestly the least interesting thing I found.

---

## The Model Had Opinions

Here is what I expected: the lazy prompt would be confused, flip-flopping between categories, generally a bit lost.

Wrong. The lazy prompt failed ten cases, and nine of them were wrong in all three repeats, usually with exactly the same wrong answer. The model was not confused at all. It had a firm, stable opinion about where the line between `bug` and `integration` sits. That opinion just wasn't mine.

That reframed the whole thing for me. I was not teaching the model the categories — it knows what an integration is better than I do. I was telling it which of several reasonable conventions I happened to want. A category list is not a spec. A spec is the list plus the tie-break rules, and writing those rules is the actual work.

Look at the edge column in that table again — 0.595 to 0.952. That is the whole story in one number. The easy tickets never separated the two prompts at all; both scored a perfect 1.000 on them. All of the value lived on the boundaries.

---

## One Run Is a Lie

I ran the good prompt five times in total:

| Pass | Score | Failed |
|---|---|---|
| 1 | 0.977 | h18 |
| 2 | 0.977 | h15 |
| 3 | 0.977 | t13 |
| 4 | 0.955 | t10, h18 |
| 5 | 0.977 | h18 |

Four different cases failed at least once. None of them failed every time. And look at the failure column — any single pass shows me one weak case, maybe two, and lets me believe everything else is solid. It took five passes to see all four.

If you run your prompt once, congratulate yourself and ship, you are not measuring your prompt. You are measuring one sample of it.

I also did the thing that feels ridiculous at this scale: a significance test. Paired McNemar, about ten lines of Python. It confirmed the result (nine cases fixed, zero broken, p ≈ 0.004), but the useful part was the other number it gave me — with 44 cases, a change has to fix at least six of them without breaking any before I can tell it apart from noise. Every small prompt tweak I might make on this set is unmeasurable. That is worth knowing *before* spending an afternoon on one.

---

## Maybe My Labels Are Wrong

When a case refuses to pass, there is a lovely temptation: decide the label was wrong all along. Do that only for cases that are failing and you are not evaluating anything, you are marking your own homework.

So I picked the rule first, then applied it to all 44 cases: *does the ticket leave out a fact that decides the category?* Not "could someone argue for another answer" — several tickets sit on a boundary, but the facts are there and the rules settle them. That is a convention, and conventions are the prompt's job.

Exactly one case failed. An invoice for 12 seats when SCIM only created 9 users is either a billing error or an integration failure, and the ticket genuinely does not say which.

The better find was the case I *thought* was a bad label. It wasn't. My spec contradicts itself: the `bug` definition covers it, and tie-break rule 2 sends it to `billing`. Both apply, so the model picks billing three times out of five. I wrote that bug myself, in English, and no score would ever have shown it to me.

---

## Final Words

The spec prompt is also 4.8× more expensive per ticket — $0.46 versus $0.10 per thousand — almost entirely because it is longer. Irrelevant at my scale, the whole trade-off at someone else's.

None of this is sophisticated. It is 44 rows of JSON, a scoring script, and the patience to run things more than once. But I have written a lot of prompts on vibes, and the first time I measured one properly it told me that my model had opinions, my prompt contradicted itself, and my labels had an ambiguity in them. Seven cents.

It is all on GitHub — report, cases, prompts and the runs it is scored from: [prompt-eval-describe-vs-specify](https://github.com/frycz/prompt-eval-describe-vs-specify). Every number in it re-computes offline, without an API key. Which is the other half of the point :)
