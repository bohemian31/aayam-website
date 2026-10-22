/* Browser checks for enquiry-led rings/bracelets/earrings/Kada and remaining sample categories.
 * Optional argument: existing GitHub Pages preview base URL.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const catalogue = JSON.parse(fs.readFileSync(path.join(root, 'catalog/products.sample.json')));
const illustrated = catalogue.products.filter(p => p.catalogueStatus === 'enquiry');
const bracelets = illustrated.filter(p => p.category === 'Bracelets');
const rings = illustrated.filter(p => p.category === 'Rings');
const earrings = illustrated.filter(p => p.category === 'Earrings');
const kada = illustrated.filter(p => p.category === 'Kada');
const total = catalogue.products.length;
const base = process.argv[2] || 'http://127.0.0.1:8123/preview/';
const prefix = base.startsWith('https:') ? 'deployed' : 'local';
const out = path.join(root, 'output/catalogue-images/integration-review/kada');
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const go = relative => page.goto(new URL(relative, base).href);
    const count = n => page.waitForFunction(n => document.querySelectorAll('#product-grid .card').length === n, n);
    const fit = async () => assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow');
    const galleryLoaded = expected => page.waitForFunction(expected => {
      const img = document.getElementById('main-img');
      return img?.complete && img.naturalWidth === 1254 && img.getAttribute('src').endsWith(expected);
    }, expected);
    const loadCards = () => page.evaluate(async () => {
      const images = [...document.querySelectorAll('.card img')];
      images.forEach(img => { img.loading = 'eager'; });
      await Promise.all(images.map(img => img.decode()));
    });
    const served = await context.request.get(new URL('../catalog/products.sample.json?v=verify-' + Date.now(), base).href);
    assert.equal(served.status(), 200);
    assert.deepEqual(await served.json(), catalogue, 'Served catalogue differs from checked source');
    assert.equal(bracelets.length, 9);
    assert.equal(earrings.length, 13);
    assert.equal(kada.length, 5);
    assert.equal(new Set(catalogue.products.map(p => p.id)).size, total);

    for (const [category, products, tag] of [['Rings', rings, 'Inlay'], ['Bracelets', bracelets, 'Woven texture'], ['Earrings', earrings, 'Hoops'], ['Kada', kada, 'Open cuff']]) {
      await go('all-jewellery.html?category=' + category + '&karat=18K&sort=price-asc');
      await count(products.length); await fit();
      assert(await page.locator('#filter-karat').isHidden());
      assert(await page.locator('#filter-colour').isHidden());
      assert(await page.locator('#filter-design').isVisible());
      assert.equal(await page.locator('#collection-intro h1').textContent(), category);
      assert(!new URL(page.url()).searchParams.has('karat'));
      assert.equal(await page.locator('.card .price').first().textContent(), 'Price on enquiry');
      await page.locator('#filter-design').selectOption(tag);
      await count(products.filter(p => p.designTags.includes(tag)).length);
      await page.locator('#filter-category').selectOption('Chains'); await count(10);
      assert(await page.locator('#filter-karat').isVisible());
      assert(await page.locator('#filter-design').isHidden());
      assert(!new URL(page.url()).searchParams.has('design'));
    }
    await go('all-jewellery.html?category=Bracelets&design=Cord'); await count(1);
    assert((await page.locator('.card .name').textContent()).includes('Ansh'));
    await go('all-jewellery.html?q=indigo'); await count(1);
    await go('all-jewellery.html?q=no-such-piece-xx'); await page.locator('.empty-state').waitFor();
    await page.locator('#clear-all').click(); await count(total);
    for (const sort of ['price-asc', 'price-desc']) {
      await page.locator('#sort').selectOption(sort);
      await count(total);
      const labels = await page.locator('.card .price').allTextContents();
      assert(labels.slice(-illustrated.length).every(label => label === 'Price on enquiry'));
    }
    await go('all-jewellery.html?category=Bracelets&sort=name-asc'); await count(9);
    const names = await page.locator('.card .name').allTextContents();
    assert.deepEqual(names, bracelets.map(p => p.name).sort((a, b) => a.localeCompare(b)));

    // Verify the actual opacity transition, including return, keyboard and reduced motion.
    for (const category of ['Bracelets', 'Earrings', 'Kada', '']) {
      await go('all-jewellery.html' + (category ? '?category=' + category : '')); await count(category === 'Bracelets' ? 9 : category === 'Earrings' ? 13 : category === 'Kada' ? 5 : total); await loadCards();
      const target = category === 'Earrings' ? earrings[0] : category === 'Kada' ? kada[0] : bracelets[0];
      const card = page.locator('.card').filter({ hasText: target.name });
      const overlay = card.locator('.card-worn');
      await overlay.waitFor({ state: 'attached' });
      await page.waitForFunction(id => document.querySelector(`.card[href="product.html?id=${id}"] .card-worn`)?.classList.contains('is-ready'), target.id);
      assert((await overlay.getAttribute('src')).includes('03-worn.webp'));
      assert.equal(await overlay.evaluate(el => getComputedStyle(el).transitionDuration), '0.36s');
      await card.locator('.imgwrap').hover();
      await page.waitForFunction(id => getComputedStyle(document.querySelector(`.card[href="product.html?id=${id}"] .card-worn`)).opacity === '1', target.id);
      await page.mouse.move(0, 0);
      await page.waitForFunction(id => getComputedStyle(document.querySelector(`.card[href="product.html?id=${id}"] .card-worn`)).opacity === '0', target.id);
      await page.keyboard.press('Tab');
      await card.focus();
      await page.waitForFunction(id => getComputedStyle(document.querySelector(`.card[href="product.html?id=${id}"] .card-worn`)).opacity === '1', target.id);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      assert.equal(await overlay.evaluate(el => getComputedStyle(el).transitionDuration), '0s');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
    }
    await go('all-jewellery.html?category=Bracelets'); await count(9); await loadCards();
    await page.screenshot({ path: path.join(out, prefix + '-bracelets-desktop.png'), fullPage: true });
    await go('all-jewellery.html?category=Earrings'); await count(13); await loadCards();
    await page.screenshot({ path: path.join(out, prefix + '-earrings-desktop.png'), fullPage: true });
    await go('all-jewellery.html?category=Kada'); await count(5); await loadCards();
    await page.screenshot({ path: path.join(out, prefix + '-kada-desktop.png'), fullPage: true });
    await go('all-jewellery.html?category=Chains'); await count(10);
    assert.equal(await page.locator('.card-worn').count(), 0);

    for (const product of illustrated) {
      await go('product.html?id=' + product.id); await page.locator('h1').waitFor();
      assert.equal(await page.locator('h1').textContent(), product.name);
      assert.equal(await page.locator('.product-crumbs a').last().textContent(), product.category);
      const roles = product.gallery.map(view => view.key);
      assert.equal(await page.locator('.thumbs button').count(), roles.length);
      assert.equal(new Set(roles.map(role => product.images[role])).size, roles.length);
      for (const role of roles) {
        await page.locator(`[data-img="${role}"]`).click();
        await galleryLoaded(path.basename(product.images[role]));
        assert.equal(await page.locator(`[data-img="${role}"]`).getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('.thumbs button[aria-pressed="true"]').count(), 1);
      }
      const whatsapp = new URL(await page.locator('#enquire-btn').getAttribute('href'));
      const text = whatsapp.searchParams.get('text');
      assert(text.includes(product.name) && text.includes(product.id) && text.includes('product.html?id=' + product.id));
      assert(!text.includes('undefined') && !text.includes('null'));
      assert(whatsapp.pathname.includes('917265000916'));
      const email = new URL(await page.locator('.email-enquiry').getAttribute('href'));
      assert(email.searchParams.get('subject').includes(product.id));
      assert(email.searchParams.get('body').includes(product.name));
      assert.equal(await page.locator('#size-swatches, #karat-swatches, #colour-swatches').count(), 0);
      if (product.category === 'Bracelets') {
        assert(text.includes('fastening') && text.includes('wrist sizing'));
        assert.equal(await page.locator('.thumbs button span').allTextContents().then(x => x.join('|')), 'Hero view|Detail view|On wrist');
        assert((await page.locator('.sizing-link').textContent()).includes('wrist'));
        assert(!(await page.locator('.product-info').textContent()).includes('your ring'));
        assert((await page.locator('.gallery-note').textContent()).includes('fastening'));
      }
      if (product.category === 'Earrings') {
        assert(text.includes('closure or backing') && text.includes('singly or as a pair'));
        assert((await page.locator('.sizing-link').textContent()).includes('earring fit'));
        assert((await page.locator('.gallery-note').textContent()).includes('singly or as a pair'));
        assert(!(await page.locator('.product-info').textContent()).includes('wrist fit'));
      }
      if (product.category === 'Kada') {
        assert(text.includes('inner opening') && text.includes('wrist sizing'));
        assert((await page.locator('.sizing-link').textContent()).includes('wrist'));
        assert((await page.locator('.gallery-note').textContent()).includes('illustrative'));
        assert.equal(await page.locator('.thumbs button span').count(), 3);
        if (product.colourwayGroup) {
          assert.equal(await page.locator('.colourway-links a').count(), 2);
          assert.equal(await page.locator('.colourway-links a[aria-current="page"]').count(), 1);
          const other = product.colourways.find(option => option.id !== product.id);
          assert((await page.locator('.colourway-links a').filter({ hasText: other.label }).getAttribute('href')).includes(other.id));
        }
      }
      await fit();
    }
    for (const id of ['AYM-RG-001', 'AYM-BR-001', 'AYM-BR-008', 'unknown']) {
      await go('product.html?id=' + id); await page.locator('.product-missing').waitFor();
      assert.equal(await page.locator('.product-detail').count(), 0);
    }
    await go('product.html?id=AYM-CH-001'); await page.locator('#colour-swatches').waitFor();
    assert((await page.locator('.gallery-note').textContent()).includes('repeated'));
    await page.locator('#size-help-check').check();
    assert((await page.locator('#enquire-btn').getAttribute('href')).startsWith('https://wa.me/'));
    await go('index.html'); await page.locator('#featured-grid .card').first().waitFor();
    assert((await page.locator('.category-tile img').nth(1).getAttribute('src')).includes('/bracelets/'));
    assert((await page.locator('.category-tile img').nth(2).getAttribute('src')).includes('/earrings/'));
    assert((await page.locator('.category-tile img').nth(3).getAttribute('src')).includes('/kada/'));
    assert.equal(await page.locator('.category-tile').count(), 6);
    assert((await page.locator('#featured-grid .card').nth(1).getAttribute('href')).includes(bracelets[0].id));
    assert.equal(await page.locator('#featured-grid .card-worn').count(), 0);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex');
    await go('product.html?id=' + bracelets[5].id); await galleryLoaded('01-hero.webp');
    await page.locator('.product-sections details').nth(1).locator('summary').click();
    await page.screenshot({ path: path.join(out, prefix + '-bracelet-product-desktop.png'), fullPage: true });

    // Failed worn images must leave the hero usable.
    const failureContext = await browser.newContext();
    await failureContext.route('**/bracelets/textured-oval-link-bracelet/03-worn.webp', route => route.abort());
    const failurePage = await failureContext.newPage();
    await failurePage.goto(new URL('all-jewellery.html?category=Bracelets', base).href);
    const failedCard = failurePage.locator('.card').first(); await failedCard.waitFor();
    await failedCard.locator('.imgwrap').hover();
    await failurePage.waitForFunction(() => document.querySelector('.card img')?.naturalWidth === 1254);
    assert.equal(await failedCard.locator('.card-worn').evaluate(el => el.classList.contains('is-ready')), false);
    assert.equal(await failedCard.locator('.imgwrap img').first().evaluate(el => getComputedStyle(el).opacity), '1');
    await failureContext.close();

    const mobile = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
    const mp = await mobile.newPage(); mp.on('pageerror', error => errors.push(error.message));
    await mp.goto(new URL('all-jewellery.html?category=Bracelets', base).href);
    await mp.waitForFunction(() => document.querySelectorAll('#product-grid .card').length === 9);
    assert.equal(await mp.locator('.card-worn').count(), 0);
    assert(await mp.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await mp.evaluate(async () => { const images = [...document.querySelectorAll('.card img')]; images.forEach(img => { img.loading = 'eager'; }); await Promise.all(images.map(img => img.decode())); });
    await mp.screenshot({ path: path.join(out, prefix + '-bracelets-mobile.png'), fullPage: true });
    await mp.goto(new URL('all-jewellery.html?category=Earrings', base).href);
    await mp.waitForFunction(() => document.querySelectorAll('#product-grid .card').length === 13);
    assert.equal(await mp.locator('.card-worn').count(), 0);
    assert(await mp.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await mp.evaluate(async () => { const images = [...document.querySelectorAll('.card img')]; images.forEach(img => { img.loading = 'eager'; }); await Promise.all(images.map(img => img.decode())); });
    await mp.screenshot({ path: path.join(out, prefix + '-earrings-mobile.png'), fullPage: true });
    await mp.goto(new URL('all-jewellery.html?category=Kada', base).href);
    await mp.waitForFunction(() => document.querySelectorAll('#product-grid .card').length === 5);
    assert.equal(await mp.locator('.card-worn').count(), 0);
    assert(await mp.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await mp.evaluate(async () => { const images = [...document.querySelectorAll('.card img')]; images.forEach(img => { img.loading = 'eager'; }); await Promise.all(images.map(img => img.decode())); });
    await mp.screenshot({ path: path.join(out, prefix + '-kada-mobile.png'), fullPage: true });
    await mp.locator('[data-menu-open]').click();
    assert(await mp.locator('body').evaluate(el => el.classList.contains('drawer-open')));
    await mp.locator('[data-menu-close]').click();
    await mp.goto(new URL('product.html?id=' + bracelets[8].id, base).href);
    await mp.locator('[data-img="detail"]').click();
    await mp.waitForFunction(() => document.getElementById('main-img')?.naturalWidth === 1254 && document.getElementById('main-img').getAttribute('src').includes('03-worn'));
    assert(await mp.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await mp.screenshot({ path: path.join(out, prefix + '-bracelet-product-mobile.png'), fullPage: true });
    const rion = earrings.find(p => p.productKey === 'small-warm-ball-stud');
    await mp.goto(new URL('product.html?id=' + rion.id, base).href);
    await mp.locator('.thumbs button').first().waitFor();
    assert.equal(await mp.locator('.thumbs button').count(), 2);
    assert.equal(await mp.locator('[data-img="alternate"]').count(), 0);
    await mp.locator('[data-img="detail"]').click();
    await mp.waitForFunction(() => document.getElementById('main-img')?.naturalWidth === 1254 && document.getElementById('main-img').getAttribute('src').includes('03-worn'));
    assert(await mp.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await mp.screenshot({ path: path.join(out, prefix + '-rion-product-mobile.png'), fullPage: true });
    assert.deepEqual(errors, []);
    const result = { base, checkedAt: new Date().toISOString(), ringProducts: rings.length, braceletProducts: bracelets.length, earringProducts: earrings.length, kadaProducts: kada.length, distinctGalleryAssets: illustrated.reduce((n, p) => n + p.gallery.length, 0), catalogueProducts: total, result: 'passed', checks: ['47 enquiry product routes and 140 selected gallery views', 'Kada colourway links, fit guidance and enquiry identity', 'Category-specific design filters, search and sorting', '360ms hero-to-worn hover, keyboard focus and reduced motion', 'Missing worn-image fallback and sample-category hero', 'Old product IDs unavailable', 'Homepage tile and noindex', '375px touch layout and variable-view gallery'] };
    fs.writeFileSync(path.join(out, prefix + '-verification.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify(result));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
