export class Dashboard {
  constructor(page) {
    this.page = page;
    this.searchBar = page.locator('#search');
    this.filterList = page.locator('.layout-root-menuitem > ul');
    this.products = page.locator('[test-data="product-container"]');
    this.addToCartButton = this.products.locator('button');
    this.productName = this.products.locator('h1');
    this.cartMenu = page.locator(
      "section[class='flex-1 overflow-y-auto px-2 py-2']"
    );

    this.itemsInCart = page.locator(
      "div[class='flex align-middle w-full max-w-lg']"
    );
    this.nameOfProduct = this.itemsInCart.locator('div');
    this.spinner = page.locator(
      "locator('div:nth-child(24) > .h-screen > .absolute > .h-48 > .text-white')"
    );
  }

  async addAnItemToCart(number) {
    await this.addToCartButton.nth(number).click();
  }

  getPageNumber(pageNumber) {
    let pageButton = this.page.locator(`button[aria-label="${pageNumber}"]`);
    return pageButton;
  }

  async switchPage(pageNumber) {
    await this.getPageNumber(pageNumber).click();
  }
}
