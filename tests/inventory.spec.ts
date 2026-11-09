import { test, expect } from '../fixtures';
import { PRODUCTS } from '../fixtures/test-data';

test.describe('Inventory', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('shows 6 products', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('sort by name A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.itemNames();
    expect(names).toEqual([...names].sort());
  });

  test('sort by name Z to A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.itemNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('sort by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.itemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sort by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.itemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('user can log out', async ({ inventoryPage, page }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('adding an item shows cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack.slug);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
