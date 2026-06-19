# Optional features attempted

## Option 2 — Half-time break at 45'

At minute 45 the match enters a 5-tick break with status `break`; the overview shows
a **Break** badge and an **HT** indicator, and the clock resumes live play afterwards.

**Where it lives**

- `apps/ws-server/config.js` — `BREAK_START_MINUTE` (45) and `BREAK_DURATION_TICKS` (5).
- `apps/ws-server/simulation.js` — `runTick` enters `break` at the break minute (clock
  frozen, no events/stats), counts down `breakRemaining`, then resumes `live`.
- `apps/ws-server/server.js` — threads `breakRemaining` through the per-match room.
- `apps/scoreboard/src/types.ts` — `'break'` added to `MatchStatus`.
- `apps/scoreboard/src/liveFeed/mockFeed.ts` — same break behaviour for the test/fallback feed.
- `apps/scoreboard/src/components/MatchOverview.tsx` — `Break` label + `HT` indicator.
- `libs/ui-components/src/components/Badge.tsx` + `badge.css.ts` — `break` variant (amber).

**Tests**

- `apps/ws-server/simulation.test.js` — enters break at 45', freezes the clock, generates
  no events during the break, and resumes live on the final break tick.
- `vitest.config.ts` — test `include` extended to pick up the ws-server's `.js` tests.
