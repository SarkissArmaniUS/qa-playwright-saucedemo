import { test, expect } from '../fixtures';
import { USERS, PASSWORD } from '../fixtures/test-data';

// Login tests must start unauthenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('standard user logs in successfully', async ({ loginPage, page }) => {
    await loginPage.login(USERS.standard, PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login(USERS.lockedOut, PASSWORD);
    await expect(loginPage.error).toContainText('this user has been locked out');
  });

  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login(USERS.standard, 'wrong_password');
    await expect(loginPage.error).toContainText('do not match any user');
  });

  test('empty username shows "Username is required"', async ({ loginPage }) => {
    await loginPage.login('', PASSWORD);
    await expect(loginPage.error).toContainText('Username is required');
  });

  test('empty password shows "Password is required"', async ({ loginPage }) => {
    await loginPage.login(USERS.standard, '');
    await expect(loginPage.error).toContainText('Password is required');
  });

  test('unauthenticated user cannot open inventory directly', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page.getByTestId('error')).toContainText("You can only access '/inventory.html' when you are logged in");
  });
});
