#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

# WebSocket URL for scoreboard live feed (must match ws-server, e.g. port 8080).
export VITE_WS_URL="${VITE_WS_URL:-ws://localhost:8080}"

echo "Starting dev (VITE_WS_URL=$VITE_WS_URL)"
echo ""
echo "=== Phase 0: build & watch libs ==="
npm run build:watch --workspace=libs/design-system &
sleep 2
npm run build:watch --workspace=libs/ui-components &
echo "Waiting for initial lib builds..."
sleep 3

echo ""
echo "=== Phase 1: start watchers (initial build + watch) ==="
npm run build:watch --workspace=apps/stats-panel &
npm run build:watch --workspace=apps/scoreboard &
echo "Waiting for initial remote builds..."
sleep 3

echo ""
echo "=== Phase 2: starting services (ws, previews, host) ==="
# If preview fails (e.g. "dist/ not found"), dist/ may not be ready yet — run 'npm run dev' again.
echo "If a preview fails, wait a bit and run 'npm run dev' again (dist/ may not have been ready)."
echo ""
npx concurrently \
  -n ws,events,stats,scoreboard,host \
  -c yellow,blue,green,magenta,cyan \
  "npm run dev:ws" \
  "npm run preview:stats-panel" \
  "npm run preview:scoreboard" \
  "sleep 2 && npm run dev:host"
