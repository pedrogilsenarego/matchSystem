import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

const LOADED_TIMEOUT_MS = 30_000;

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly matchTablist: Locator;
  readonly overview: Locator;
  readonly statusBadge: Locator;
  readonly score: Locator;
  readonly eventsFeed: Locator;
  readonly statsPanel: Locator;
  readonly possessionMeter: Locator;
  readonly pauseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { level: 1, name: 'Live Scoreboard' });
    this.matchTablist = page.getByRole('tablist', { name: 'Select match' });
    this.overview = page.getByRole('region', { name: 'Match overview' });
    this.statusBadge = this.overview.getByText(/^(Upcoming|Live|Break|Finished)$/);
    this.score = this.overview.getByLabel(/^Score \d+ to \d+$/);
    this.eventsFeed = page.getByRole('region', { name: 'Live events feed' });
    this.statsPanel = page.getByRole('region', { name: 'Match statistics' });
    this.possessionMeter = page.getByRole('meter', { name: 'Possession' });
    this.pauseButton = page.getByRole('button', { name: /^(Pause|Resume)$/ });
  }

  async goto() {
    await this.page.goto('/');
  }

  matchTab(name: string | RegExp): Locator {
    return this.matchTablist.getByRole('tab', { name });
  }

  async selectMatch(name: string | RegExp) {
    await this.matchTab(name).click();
  }

  async waitForLoaded() {
    await expect(this.overview).toBeVisible({ timeout: LOADED_TIMEOUT_MS });
  }

  async togglePause() {
    await this.pauseButton.click();
  }

  async isPaused(): Promise<boolean> {
    return (await this.pauseButton.getAttribute('aria-pressed')) === 'true';
  }

  async currentMinute(): Promise<number | null> {
    const minute = this.overview.getByLabel(/^Match minute \d+$/);
    if ((await minute.count()) === 0) return null;
    const label = await minute.getAttribute('aria-label');
    const match = label?.match(/\d+/);
    return match ? Number(match[0]) : null;
  }
}
