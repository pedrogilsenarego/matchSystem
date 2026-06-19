import { test, expect } from '../fixtures/test';

const MINUTE_ADVANCE_TIMEOUT_MS = 15_000;

test.describe('dashboard @dashboard', () => {
  test('shows the overview, events feed and statistics for the selected match', async ({
    dashboard,
  }) => {
    await dashboard.waitForLoaded();

    await expect(dashboard.statusBadge).toBeVisible();
    await expect(dashboard.score).toBeVisible();
    await expect(dashboard.eventsFeed.getByRole('heading', { name: 'Events' })).toBeVisible();
    await expect(dashboard.statsPanel.getByRole('heading', { name: 'Statistics' })).toBeVisible();
    await expect(dashboard.possessionMeter).toBeVisible();
  });

  test('switches between matches', async ({ dashboard }) => {
    const tabs = dashboard.matchTablist.getByRole('tab');
    const firstTab = tabs.first();
    const secondTab = tabs.last();

    await expect(firstTab).toHaveAttribute('aria-selected', 'true');

    await secondTab.click();
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    await expect(firstTab).toHaveAttribute('aria-selected', 'false');

    await dashboard.waitForLoaded();
    const secondTeams = await secondTab.innerText();
    await expect(dashboard.overview.getByText(secondTeams.split(' vs ')[0])).toBeVisible();
  });

  test('pause button toggles its state', async ({ dashboard }) => {
    await dashboard.waitForLoaded();

    const status = await dashboard.statusBadge.innerText();
    test.skip(status === 'Finished', 'Pause is disabled for a finished match');

    await expect(dashboard.pauseButton).toHaveText('Pause');
    expect(await dashboard.isPaused()).toBe(false);

    await dashboard.togglePause();
    await expect(dashboard.pauseButton).toHaveText('Resume');
    expect(await dashboard.isPaused()).toBe(true);

    await dashboard.togglePause();
    await expect(dashboard.pauseButton).toHaveText('Pause');
    expect(await dashboard.isPaused()).toBe(false);
  });

  test('match clock advances while live', async ({ dashboard }) => {
    await dashboard.waitForLoaded();

    const status = await dashboard.statusBadge.innerText();
    test.skip(status !== 'Live', 'Selected match is not live');

    const start = await dashboard.currentMinute();
    expect(start).not.toBeNull();

    await expect
      .poll(() => dashboard.currentMinute(), { timeout: MINUTE_ADVANCE_TIMEOUT_MS })
      .toBeGreaterThan(start as number);
  });
});
