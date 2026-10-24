/* Browser and catalogue checks for the enquiry-only preview. Optional URL argument. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'catalog/products.sample.json')));
const base = process.argv[2] || 'http://127.0.0.1:8123/preview/';
const expected = { Rings: 20, Bracelets: 9, Earrings: 13, Kada: 5,
  Chains: 2, Cufflinks: 7, Accessories: 4 };

async function main() {
  assert.equal(data.products.length, 60);
  assert.deepEqual(data.categories, Object.keys(expected));
  assert.equal(data.sampleContent, false);
  assert.equal(new Set(data.products.map(p => p.id)).size, 60);
  for (const [category, count] of Object.entries(expected)) {
    assert.equal(data.products.filter(p => p.category === category).length, count);
  }
  for (const product of data.products) {
    assert.equal(product.catalogueStatus, 'enquiry');
    assert.equal(product.variants.length, 0);
    assert.equal(product.pricingStatus, 'on_enquiry');
    assert(product.description && product.shortDescription && product.details?.design);
    for (const view of product.gallery) {
      const image = product.images[view.key];
      assert(image, `${product.id} missing ${view.key}`);
      assert(fs.existsSync(path.join(root, image)), `Missing ${image}`);
    }
    for (const option of product.visualOptions || []) {
      for (const key of ['primary', 'alternate', 'detail']) {
        assert(fs.existsSync(path.join(root, option.images[key])));
      }
    }
  }
  const mono = data.products.find(p => p.productKey === 'custom-monogram-cufflinks');
  assert.equal(mono.gallery.length, 7);
  assert(mono.images.ngWorn && !mono.images.ngHero && !mono.images.ngAlternate);
  assert(!data.products.some(p => p.category === 'Pendants' || p.id === 'AYM-CH-001'));

  const browser = await chromium.launch({ headless: true,
    ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const go = relative => page.goto(new URL(relative, base).href);
    await go('index.html');
    await page.locator('#featured-grid .card').first().waitFor();
    assert.equal(await page.locator('.category-tile').count(), 4);
    assert.equal(await page.locator('#featured-grid .card').count(), 6);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex');
    for (const [category, count] of Object.entries(expected)) {
      await go('all-jewellery.html?category=' + category);
      await page.waitForFunction(count => document.querySelectorAll('#product-grid .card').length === count, count);
      assert.equal(await page.locator('.card .price').first().textContent(), 'Price on enquiry');
      assert(await page.locator('#filter-design').isVisible());
      assert(await page.locator('#filter-karat').isHidden());
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    }
    await go('all-jewellery.html?q=tennis');
    await page.waitForFunction(() => document.querySelectorAll('#product-grid .card').length === 2);
    await go('all-jewellery.html');
    await page.waitForFunction(() => document.querySelectorAll('#product-grid .card').length === 60);
    const worn = page.locator('.card[href="product.html?id=AYM-AC-103"] .card-worn');
    await worn.waitFor({ state: 'attached' });
    assert((await worn.getAttribute('src')).endsWith('03-worn.webp'));
    for (const product of data.products) {
      await go('product.html?id=' + product.id);
      await page.locator('.product-detail h1').waitFor();
      assert.equal(await page.locator('h1').textContent(), product.name);
      assert.equal(await page.locator('.thumbs button').count(), product.gallery.length);
      for (const view of product.gallery) {
        await page.locator(`[data-img="${view.key}"]`).click();
        await page.waitForFunction(name => document.getElementById('main-img')?.naturalWidth === 1254 && document.getElementById('main-img').src.endsWith(name), path.basename(product.images[view.key]));
      }
      const url = new URL(await page.locator('#enquire-btn').getAttribute('href'));
      const message = url.searchParams.get('text');
      assert(message.includes(product.name) && message.includes(product.id) && !message.includes('undefined'));
      if (product.visualOptions) {
        await page.locator('#visual-options [data-option="gold-black"]').click();
        const main = page.locator('#main-img');
        await main.evaluate(img => img.decode());
        assert((await main.getAttribute('src')).includes('/gold-black/'));
        assert(new URL(await page.locator('#enquire-btn').getAttribute('href')).searchParams.get('text').includes('Gold tone / black band'));
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    }
    for (const id of ['AYM-CH-001', 'AYM-PD-001', 'unknown']) {
      await go('product.html?id=' + id);
      await page.locator('.product-missing').waitFor();
    }
    const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
    mobile.on('pageerror', error => errors.push(error.message));
    await mobile.goto(new URL('all-jewellery.html?category=Accessories', base).href);
    await mobile.waitForFunction(() => document.querySelectorAll('#product-grid .card').length === 4);
    assert.equal(await mobile.locator('.card-worn').count(), 0);
    assert(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await mobile.goto(new URL('product.html?id=AYM-CL-107', base).href);
    await mobile.locator('.thumbs button').first().waitFor();
    assert.equal(await mobile.locator('.thumbs button').count(), 7);
    assert(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ base, result: 'passed', products: 60, galleryViews: data.products.reduce((n, p) => n + p.gallery.length, 0), categories: expected }));
  } finally { await browser.close(); }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
