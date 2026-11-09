import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS, PASSWORD } from '../fixtures/test-data';

// Logs in once and saves the session; all other tests reuse it.
setup('authenticate standard_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard, PASSWORD);
  await expect(page).toHaveURL(/inventory\.html/);
  await page.context().storageState({ path: '.auth/user.json' });
});
