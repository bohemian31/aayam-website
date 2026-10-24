/* Shared helpers for the enquiry-led collection. */

const CATALOG_URL = '../catalog/products.sample.json?v=20261024-full-catalogue-1';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function imageUrl(path) { return path.replace(/^catalog\//, '../catalog/'); }
function isEnquiryProduct(product) { return product.catalogueStatus === 'enquiry'; }

async function loadCatalog() {
  const res = await fetch(CATALOG_URL);
  if (!res.ok) throw new Error('Could not load catalog/products.sample.json — is this running from a local server?');
  return res.json();
}

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function lowestVariant(product) {
  return product.variants.filter(v => Number.isFinite(v.priceINR)).reduce((a, b) => (!a || b.priceINR < a.priceINR ? b : a), null);
}

function priceLabel(product) {
  const prices = product.variants.map(v => v.priceINR).filter(Number.isFinite);
  if (!prices.length) return 'Price on enquiry';
  const min = Math.min(...prices);
  const distinct = new Set(prices).size;
  return distinct > 1 ? 'From ' + formatINR(min) : formatINR(min);
}

function materialLabel(variant) {
  if (!variant) return '';
  return variant.karat + ' ' + variant.goldColour + ' Gold';
}

function enquiryMessage(product, selection = {}) {
  const url = new URL(productUrl(product), window.location.href).href;
  if (isEnquiryProduct(product)) {
    const sizing = product.category === 'Bracelets' ? 'wrist sizing, length, fastening and adjustment options'
      : product.category === 'Kada' ? 'wrist sizing, inner opening, band width, fastening and any adjustment options'
      : product.category === 'Earrings' ? 'earring dimensions, closure or backing, and whether it is supplied singly or as a pair'
      : product.category === 'Chains' ? 'finished length, link width and clasp'
      : product.category === 'Cufflinks' ? 'face dimensions, backing, whether supplied singly or as a pair, and any personalisation options'
      : product.category === 'Accessories' ? 'dimensions, attachment and compatibility with my band or frames'
      : 'karat options, sizing';
    const option = selection.visualOption ? ` I'm looking at the ${selection.visualOption} illustration.` : '';
    return `Hello, I'm interested in ${product.name} (${product.id}).${option} Please share the price, materials, ${sizing}, weight and availability for this design. ${url}`;
  }
  const size = selection.size || 'I need guidance';
  return `Hello, I'm interested in ${product.name} (${product.id}). My sample selection is ${selection.goldColour}, ${selection.karat}, ${size}. Please confirm the actual materials, price, availability and ordering details. ${url}`;
}

function whatsAppLink(product, selection = {}) {
  const number = '917265000916';
  return 'https://wa.me/' + number + '?text=' + encodeURIComponent(enquiryMessage(product, selection));
}

function emailEnquiryLink(product, selection = {}) {
  return 'mailto:thehouseofaayam@gmail.com?subject=' + encodeURIComponent('Enquiry: ' + product.name + ' — ' + product.id) + '&body=' + encodeURIComponent(enquiryMessage(product, selection));
}

function productUrl(product) {
  return 'product.html?id=' + encodeURIComponent(product.id);
}

function categoryUrl(category) {
  return 'all-jewellery.html?category=' + encodeURIComponent(category);
}

function cardTemplate(product, { hoverWorn = false } = {}) {
  const v = lowestVariant(product);
  const enquiry = isEnquiryProduct(product);
  const name = escapeHtml(product.name);
  const worn = product.images.onBody || product.images.detail;
  const showWorn = hoverWorn && worn && worn !== product.images.primary &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  return `
    <a class="card" href="${productUrl(product)}">
      <div class="imgwrap">
        <img src="${imageUrl(product.images.primary)}" alt="${name}${enquiry ? ' — illustrated hero view' : ''}" loading="lazy" decoding="async" width="1254" height="1254">
        ${showWorn ? `<img class="card-worn" src="${imageUrl(worn)}" alt="" aria-hidden="true" loading="lazy" decoding="async" width="1254" height="1254">` : ''}
      </div>
      <div class="info">
        <p class="name">${name}</p>
        <p class="material">${enquiry ? escapeHtml(product.appearanceLabel) : 'Sample specification: ' + materialLabel(v)}</p>
        <p class="price">${enquiry ? priceLabel(product) : 'Sample price: ' + priceLabel(product)}</p>
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
  el.innerHTML = products.map(product => cardTemplate(product, { hoverWorn: el.id === 'product-grid' })).join('');
  el.querySelectorAll('.card-worn').forEach(image => {
    // Keep the hero visible until the replacement is decoded and ready to draw.
    const reveal = () => {
      if (!image.naturalWidth) return;
      image.decode().then(() => image.classList.add('is-ready')).catch(() => {});
    };
    image.addEventListener('load', reveal, { once: true });
    if (image.complete) reveal();
  });
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
