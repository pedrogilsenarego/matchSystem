import { test, expect } from '../fixtures/test';

test.describe('smoke @smoke', () => {
  test('loads the scoreboard shell and core regions', async ({ dashboard }) => {
    await expect(dashboard.heading).toBeVisible();
    await expect(dashboard.matchTablist).toBeVisible();

    await dashboard.waitForLoaded();

    await expect(dashboard.overview).toBeVisible();
    await expect(dashboard.eventsFeed).toBeVisible();
    await expect(dashboard.statsPanel).toBeVisible();
  });

  test('renders at least two selectable matches', async ({ dashboard }) => {
    const tabs = dashboard.matchTablist.getByRole('tab');
    await expect(tabs).toHaveCount(2);
  });
});
