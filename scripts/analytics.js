/* Production-only, region-aware analytics. The build replaces the GTM ID. */
(() => {
  'use strict';
  const CONSENT_KEY = 'aayam-analytics-consent-v1';
  const GTM_ID = '__GTM_ID__';
  const eventFields = ['item_id', 'item_name', 'item_category', 'item_list_name', 'items',
    'result_count', 'channel', 'image_position', 'option_name', 'filter_type', 'filter_value'];
  const watchedEvents = new Set();
  let enabled = false;
  let pageViewSent = false;
  let choiceRequested = false;

  function hasChoiceStorage() {
    try {
      const key = CONSENT_KEY + '-test';
      localStorage.setItem(key, '1');
      localStorage.removeItem(key);
      return true;
    } catch { return false; }
  }

  function storedChoice() {
    try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
  }
  function saveChoice(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch { /* session-only choice */ }
  }
  function safeUrl(value) {
    if (!value) return undefined;
    try {
      const url = new URL(value, location.href);
      if (url.origin !== location.origin) return url.origin + url.pathname;
      url.searchParams.delete('q');
      url.hash = '';
      return url.href;
    } catch { return undefined; }
  }
  function emit(name, details = {}) {
    if (!enabled) return;
    window.dataLayer.push(Object.fromEntries(eventFields.map(key => [key, undefined])));
    window.dataLayer.push({ event: 'aayam_event', analytics_event: name, ...details });
  }
  function pageView() {
    if (pageViewSent) return;
    pageViewSent = true;
    emit('page_view', {
      page_location: safeUrl(location.href),
      page_referrer: safeUrl(document.referrer),
      page_title: document.title
    });
  }
  function loadGtm() {
    if (enabled) return;
    enabled = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(GTM_ID);
    document.head.appendChild(script);
    inspectPage();
  }
  function setConsent(value) {
    saveChoice(value);
    document.getElementById('analytics-consent')?.remove();
    if (value === 'accepted') loadGtm();
    if (value === 'rejected' && enabled) location.reload();
  }
  function showChoice() {
    choiceRequested = true;
    document.getElementById('analytics-consent')?.remove();
    const box = document.createElement('aside');
    box.id = 'analytics-consent';
    box.setAttribute('aria-label', 'Analytics choice');
    box.innerHTML = enabled
      ? '<p>Analytics is currently on. You can turn it off in this browser. <a href="privacy.html">Privacy details</a></p><div><button type="button" data-consent="rejected">Turn off analytics</button><button type="button" data-consent="accepted">Keep analytics on</button></div>'
      : '<p>May we use analytics to understand which jewellery and pages visitors find useful? You can choose either way. <a href="privacy.html">Privacy details</a></p><div><button type="button" data-consent="rejected">Reject</button><button type="button" data-consent="accepted">Accept analytics</button></div>';
    box.addEventListener('click', event => {
      const value = event.target.closest('[data-consent]')?.dataset.consent;
      if (value) setConsent(value);
    });
    document.body.appendChild(box);
  }
  function productDetails(id) {
    const title = document.querySelector('.product-info h1')?.textContent?.trim();
    const category = document.querySelector('.product-crumbs a:nth-of-type(2)')?.textContent?.trim();
    return { item_id: id, item_name: title || undefined, item_category: category || undefined };
  }
  function inspectPage() {
    if (!enabled) return;
    const productPage = location.pathname.endsWith('/product.html');
    const collectionPage = location.pathname.endsWith('/all-jewellery.html');
    if ((!productPage || document.querySelector('.product-info, .product-missing')) &&
        (!collectionPage || document.getElementById('result-count')?.textContent?.trim())) pageView();
    const id = document.querySelector('.product-reference')?.textContent?.trim();
    if (id && !watchedEvents.has('product:' + id)) {
      watchedEvents.add('product:' + id);
      emit('view_item', { ...productDetails(id), items: [productDetails(id)] });
    }
    const grid = document.getElementById('product-grid');
    if (grid && (grid.querySelector('.card') || grid.querySelector('.empty-state'))) {
      const params = new URLSearchParams(location.search);
      const list = params.get('category') || 'All Jewellery';
      const cards = [...grid.querySelectorAll('.card')];
      const key = list + ':' + params.get('q') + ':' + cards.map(card => new URL(card.href).searchParams.get('id')).join(',');
      if (!watchedEvents.has('list:' + key)) {
        watchedEvents.add('list:' + key);
        emit('view_item_list', { item_list_name: list, result_count: cards.length,
          items: cards.map(card => ({ item_id: new URL(card.href).searchParams.get('id'), item_name: card.querySelector('.name')?.textContent?.trim() })) });
        if (params.has('q')) emit('search', { result_count: cards.length });
      }
    }
  }
  function contactChannel(anchor) {
    const href = anchor?.getAttribute('href') || '';
    if (href.startsWith('https://wa.me/')) return 'whatsapp';
    if (href.startsWith('mailto:')) return 'email';
    return null;
  }
  document.addEventListener('click', event => {
    if (!enabled) return;
    const anchor = event.target.closest('a');
    const id = document.querySelector('.product-reference')?.textContent?.trim();
    if (anchor?.matches('.card')) {
      const targetId = new URL(anchor.href).searchParams.get('id');
      const itemName = anchor.querySelector('.name')?.textContent?.trim();
      emit('select_item', { item_id: targetId, item_name: itemName, item_list_name: new URLSearchParams(location.search).get('category') || 'All Jewellery',
        items: [{ item_id: targetId, item_name: itemName }] });
    }
    const channel = contactChannel(anchor);
    if (channel && anchor?.matches('#enquire-btn, .email-enquiry')) {
      emit('enquiry_click', { ...productDetails(id), channel });
    } else if (channel && location.pathname.endsWith('/contact.html') && anchor.closest('.contact-options')) {
      emit('contact_click', { channel });
    }
    const gallery = event.target.closest('.thumbs [data-img]');
    if (gallery && id) emit('gallery_view', { item_id: id, image_position: gallery.dataset.img });
    const option = event.target.closest('#visual-options [data-option]');
    if (option && id) emit('option_select', { item_id: id, option_name: option.textContent.trim() });
  }, true);
  document.addEventListener('change', event => {
    if (!enabled || !event.target.matches('#filter-category, #filter-design, #filter-colour, #filter-karat, #sort')) return;
    emit('filter_use', { filter_type: event.target.id, filter_value: event.target.value || 'all' });
  }, true);
  new MutationObserver(inspectPage).observe(document.body, { childList: true, subtree: true });
  setTimeout(() => { if (enabled) pageView(); }, 2500);

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'analytics.css';
  document.head.appendChild(css);
  window.AayamAnalytics = { showChoice, safeUrl };
  // If a rejection cannot survive a reload, require a choice on each page.
  if (!hasChoiceStorage()) {
    showChoice();
    return;
  }
  const choice = storedChoice();
  if (choice === 'accepted') loadGtm();
  else if (choice !== 'rejected') {
    fetch('/analytics-region', { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error('Region lookup failed');
        return response.json();
      })
      .then(({ mode }) => {
        // The visitor may have made a choice while the lookup was in flight.
        if (choiceRequested) return;
        if (storedChoice() === 'rejected') return;
        if (storedChoice() === 'accepted' || mode === 'automatic') loadGtm();
        else showChoice(); // Unknown or failed-open responses require a choice.
      })
      .catch(() => { if (!storedChoice() && !choiceRequested) showChoice(); });
  }
})();
