/* Browser verification of the rendered catalogue, gallery and enquiry behaviour.
 * Requires Playwright. Optional argument: deployed preview base URL.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const catalogue = JSON.parse(fs.readFileSync(path.join(root, 'catalog/products.sample.json')));
const rings = catalogue.products.filter(p => p.category === 'Rings');
const base = process.argv[2] || 'http://127.0.0.1:8123/preview/';
const out = path.join(root, 'output/catalogue-images/integration-review');
fs.mkdirSync(out, { recursive: true });
const deployed = base.startsWith('https:');
const prefix = deployed ? 'deployed' : 'local';

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const go = relative => page.goto(new URL(relative, base).href);
    const waitCount = count => page.waitForFunction(n => document.querySelectorAll('#product-grid .card').length === n, count);
    const fit = async () => assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow');
    const loaded = async () => {
      await page.waitForFunction(() => { const img = document.getElementById('main-img'); return img?.complete && img.naturalWidth === 1254; });
    };
    const served = await context.request.get(new URL('../catalog/products.sample.json?v=verify-' + Date.now(), base).href);
    assert.equal(served.status(), 200);
    const servedCatalogue = await served.json();
    assert.deepEqual(servedCatalogue.products.map(p => p.id), catalogue.products.map(p => p.id));

    await go('all-jewellery.html?category=Rings'); await waitCount(20); await fit();
    assert(await page.locator('#filter-design').isVisible());
    assert(await page.locator('#filter-karat').isHidden());
    assert.equal(await page.locator('.card .price').first().textContent(), 'Price on enquiry');
    await page.locator('#filter-design').selectOption('Inlay');
    await waitCount(rings.filter(p => p.designTags.includes('Inlay')).length);
    await page.locator('#filter-category').selectOption('Bracelets'); await waitCount(8);
    assert(await page.locator('#filter-karat').isVisible());
    await go('all-jewellery.html?q=verdant'); await waitCount(1);
    assert((await page.locator('.card .name').textContent()).includes('Kavi'));
    await go('all-jewellery.html?q=no-such-ring-xx'); await page.locator('.empty-state').waitFor();
    await page.locator('#clear-all').click(); await waitCount(45);
    for (const sort of ['price-asc', 'price-desc']) {
      await page.locator('#sort').selectOption(sort);
      await page.waitForFunction(() => document.querySelectorAll('#product-grid .card').length === 45);
      const labels = await page.locator('.card .price').allTextContents();
      assert(labels.slice(-20).every(label => label === 'Price on enquiry'));
    }
    await go('all-jewellery.html?category=Rings&karat=18K&sort=price-asc'); await waitCount(20);
    assert(!new URL(page.url()).searchParams.has('karat'));
    await page.evaluate(async () => {
      const images = [...document.querySelectorAll('.card img')];
      images.forEach(img => { img.loading = 'eager'; });
      await Promise.all(images.map(img => img.decode()));
    });
    await page.screenshot({ path: path.join(out, prefix + '-rings-desktop.png'), fullPage: true });
    for (const ring of rings) {
      await go('product.html?id=' + ring.id); await page.locator('h1').waitFor(); await loaded();
      assert.equal(await page.locator('h1').textContent(), ring.name);
      assert.equal(await page.locator('.thumbs button').count(), 3);
      for (const role of ['primary', 'alternate', 'detail']) {
        await page.locator('[data-img="' + role + '"]').click(); await loaded();
        assert((await page.locator('#main-img').getAttribute('src')).endsWith(path.basename(ring.images[role])));
        assert.equal(await page.locator('[data-img="' + role + '"]').getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('.thumbs button[aria-pressed="true"]').count(), 1);
      }
      const whatsapp = new URL(await page.locator('#enquire-btn').getAttribute('href'));
      const text = whatsapp.searchParams.get('text');
      assert(text.includes(ring.name) && text.includes(ring.id) && text.includes('product.html?id=' + ring.id));
      assert(!text.includes('undefined') && !text.includes('null'));
      assert(whatsapp.pathname.includes('917265000916'));
      const email = new URL(await page.locator('.email-enquiry').getAttribute('href'));
      assert(email.searchParams.get('subject').includes(ring.id));
      assert.equal(await page.locator('#size-swatches, #karat-swatches, #colour-swatches').count(), 0);
      await fit();
    }
    await go('product.html?id=' + rings[0].id); await loaded();
    await page.screenshot({ path: path.join(out, prefix + '-ring-product-desktop.png'), fullPage: true });
    await page.locator('.product-sections details').nth(1).locator('summary').click();
    assert(await page.locator('.product-sections details').nth(1).evaluate(el => el.open));
    await go('product.html?id=AYM-RG-001'); await page.locator('.product-missing').waitFor();
    assert.equal(await page.locator('.product-detail').count(), 0);
    await go('product.html?id=AYM-BR-001'); await page.locator('#colour-swatches').waitFor();
    assert((await page.locator('.gallery-note').textContent()).includes('repeated'));
    await page.locator('#size-help-check').check();
    assert((await page.locator('#enquire-btn').getAttribute('href')).startsWith('https://wa.me/'));
    await go('index.html'); await page.locator('#featured-grid .card').first().waitFor();
    assert((await page.locator('.category-tile img').first().getAttribute('src')).includes('/rings/'));
    assert((await page.locator('#featured-grid .card').first().getAttribute('href')).includes(rings[0].id));
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex');
    await page.setViewportSize({ width: 375, height: 812 });
    await go('all-jewellery.html?category=Rings'); await waitCount(20); await fit();
    await page.evaluate(async () => { const imgs = [...document.querySelectorAll('.card img')]; imgs.forEach(img => { img.loading = 'eager'; }); await Promise.all(imgs.map(img => img.decode())); });
    await page.screenshot({ path: path.join(out, prefix + '-rings-mobile.png'), fullPage: true });
    await page.locator('[data-menu-open]').click();
    assert(await page.locator('body').evaluate(el => el.classList.contains('drawer-open')));
    await page.locator('[data-menu-close]').click();
    await go('product.html?id=' + rings[15].id); await loaded(); await fit();
    await page.locator('[data-img="detail"]').click(); await loaded(); await fit();
    await page.screenshot({ path: path.join(out, prefix + '-ring-product-mobile.png'), fullPage: true });
    assert.deepEqual(errors, []);
    const result = { base, checkedAt: new Date().toISOString(), ringProducts: rings.length, distinctGalleryAssets: rings.length * 3, catalogueProducts: 45, result: 'passed', checks: ['20 product routes and all 60 gallery views', 'WhatsApp/email product identity and URL', 'design filtering, search, empty state and sorting', 'sample category flow and unavailable old ring ID', 'home links and noindex', 'desktop and 375px mobile layouts'] };
    fs.writeFileSync(path.join(out, prefix + '-verification.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify(result));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
