# Frontend Exercise: Live Scoreboard Dashboard

A frontend interview exercise around a real-time sports scoreboard in a brownfield monorepo.
This is a **starter baseline**: project wiring is in place, and candidates are expected to implement core feature behavior.

## Features

Target exercise features:

- **Match overview**: Team names, current score, match time (e.g. 67'), status (Live / Finished / Upcoming)
- **Live events feed**: Goals, yellow cards, red cards, substitutions (minute, type, player, team)
- **Match statistics**: Possession %, shots on target, fouls, corners
- **Multiple matches**: Switch between at least two matches with state isolated per match
- **Pause button** (optional): Stops the live feed and pauses interaction with the simulated “WebSocket”

Events and statistics update over time via a **live feed**: Data is simulated locally a using a **WebSocket**;

## Tech Stack

- React 19 + TypeScript + Vite
- Module Federation (`@originjs/vite-plugin-federation`)
- WebSocket live simulation server (`apps/ws-server`)
- Shared design system and UI component libraries (`libs/design-system`, `libs/ui-components`)

## Project Structure

```text
frontend-interview-scoreboard/
│   ├── host/          # Shell: match selector, pause button, loads remotes (port 5173)
│   ├── scoreboard/    # Remote: Dashboard, MatchOverview, live state (port 5174)
│   ├── stats-panel/   # Remote: StatsPanel component (port 5176)
│   └── ws-server/     # WebSocket server for live match feed (port 8080, optional)
├── libs/
│   ├── design-system/ # Shared design system (vanilla-extract / CSS variables)
│   └── ui-components/ # Shared UI components (React, Radix UI, vanilla-extract)
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run with Module Federation

The **remotes** must be built and served so the host can load their federated entries. Build order: stats-panel → scoreboard → host.

All-in-one run:
```bash
npm run dev
```

Manual run:

1. Build libraries and remotes:

```bash
npm run build:libs
npm run build:stats-panel
npm run build:scoreboard
```

2. In separate terminals, run:

```bash
npm run preview:stats-panel
npm run preview:scoreboard
npm run dev:host
```

### Run with WebSocket Live Feed

Start the simulation server:

```bash
npm run dev:ws
```

Server listens on `ws://localhost:8080`. by default. You can change this by creating a `.env` file in the project root with:

```text
VITE_WS_URL=ws://localhost:8080
```

### Run Remotes Standalone

To develop or test a remote UI alone:

```bash
npm run dev:scoreboard
npm run dev:stats-panel
```

### Build for Production

```bash
npm run build
```
