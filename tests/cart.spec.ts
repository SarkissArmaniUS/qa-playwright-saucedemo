import { test, expect } from '../fixtures';
import { PRODUCTS } from '../fixtures/test-data';

test.describe('Cart', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('added item appears in the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack.slug);
    await inventoryPage.openCart();
    expect(await cartPage.itemNames()).toEqual([PRODUCTS.backpack.name]);
  });

  test('multiple items update the badge counter', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack.slug);
    await inventoryPage.addToCart(PRODUCTS.bikeLight.slug);
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('item can be removed from the inventory page', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack.slug);
    await inventoryPage.removeFromCart(PRODUCTS.backpack.slug);
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('item can be removed from the cart page', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(PRODUCTS.onesie.slug);
    await inventoryPage.openCart();
    await cartPage.remove(PRODUCTS.onesie.slug);
    await expect(cartPage.items).toHaveCount(0);
  });

  test('"Continue Shopping" returns to inventory', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.openCart();
    await cartPage.continueShopping.click();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
