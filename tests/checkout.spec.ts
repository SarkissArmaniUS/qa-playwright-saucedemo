import { test, expect } from '../fixtures';
import { PRODUCTS, CUSTOMER } from '../fixtures/test-data';

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addToCart(PRODUCTS.backpack.slug);
    await inventoryPage.addToCart(PRODUCTS.bikeLight.slug);
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  test('complete purchase happy path', async ({ checkoutPage, page }) => {
    await checkoutPage.fillInfo(CUSTOMER);
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('order summary shows correct item total', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo(CUSTOMER);
    const expected = (PRODUCTS.backpack.price + PRODUCTS.bikeLight.price).toFixed(2);
    await expect(checkoutPage.subtotal).toContainText(`$${expected}`);
  });

  test('order total equals subtotal plus tax', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo(CUSTOMER);
    const num = async (l: typeof checkoutPage.subtotal) =>
      parseFloat(((await l.textContent()) ?? '').replace(/[^0-9.]/g, ''));
    const [sub, tax, total] = [await num(checkoutPage.subtotal), await num(checkoutPage.tax), await num(checkoutPage.total)];
    expect(sub + tax).toBeCloseTo(total, 2);
  });

  test('first name is required', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo({ lastName: CUSTOMER.lastName, postalCode: CUSTOMER.postalCode });
    await expect(checkoutPage.error).toContainText('First Name is required');
  });

  test('last name is required', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo({ firstName: CUSTOMER.firstName, postalCode: CUSTOMER.postalCode });
    await expect(checkoutPage.error).toContainText('Last Name is required');
  });

  test('postal code is required', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo({ firstName: CUSTOMER.firstName, lastName: CUSTOMER.lastName });
    await expect(checkoutPage.error).toContainText('Postal Code is required');
  });
});
