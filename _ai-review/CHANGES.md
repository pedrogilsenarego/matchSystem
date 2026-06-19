# AI Change Manifest

Copies of everything Claude touched, so you can review without git.
**These are copies for review only** — the live files are in their normal `src/` locations
and are what actually build/run. Editing files here has no effect on the app.

## 🟢 NEW files (created)

| File | Purpose |
|------|---------|
| `apps/scoreboard/src/data/mockMatches.ts` | Mock match states (2 matches incl. events). Seeds the mock feed + standalone fallback. |
| `apps/scoreboard/src/components/MatchOverview.tsx` *(rewritten)* | See modified — was a stub, now full overview. |
| `apps/scoreboard/src/components/MatchOverview.module.css` | Styles for the overview (score, minute, status). |
| `apps/scoreboard/src/components/EventsFeed.tsx` | New component: chronological events list (minute, type, player, team). |
| `apps/scoreboard/src/components/EventsFeed.module.css` | Styles for the events feed. |
| `apps/scoreboard/src/liveFeed/reducer.ts` | Pure `matchReducer`: feed messages → MatchState. Transport-agnostic; unit-testable. |
| `apps/scoreboard/src/liveFeed/mockFeed.ts` | Simulated feed (timer) implementing `LiveFeedConnection`. For dev/tests, not used by the app default anymore. |
| `apps/scoreboard/src/hooks/useLiveMatch.ts` | Hook: subscribes to a feed, reduces messages to state, exposes pause. Feed source injectable. |

## 🟡 MODIFIED files (existing, edited)

| File | What changed |
|------|--------------|
| `apps/scoreboard/src/liveFeed/websocketFeed.ts` | **Implemented the real WS client** (was an empty stub): opens socket, subscribes, parses messages, reconnects with backoff, pause support. |
| `apps/scoreboard/src/Dashboard.tsx` | Removed hardcoded `dummyState`; now uses `useLiveMatch(matchId)`, renders MatchOverview + EventsFeed + StatsPanel; loading state. Restored `matchId` prop. |
| `apps/scoreboard/src/components/MatchOverview.tsx` | Was "Home vs Away" only → now score, minute, status `Badge`. |
| `apps/scoreboard/src/App.tsx` | Standalone entry: passes a `matchId` to `<Dashboard>` (now required). |
| `apps/stats-panel/src/StatsPanel.tsx` | Was possession sample only → full stats (possession bar, shots, fouls, corners). |
| `apps/stats-panel/src/StatsPanel.module.css` | Styles for the full stats panel. |
| `CANDIDATE-PLAN.md` | Filled in the exercise plan (was empty). |

## Data flow (after changes)

```
ws-server (ready)  ──ws──▶  websocketFeed.ts  ──LiveFeedMessage──▶  useLiveMatch
                            (or mockFeed for tests)                   │ matchReducer
                                                                      ▼
                                                                  MatchState
                                                          ┌───────────┼───────────┐
                                                   MatchOverview   EventsFeed   StatsPanel
```

## Not yet done
- Match switching UI in the host (`apps/host/src/App.tsx`) — pass selected `matchId` to Dashboard.
- Tests (reducer + one component).
- Optional: pause button, 45' break.
