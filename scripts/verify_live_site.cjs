/* Validate the domain-root production bundle before a Netlify upload. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const base = process.argv[2] || 'http://127.0.0.1:8123/dist/';
const catalogue = JSON.parse(fs.readFileSync(path.join(dist, 'catalog/products.sample.json')));

(async () => {
  assert.equal(catalogue.products.length, 60);
  assert.match(fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8'), /Allow: \/$/m);
  const files = fs.readdirSync(dist);
  assert(files.includes('index.html') && files.includes('catalog.js'));
  for (const name of files.filter(name => name.endsWith('.html') || name.endsWith('.js'))) {
    const source = fs.readFileSync(path.join(dist, name), 'utf8');
    assert(!/noindex|Draft Preview|demo contact|7265000916|72650 00916/.test(source), name);
  }
  const browser = await chromium.launch({ headless: true,
    ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const go = name => page.goto(new URL(name, base).href);
    await go('index.html');
    await page.locator('#featured-grid .card').first().waitFor();
    assert.equal(await page.locator('.category-tile').count(), 4);
    assert.equal(await page.locator('.preview-notice').count(), 0);
    assert.equal(await page.locator('meta[name="robots"]').count(), 0);
    assert.equal(await page.locator('footer').getByText('+91 94294 32142').count(), 1);
    assert(await page.locator('.nav-logo img').evaluate(img => img.complete && img.naturalWidth > 0));
    await go('all-jewellery.html');
    await page.waitForFunction(() => document.querySelectorAll('#product-grid .card').length === 60);
    assert.equal(await page.locator('#filter-category option').count(), 8);
    await page.locator('#filter-category').selectOption('Chains');
    await page.waitForFunction(() => document.querySelectorAll('#product-grid .card').length === 2);
    for (const product of catalogue.products) {
      await go('product.html?id=' + product.id);
      await page.locator('.product-detail h1').waitFor();
      assert.equal(await page.locator('h1').textContent(), product.name);
      const image = page.locator('#main-img');
      await image.evaluate(img => img.decode());
      assert.equal(await image.evaluate(img => img.naturalWidth), 1254);
      assert.equal(await page.locator('.thumbs button').count(), product.gallery.length);
      const href = await page.locator('#enquire-btn').getAttribute('href');
      assert(href.startsWith('https://wa.me/919429432142?text='));
      const message = new URL(href).searchParams.get('text');
      assert(message.includes(product.id) && message.includes(new URL(base).host));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    }
    await go('product.html?id=AYM-AC-103');
    await page.locator('#visual-options [data-option="gold-black"]').click();
    assert((await page.locator('#main-img').getAttribute('src')).includes('/gold-black/'));
    assert(new URL(await page.locator('#enquire-btn').getAttribute('href')).searchParams.get('text').includes('Gold tone / black band'));
    await go('contact.html');
    assert.equal(await page.locator('a[href="https://wa.me/919429432142"]').count(), 1);
    const mobile = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
    mobile.on('pageerror', error => errors.push(error.message));
    await mobile.goto(new URL('all-jewellery.html?category=Accessories', base).href);
    await mobile.waitForFunction(() => document.querySelectorAll('#product-grid .card').length === 4);
    assert(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ result: 'passed', base, products: 60, whatsapp: '+91 94294 32142' }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
