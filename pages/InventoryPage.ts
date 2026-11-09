import { Page, Locator } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortSelect: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.items = page.getByTestId('inventory-item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  /** slug example: "sauce-labs-backpack" */
  async addToCart(slug: string) {
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async removeFromCart(slug: string) {
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async sortBy(option: SortOption) {
    await this.sortSelect.selectOption(option);
  }

  async itemNames(): Promise<string[]> {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async itemPrices(): Promise<number[]> {
    const raw = await this.page.getByTestId('inventory-item-price').allTextContents();
    return raw.map((p) => parseFloat(p.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
