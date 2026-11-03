/* Check the country policy and the live bundle's consent behavior locally. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const source = fs.readFileSync(path.join(root, 'netlify/edge-functions/analytics-region.js'), 'utf8');

async function main() {
  const edge = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
  for (const code of ['AT', 'FR', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH']) {
    assert.equal(edge.analyticsMode(code), 'choice', code);
  }
  for (const code of ['IN', 'US', 'AU', 'JP']) {
    assert.equal(edge.analyticsMode(code), 'automatic', code);
  }
  for (const code of [undefined, '', '???']) {
    assert.equal(edge.analyticsMode(code), 'choice');
  }
  const unknownResponse = edge.default(null, { geo: {} });
  assert.equal((await unknownResponse.json()).mode, 'choice');
  assert.equal(unknownResponse.headers.get('Cache-Control'), 'no-store');

  const server = http.createServer((req, res) => {
    const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).slice(1) || 'index.html';
    const file = path.resolve(dist, name);
    if (!file.startsWith(dist + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404).end();
      return;
    }
    const type = file.endsWith('.js') ? 'application/javascript' : file.endsWith('.html') ? 'text/html' : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type }).end(fs.readFileSync(file));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch({ headless: true,
    ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
  try {
    for (const mode of ['choice', 'automatic', 'failed', 'delayed']) {
      const context = await browser.newContext();
      const page = await context.newPage();
      let gtmRequests = 0;
      let releaseRegion;
      const regionGate = new Promise(resolve => { releaseRegion = resolve; });
      await page.route('**/analytics-region', async route => {
        if (mode === 'failed') return route.abort();
        if (mode === 'delayed') await regionGate;
        return route.fulfill({ status: 200, contentType: 'application/json',
          body: JSON.stringify({ mode: mode === 'delayed' ? 'automatic' : mode }) });
      });
      await page.route('https://www.googletagmanager.com/gtm.js?*', route => {
        gtmRequests++;
        return route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
      });
      const initialGtm = mode === 'automatic'
        ? page.waitForResponse('https://www.googletagmanager.com/gtm.js?*') : null;
      await page.goto(mode === 'delayed' ? base + 'privacy.html' : base);
      if (mode === 'automatic') {
        await initialGtm;
        assert.equal(await page.locator('#analytics-consent').count(), 0);
        assert.equal(gtmRequests, 1);
        assert.equal(await page.evaluate(() => localStorage.getItem('aayam-analytics-consent-v1')), null);
        await page.goto(base + 'privacy.html');
        await page.getByRole('button', { name: 'Manage analytics' }).click();
        await page.getByRole('button', { name: 'Turn off analytics' }).click();
        await page.waitForLoadState('load');
        assert.equal(gtmRequests, 2); // The privacy page loaded before the visitor turned analytics off.
        await page.goto(base);
        assert.equal(gtmRequests, 2);
        assert.equal(await page.locator('#analytics-consent').count(), 0);
      } else if (mode === 'delayed') {
        await page.getByRole('button', { name: 'Manage analytics' }).click();
        const response = page.waitForResponse('**/analytics-region');
        releaseRegion();
        await response;
        await page.waitForTimeout(100);
        assert.equal(gtmRequests, 0);
        await page.getByRole('button', { name: 'Reject', exact: true }).click();
        assert.equal(gtmRequests, 0);
      } else {
        await page.locator('#analytics-consent').waitFor();
        assert.equal(gtmRequests, 0);
        if (mode === 'choice') {
          const acceptedGtm = page.waitForResponse('https://www.googletagmanager.com/gtm.js?*');
          await page.getByRole('button', { name: 'Accept analytics' }).click();
          await acceptedGtm;
          assert.equal(gtmRequests, 1);
          await page.reload();
          assert.equal(await page.locator('#analytics-consent').count(), 0);
        } else {
          await page.getByRole('button', { name: 'Reject', exact: true }).click();
          await page.reload();
          assert.equal(gtmRequests, 0);
          assert.equal(await page.locator('#analytics-consent').count(), 0);
        }
      }
      await context.close();
    }
    console.log('Regional analytics checks passed: policy, automatic mode, acceptance, lookup failure, saved rejection, privacy choice race.');
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
