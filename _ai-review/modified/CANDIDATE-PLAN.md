# Candidate Plan — Live Scoreboard

## Analysis summary

- **Backend is done.** `apps/ws-server` runs one simulation per match and broadcasts
  `match_state` / `tick` / `event` / `stats` messages over `ws://localhost:8080`.
- **Frontend is the work.** The data→UI path is stubbed: the WebSocket feed client is
  empty, the Dashboard renders a hardcoded `dummyState` and ignores `matchId`, the
  overview/stats panels are placeholders, there is no events feed, and the host has no
  match selector.
- **Architecture:** Module Federation. `host` (shell) → `scoreboard` remote (Dashboard,
  MatchOverview, events) → `stats-panel` remote (StatsPanel). Shared `MatchState` type.

## Implementation order

**Strategy:** vertical slice first — get *one* match updating live end-to-end before
widening to all panels and both matches. This de-risks the WebSocket integration early
and keeps a demoable build at every step. Required tasks come before optional ones, and
the highest-value test is written as soon as the logic it covers exists (not deferred to
the end, where a timebox would drop it).

### 1. Real WebSocket feed client — `liveFeed/websocketFeed.ts`  *(foundational, riskiest)*
- Open a `WebSocket(wsUrl)`, send `{ type: 'subscribe', matchId }` on open.
- Parse incoming JSON into `LiveFeedMessage` and fan out to subscribers.
- Handle `connect`/`disconnect`, reconnect with backoff, and `setPaused` (stop dispatching / close socket while paused).
- **Pattern:** keep the existing `LiveFeedConnection` interface so the UI stays transport-agnostic.

### 2. State hook + reducer — `useLiveMatch(matchId)` (new)  +  **first test**
- Reduce messages into one `MatchState`: `match_state` → replace; `tick` → minute;
  `event` → append; `stats` → merge. Re-subscribe on `matchId` change; clean up on unmount.
- **Pattern:** `useReducer` + `useEffect`; per-match state isolation.
- **Test now:** unit-test the pure reducer (no UI needed — highest-value test, satisfies the
  testing requirement early rather than at a rushed end).

### 3. Match overview — `MatchOverview.tsx`  *(minimal real fields)*
- Team A vs Team B, current score, minute (`67'`), status `Badge` (Live/Finished).

### 4. Dashboard wiring — single match  *(✅ first end-to-end live demo)*
- Remove `dummyState`; consume `useLiveMatch(matchId)` (restore the `matchId` prop).
- Render `MatchOverview` with live data; loading/error states via `LoadingMessage`/`ErrorMessage`.
- **Checkpoint:** one match visibly ticking over the real WebSocket — integration de-risked.

### 5. Match switching — `host/App.tsx`  *(required task #1; cheap once the slice works)*
- Selector (Match A / Match B) driving `selectedMatchId` passed to `Dashboard`.
- Verifies the hook's re-subscribe / per-match isolation — a common bug source, so lock it early.

### 6. Events feed — `EventsFeed.tsx` (new)
- Chronological list (newest first): minute, type, player, team. Icon/badge per type; `memo` + `event.id` keys.

### 7. Stats panel — `StatsPanel.tsx` (stats-panel remote)
- Full stats: possession % bar, shots on target, fouls, corners. Presentational, `memo`.

### 8. Polish + second test + optionals
- One component test (`MatchOverview` or `EventsFeed`) with React Testing Library.
- Add `vitest` + `@testing-library/react` if not already present.
- Pause button (Optional 1) and any remaining optionals — track in `features.md`.

## Optional (if time) — track in `features.md`
- **Pause** (folded into step 7).
- **45' break:** add `break` status in `ws-server/simulation.js` (pause sim 45→50), surface in overview.
- **Own idea:** e.g. score-flash animation on goal, or connection-status indicator.

## Out of scope / risks
- Build order matters (remotes before host); dev currently launches via `bash scripts/dev.sh`.
- Keep `host/data/matches.ts` and `scoreboard/data/matchRegistry.ts` match lists in sync.
