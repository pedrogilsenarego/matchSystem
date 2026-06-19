# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **Color palette tokens.** New [libs/design-system/src/colors.ts](libs/design-system/src/colors.ts)
  defines `primary` (blue), `secondary` (orange), and `base` (gray/black), each with a
  full **50–900** shade scale. These are wired through the theme contract in
  [theme.css.ts](libs/design-system/src/theme.css.ts), so they are usable both as CSS
  variables in `*.module.css` (`var(--color-primary-500)`) and as tokens in
  vanilla-extract (`vars.color.primary[500]`). Colocated test
  [colors.test.ts](libs/design-system/src/colors.test.ts); Vitest `include` extended to
  cover `libs/**`.

- **Convention: no magic numbers.** Added a rule to [AGENTS.md](AGENTS.md) requiring
  meaningful numeric/string literals (intervals, limits, dimensions, thresholds,
  ports, etc.) to be extracted into named constants in a dedicated `constants.ts`
  file and imported, rather than inlined. Trivial identity values (`0`, `1`, `-1`)
  are exempt.
- **CI scaffold (disabled).** Added [.github/workflows/unit-tests.yml](.github/workflows/unit-tests.yml)
  with a lint/typecheck/unit-test pipeline (Node 20, `npm ci` → `lint` → `build` → `test`).
  The workflow is fully commented out for now; uncomment its body to enable it.
- **Per-component hooks** for the scoreboard, with colocated tests:
  - `use-match-overview` — derives status label and minute/break visibility.
  - `use-events-feed` — memoized newest-first ordering of events.
  - `use-pause-button` — pause/resume toggle logic.

### Changed

- **Reorganized scoreboard components into kebab-case feature folders.** Each
  component now lives in its own folder alongside its styles, hook, and test,
  matching the `pause-button/` reference and the AGENTS.md convention:
  - `components/MatchOverview.tsx` → `components/match-overview/` (`match-overview.tsx`,
    `match-overview.module.css`, `match-overview.test.tsx`).
  - `components/EventsFeed.tsx` → `components/events-feed/` (`events-feed.tsx`,
    `events-feed.module.css`).
  - `Dashboard.tsx` → `dashboard/` (`dashboard.tsx`, `dashboard.module.css`),
    with the `useLiveMatch` hook moved in as `dashboard/use-live-match.ts`
    (renamed from `hooks/useLiveMatch.ts`); the empty `hooks/` directory was removed.
- **Updated references** for the moved files: the Module Federation expose in
  [apps/scoreboard/vite.config.ts](apps/scoreboard/vite.config.ts)
  (`./Dashboard` → `./src/dashboard/dashboard.tsx`) and the import in
  [apps/scoreboard/src/App.tsx](apps/scoreboard/src/App.tsx). The federation
  key `scoreboard/Dashboard` is unchanged, so the host needs no edits.
- **Extracted presentational logic into the new hooks**, keeping `match-overview`
  and `events-feed` components purely presentational per the AGENTS.md convention.

### Notes / outstanding

These remain to align fully with the AGENTS.md conventions:

- The no-magic-numbers rule is not yet applied to existing code (no `constants.ts`
  files exist; literals remain inline in `liveFeed/mockFeed.ts`,
  `liveFeed/websocketFeed.ts`, and `ws-server/simulation.js`).
- Missing tests: `events-feed` component render test, `dashboard` component test,
  and the `stats-panel` `StatsPanel` component.
- `StatsPanel` is not yet in a kebab-case folder and still uses an inline style.
- Styling uses CSS Modules (`*.module.css`) repo-wide rather than the
  vanilla-extract (`*.css.ts`) approach AGENTS.md mandates.
- Set up Storybook for the components (scoreboard feature components and the
  shared `ui-components` kit), with a story per component.
- Reorganize the scoreboard into a module-based structure (e.g. `src/modules/<name>/`),
  moving `dashboard/` and its related files (components, hooks, live feed, data)
  under a self-contained module so the app can grow to host more modules.
- UI/UX improvements:
  - Make the half-time **Break** indicator blink/pulse (CSS animation on the Break
    badge + "HT" indicator when `status === 'break'`), respecting
    `prefers-reduced-motion`, so the 45' break is visually obvious.
  - Add better live visual feedback for incoming updates (e.g. a queue/animation
    that highlights new events and score/stat changes as they arrive).
  - Reorganize colors following the 60/30/10 rule (dominant / secondary / accent),
    now that the `primary` / `secondary` / `base` ramps exist — map the existing
    `text` / `background` / `semantic` tokens onto the new palette and refactor the
    app `*.module.css` files to consume `var(--color-*-NNN)` instead of ad-hoc values.
  - ~~Build out a proper design system: define primary/secondary/accent colors and a
    full token scale, and expose them through the `design-system` theme contract.~~
    Done — palette + 50–900 scale added in `libs/design-system/src/colors.ts` and the
    theme contract.
