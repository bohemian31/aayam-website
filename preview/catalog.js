/* Shared catalogue helpers for the reference-image preview. */

const CATALOG_URL = '../catalog/products.sample.json?v=20260929-2';

async function loadCatalog() {
  const res = await fetch(CATALOG_URL);
  if (!res.ok) throw new Error('Could not load catalog/products.sample.json — is this running from a local server?');
  return res.json();
}

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function lowestVariant(product) {
  return product.variants.reduce((a, b) => (a.priceINR <= b.priceINR ? a : b));
}

function priceLabel(product) {
  const prices = product.variants.map(v => v.priceINR);
  const min = Math.min(...prices);
  const distinct = new Set(prices).size;
  return distinct > 1 ? 'From ' + formatINR(min) : formatINR(min);
}

function materialLabel(variant) {
  return variant.karat + ' ' + variant.goldColour + ' Gold';
}

function whatsAppLink(product, selection) {
  const number = '917265000916';
  const size = selection.size || 'I need guidance';
  const url = window.location.origin + window.location.pathname + '?id=' + product.id;
  const text = `Hello, I'm interested in ${product.name} (${product.id}). My selection is ${selection.goldColour}, ${selection.karat}, ${size}. Please share availability and ordering details. ${url}`;
  return 'https://wa.me/' + number + '?text=' + encodeURIComponent(text);
}

function productUrl(product) {
  return 'product.html?id=' + encodeURIComponent(product.id);
}

function categoryUrl(category) {
  return 'all-jewellery.html?category=' + encodeURIComponent(category);
}

function cardTemplate(product) {
  const v = lowestVariant(product);
  return `
    <a class="card" href="${productUrl(product)}">
      <div class="imgwrap"><img src="${product.images.primary.replace('catalog/', '../catalog/')}" alt="${product.name}" loading="lazy"></div>
      <div class="info">
        <p class="name">${product.name}</p>
        <p class="material">Sample specification: ${materialLabel(v)}</p>
        <p class="price">Sample price: ${priceLabel(product)}</p>
      </div>
    </a>`;
}

function renderGrid(el, products) {
  if (!products.length) {
    el.innerHTML = `
      <div class="empty-state">
        <h3>No pieces match these choices.</h3>
        <p>Try another combination or clear your filters to see the full collection.</p>
      </div>`;
    return;
  }
  el.innerHTML = products.map(cardTemplate).join('');
}

/* Mobile drawer + search wiring shared by every page */
function initChrome() {
  const menuBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const backdrop = document.querySelector('.drawer-backdrop');
  function openDrawer() { document.body.classList.add('drawer-open'); }
  function closeDrawer() { document.body.classList.remove('drawer-open'); }
  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  document.querySelectorAll('form[data-search]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = form.querySelector('input').value.trim();
      window.location.href = 'all-jewellery.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
  });
}

document.addEventListener('DOMContentLoaded', initChrome);
