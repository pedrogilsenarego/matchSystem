Welcome to Gaming1 — and thank you for taking the time to do this exercise. We appreciate you investing your time in this and we’re glad you’re here.
The tasks below are a chance to show how you approach a real-time frontend problem and structure your code. Good luck, and we look forward to your solution and to the conversation afterwards.

---

# Live score webpage — Your tasks

Build a **Live Score** page that shows at least two matches and updates them over time with simulated live data.
The exercise is timeboxed; focus on a clean, well-structured implementation and be ready to explain your choices in the review.

---

## Format

- **Analysis (20 min, read-only)** — Review the repo structure, existing patterns, and data flow. No coding yet.
- - **Plan (10 min)** — Short ordered bullet list of what you’d implement next (what, pattern, tech); **`CANDIDATE-PLAN.md`**. No coding.
- **Coding (60 min)** — Implement the scope below.
- **Review (30 min)** — Short demo and questions about your architecture, performance, and decisions.

---

## Environment

You’re working in a **brownfield monorepo**.
The basic setup to run the application is provided. It is highly encouraged to make changes to the commands, packages or config as you like.

---

## What to build

### 1. Multiple matches + match switching

- Add a way to switch between **Match A** and **Match B**.

### 2. Match overview panel

For the currently selected match, show:

- Team A vs Team B
- Current score
- Match time (e.g. 67’)
- Match status: **Live** / **Finished**

### 3. Live events feed

A chronologically ordered feed that updates as new events arrive:

- **Event types:** Goal, Yellow card, Red card, Substitution
- For each, show at least: **minute**, **event type**, **player name**, **team**

### 4. Statistics panel

Display and keep updated over time:

- Possession %
- Shots on target
- Fouls
- Corners

### 5. Real-time simulation

- A WebSocket is provided that simulates a live feed of updates. Review and improve it if necessary.

---

## Requirements

- Use **modern frontend best practices** and production-style structure.
- **Test** at least one component; consider different levels of testing.

---

## Optional tasks

- Maintain a **`features.md`** listing any optional tasks you attempted, to hand in at the end.
- **Option 1:** Implement a pause button to stop the live feed.
- **Option 2:** At 45', introduce a 5' break; match status should show **Break**.
- **Option 3:** Add your own idea (use a pattern or setup that isn’t a direct copy of an existing feature).

---

## AI usage

- If you use AI during the exercise, your prompts will be recorded in **`ai-prompt-history.md`**. This is set up for most common AI tools. After your first AI-assisted action, periodically check that the file is being updated correctly.
- In the review we’ll ask you to walk through AI-generated parts and explain why they’re correct.
