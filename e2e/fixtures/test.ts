import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';

interface Fixtures {
  dashboard: DashboardPage;
}

export const test = base.extend<Fixtures>({
  dashboard: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await use(dashboard);
  },
});

export { expect } from '@playwright/test';
