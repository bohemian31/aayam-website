let ALL = [];

function paramsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return { category: params.get('category') || '', colour: params.get('colour') || '',
    karat: params.get('karat') || '', design: params.get('design') || '',
    sort: params.get('sort') || 'featured', q: params.get('q') || '' };
}

function normaliseFilters(state) {
  if (state.category === 'Rings') {
    state.colour = ''; state.karat = '';
    if (state.sort.startsWith('price-')) state.sort = 'featured';
  } else { state.design = ''; }
}

function pushParams(state) {
  const params = new URLSearchParams();
  ['category', 'colour', 'karat', 'design', 'sort', 'q'].forEach(key => {
    if (state[key] && !(key === 'sort' && state[key] === 'featured')) params.set(key, state[key]);
  });
  history.replaceState(null, '', 'all-jewellery.html' + (params.size ? '?' + params.toString() : ''));
}

function compareByPrice(a, b, descending) {
  const av = lowestVariant(a), bv = lowestVariant(b);
  // Unknown prices always follow priced samples, in either sort direction.
  if (!av && !bv) return 0;
  if (!av) return 1;
  if (!bv) return -1;
  return descending ? bv.priceINR - av.priceINR : av.priceINR - bv.priceINR;
}

function syncControls(state) {
  const rings = state.category === 'Rings';
  ['category', 'colour', 'karat', 'design', 'sort'].forEach(key => {
    document.getElementById(key === 'sort' ? 'sort' : 'filter-' + key).value = state[key];
  });
  document.getElementById('filter-colour').hidden = rings;
  document.getElementById('filter-karat').hidden = rings;
  document.getElementById('filter-design').hidden = !rings;
  document.getElementById('ring-intro').hidden = !rings;
  document.querySelectorAll('#sort option[value^="price-"]').forEach(option => { option.disabled = rings; });
}

function apply(state) {
  normaliseFilters(state);
  syncControls(state);
  let items = ALL.filter(product => {
    if (state.category && product.category !== state.category) return false;
    if ((state.colour || state.karat) && !product.variants.some(variant =>
      (!state.colour || variant.goldColour === state.colour) && (!state.karat || variant.karat === state.karat))) return false;
    if (state.design && !(product.designTags || []).includes(state.design)) return false;
    if (state.q) {
      const haystack = [product.name, product.id, product.category, product.shortDescription, product.description, ...(product.designTags || [])].join(' ').toLowerCase();
      if (!haystack.includes(state.q.toLowerCase())) return false;
    }
    return true;
  });
  if (state.sort === 'price-asc' || state.sort === 'price-desc') items = items.slice().sort((a, b) => compareByPrice(a, b, state.sort === 'price-desc'));
  if (state.sort === 'name-asc') items = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  renderGrid(document.getElementById('product-grid'), items);
  document.getElementById('result-count').textContent = state.q
    ? items.length + ' results for “' + state.q + '”'
    : items.length + (items.length === 1 ? ' piece' : ' pieces');
  document.getElementById('crumb-current').textContent = state.category || 'All Jewellery';
  document.title = (state.category || 'All Jewellery') + ' — The House of Aayam (Preview)';
  const chips = [];
  if (state.category) chips.push(['category', 'Category: ' + state.category]);
  if (state.colour) chips.push(['colour', 'Sample colour: ' + state.colour]);
  if (state.karat) chips.push(['karat', 'Sample karat: ' + state.karat]);
  if (state.design) chips.push(['design', 'Design: ' + state.design]);
  if (state.q) chips.push(['q', 'Search: ' + state.q]);
  const container = document.getElementById('active-filters');
  container.innerHTML = chips.map(([key, label]) => `<span class="chip">${escapeHtml(label)} <button data-clear="${key}" aria-label="Remove ${escapeHtml(key)} filter">×</button></span>`).join('') +
    (chips.length ? '<button class="clear-all" id="clear-all">Clear all</button>' : '');
  container.querySelectorAll('[data-clear]').forEach(button => button.addEventListener('click', () => {
    state[button.dataset.clear] = ''; apply(state); pushParams(state);
  }));
  const clear = document.getElementById('clear-all');
  if (clear) clear.addEventListener('click', () => {
    Object.assign(state, { category: '', colour: '', karat: '', design: '', sort: 'featured', q: '' });
    apply(state); pushParams(state);
  });
}

loadCatalog().then(data => {
  ALL = data.products;
  const fill = (id, values) => values.forEach(value => document.getElementById(id).insertAdjacentHTML('beforeend', `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`));
  fill('filter-category', data.categories);
  fill('filter-colour', data.goldColours);
  fill('filter-karat', data.karats);
  fill('filter-design', [...new Set(ALL.filter(p => p.category === 'Rings').flatMap(p => p.designTags || []))].sort());
  const state = paramsFromUrl();
  ['category', 'colour', 'karat', 'design', 'sort'].forEach(key => {
    const select = document.getElementById(key === 'sort' ? 'sort' : 'filter-' + key);
    if (![...select.options].some(option => option.value === state[key])) state[key] = key === 'sort' ? 'featured' : '';
  });
  apply(state); pushParams(state);
  ['category', 'colour', 'karat', 'design', 'sort'].forEach(key => {
    document.getElementById(key === 'sort' ? 'sort' : 'filter-' + key).addEventListener('change', event => {
      state[key] = event.target.value; apply(state); pushParams(state);
    });
  });
}).catch(error => {
  document.getElementById('product-grid').innerHTML = '<p style="padding:24px">' + escapeHtml(error.message) + '</p>';
});
