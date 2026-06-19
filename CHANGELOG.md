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
  - `use-match-overview` — derives status label, minute/break visibility, and an
    `isLive` flag.
  - `use-events-feed` — memoized newest-first ordering of events.
  - `use-pause-button` — pause/resume toggle logic.
- **`Button` `pulse` modifier.** New composable boolean prop on the shared `Button`
  (mirrors `active`) that adds a looping, **variant-aware** glow-ring animation; the
  ring colour is driven by a per-variant CSS var so it matches the button colour, and
  it respects `prefers-reduced-motion`. Used to signal the live state.
- **Pulsing live indicator.** [match-overview.tsx](apps/scoreboard/src/components/match-overview/match-overview.tsx)
  now renders the `live` status as a pulsing `danger` `Button`; all other statuses
  stay as a `Badge`. Driven by `isLive` from `use-match-overview`.
- **Goal event highlight.** Goal rows in the events feed get an extravagant green
  treatment — a flashing green tint, an expanding glow ring, and a bouncing icon —
  that runs for **5 seconds** then settles into a static green highlight (a left border
  accent and a tint). Falls back to the static highlight under `prefers-reduced-motion`.
  Added a colocated `events-feed.test.tsx` covering the goal-row modifier.
- **`ProgressBar` component** in `ui-components`
  ([progress-bar/](libs/ui-components/src/components/progress-bar/)). A reusable,
  accessible bar (`role="meter"` | `progressbar`, `value`/`min`/`max`, value clamping)
  whose fill ramps **blue → orange → red**, with red revealed only at the full end —
  implemented as a track gradient uncovered by a shrinking "remaining" overlay. Ships
  with a Storybook story (Default / Low / Orange / Full / ColorRamp) and unit tests.
- **Unit tests for the remaining `ui-components` primitives.** Colocated `*.test.tsx`
  for `Badge`, `Card`, `Heading`, `ErrorMessage`, `LoadingMessage`, and `ErrorBoundary`
  — every component in the kit now has a test. They cover the default element/role,
  variant/level class wiring, `className` merging, `asChild` slotting (via Radix
  `Slot`), children-vs-`message` precedence, and the `ErrorBoundary` catch path (default
  fallback with the thrown message, custom `fallback`, and the `onError` callback,
  with `console.error` silenced). The full unit suite is now **85 tests across 20
  files**, all green (`vitest run --project unit`).
- **Storybook `Card` story + atoms/molecules/organisms sidebar.** Added an `Atoms/Card`
  story ([card.stories.tsx](libs/ui-components/src/components/card/card.stories.tsx))
  showing every card version — `Card` (flat), `ElevatedCard` (raised), the `glass`
  (frosted) variant over a gradient backdrop, and an `AllVersions` comparison. Grouped
  the Storybook sidebar into **Atoms / Molecules / Organisms** through story titles
  (`Atoms/Button`, `Atoms/Card`, `Molecules/Progress Bar`) with an explicit `storySort`
  order pinned in [.storybook/preview.tsx](libs/ui-components/.storybook/preview.tsx).
  This is a Storybook-sidebar taxonomy only; the `components/` folder layout stays flat
  (see the deliberate decision under **Changed**).

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
- **Reorganized the shared `ui-components` kit into `src/components/` feature folders.**
  Every primitive (`Button`, `Badge`, `Card`, `ElevatedCard`, `Heading`,
  `ErrorMessage`, `LoadingMessage`, `ErrorBoundary`, `ProgressBar`) now lives in its
  own kebab-case folder with colocated styles/test/story and a barrel; the root
  `index.ts` re-exports through `components/`. An atoms/molecules/organisms split was
  considered and deliberately **not** adopted — a flat `components/` layer fits the
  current component count (the TODO's caution against premature structure).
- **Recoloured `Button` onto the new palette following 60/30/10.** `primary` → the
  blue `primary` ramp (secondary action), `secondary` → the orange `secondary` ramp
  (accent), `muted` → the `base` gray ramp (dominant/quiet); `danger`/`success` keep
  their semantic tokens, and the focus ring uses `primary[500]`. Hover/active use the
  adjacent ramp shades. The public `ButtonProps`/`ButtonVariant` API is unchanged, so
  all consumers (host, `pause-button`) keep working.
- **Refactored the possession meter onto `ProgressBar`.**
  [StatsPanel](apps/stats-panel/src/StatsPanel.tsx) now renders
  `<ProgressBar value={possessionHome} label="Possession" />` instead of inline meter
  markup; the old `.bar`/`.barRemaining` rules and the inline `style` were removed. The
  `role="meter"` + `aria-*` contract the e2e suite relies on is preserved.
- **Increased spacing between event-feed rows** (added a `gap` to the list) and limited
  the goal-row pulse to a fixed 5s (finite iteration count) rather than looping forever.
- **Playwright no longer writes artifacts.** `preserveOutput: 'never'`, dropped the
  HTML reporter (kept `list`/`github`), and turned traces off in
  [playwright.config.ts](playwright.config.ts); added `e2e/.results`,
  `playwright-report`, `blob-report`, and `test-results` to `.gitignore`.
- **Fixed the broken root `vitest.config.ts`.** Pointed the Storybook Vitest project's
  `configDir` at the real `libs/ui-components/.storybook` (it referenced a non-existent
  repo-root `.storybook/`, which crashed config load and broke `vitest run`) and named
  the default jsdom project `unit`. The jsdom unit suite now runs via
  `vitest run --project unit` without requiring the Storybook browser project / its
  Playwright browser.

### Notes / outstanding

These remain to align fully with the AGENTS.md conventions:

- The no-magic-numbers rule is not yet applied to existing code (no `constants.ts`
  files exist; literals remain inline in `liveFeed/mockFeed.ts`,
  `liveFeed/websocketFeed.ts`, and `ws-server/simulation.js`).
- Missing tests: `dashboard` component test and a `stats-panel` `StatsPanel` component
  test (the meter logic now lives in—and is tested via—`ProgressBar`). The
  `events-feed` component render test has been added.
- **Storybook browser test project.** The root `vitest.config.ts` config-load bug is
  now fixed (see **Changed**), so the `unit` project runs green. The second `storybook`
  project (the addon's browser-based test runner) still requires a Playwright browser
  and is not yet wired into `npm test` / CI — `npm test` runs both projects, so plain
  `vitest run` still pulls in the browser project. Scope `npm test` to `--project unit`
  or gate the browser project behind CI to make `npm test` reliable everywhere.
- `StatsPanel` is not yet in a kebab-case folder.
- Styling uses CSS Modules (`*.module.css`) repo-wide rather than the
  vanilla-extract (`*.css.ts`) approach AGENTS.md mandates. The shared `ui-components`
  kit (incl. the new `ProgressBar`) does use vanilla-extract.
- Storybook is set up for `ui-components` and the sidebar is grouped Atoms / Molecules /
  Organisms (`Button`, `Card`, `ProgressBar` have stories). Remaining primitives
  (`Badge`, `Heading`, `ElevatedCard`, `ErrorMessage`, `LoadingMessage`, `ErrorBoundary`)
  and the scoreboard feature components still need stories — and the `Organisms` tier is
  empty (good homes: `ErrorBoundary`, `StatsPanel`).
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
