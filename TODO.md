# TODO

## Add TanStack Query (React Query) to the project

Adopt `@tanstack/react-query` (v5, React 19 compatible) as the data layer.

**Why — even with the WebSocket feed:**

- **Single source of truth for server state.** The live feed becomes the writer (`queryClient.setQueryData`) into a cache the whole app reads, instead of state living inside one hook/component.
- **Cache survives match switching.** Switching Match A ↔ B keeps each match's last state cached, so the UI shows it instantly on return instead of flashing "Connecting…".
- **Loading / error / reconnect states for free.** Status flags, retries, and `staleTime`/`gcTime` are handled by the lib rather than hand-rolled in the hook.
- **Right tool for fetched data too.** The match list / initial snapshot ("in a real app this would come from an API") is a natural `useQuery`; the socket then streams updates on top.
- **Shared cache across micro-frontends.** Put the `QueryClient` in federation `shared` (next to react/react-dom) so host + remotes read one cache.
- **DevTools + testability.** React Query Devtools for inspection; queries are easy to seed in tests.

**WebSocket fits as the transport, not a replacement:** keep `LiveFeedConnection`, but have its messages drive `setQueryData` instead of a local `useReducer`. Query owns the state; the socket pushes into it.

**Rough steps:**
1. `npm i @tanstack/react-query -w apps/scoreboard` (+ devtools as a dev dep).
2. Add `@tanstack/react-query` to the `shared` list in each federated `vite.config.ts`.
3. Wrap host + standalone roots in `QueryClientProvider`.
4. Refactor `useLiveMatch` to subscribe the feed and call `setQueryData(['match', matchId], reducerFn)`.

_Requested by: pedro.rego@daredata.engineering_

## Organize components with an atomic-design structure (atoms / molecules / organisms)

Restructure the component layer into a clearer hierarchy instead of a flat `components/` folder, **if the project grows enough to justify it.**

**Current state:**
- `libs/ui-components/src/components/` holds primitive, reusable pieces: `Badge`, `Button`, `Card`, `Heading`, `ErrorMessage`, `LoadingMessage`, `ErrorBoundary` — effectively **atoms**.
- `apps/scoreboard/src/components/` holds feature-specific, composed pieces: `MatchOverview`, `EventsFeed`, `pause-button` — effectively **molecules / organisms**.

**Proposed direction:**
- **Atoms** — single-purpose primitives (`Button`, `Badge`, `Heading`, `Card`). These already live in `libs/ui-components`; formalize them as the atom layer.
- **Molecules** — small combinations of atoms (e.g. a `ScoreRow` = `Heading` + `Badge`, a labeled stat, `pause-button`).
- **Organisms** — larger feature blocks (`MatchOverview`, `EventsFeed`) that wire molecules + state together.

**Consider composition components** (compound-component pattern) where it genuinely improves the API — e.g. `<Card>` with `<Card.Header>` / `<Card.Body>`, or a `<MatchOverview>` exposing `<MatchOverview.Score>` / `<MatchOverview.Events>`. Only adopt this where multiple call sites need flexible layout; **don't over-engineer single-use components.**

**Caveat / judgement call:** with the current handful of components this may be premature. Apply only if/when the component count and reuse grow enough that a flat structure becomes hard to navigate. Keep the atoms in the shared `ui-components` lib and the organisms in the consuming app.

_Requested by: pedro.rego@daredata.engineering_
