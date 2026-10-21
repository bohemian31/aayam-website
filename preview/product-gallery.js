function galleryViews(product) {
  return product.gallery || ['primary', 'alternate', 'detail'].map((key, i) => ({
    key, label: 'Reference position ' + (i + 1), alt: product.name + ' — reference photo'
  }));
}

function galleryTemplate(product) {
  const views = galleryViews(product);
  const illustrated = isEnquiryProduct(product);
  return `<div class="gallery">
    <div class="main"><img id="main-img" src="${imageUrl(product.images.primary)}" alt="${escapeHtml(views[0].alt)}" width="1254" height="1254" fetchpriority="high"></div>
    <div class="thumbs" role="group" aria-label="Product views">
      ${views.map((view, i) => `<button type="button" data-img="${view.key}" aria-label="View ${escapeHtml(view.label.toLowerCase())}" aria-pressed="${i === 0}"><img src="${imageUrl(product.images[view.key])}" alt="" loading="lazy" width="64" height="64"><span>${escapeHtml(view.label)}</span></button>`).join('')}
    </div>
    <p class="gallery-caption" id="gallery-caption" aria-live="polite">${escapeHtml(views[0].label)}</p>
    <p class="gallery-note">${illustrated ? escapeHtml(product.galleryNote || 'Generated product illustrations. Worn scale is indicative; final product details are confirmed on enquiry.') : 'One reference photo is repeated in all three gallery positions. Additional views are pending.'}</p>
  </div>`;
}

function initGallery(product) {
  const views = galleryViews(product);
  const buttons = document.querySelectorAll('.thumbs [data-img]');
  buttons.forEach(button => button.addEventListener('click', () => {
    const view = views.find(item => item.key === button.dataset.img);
    const main = document.getElementById('main-img');
    main.src = imageUrl(product.images[view.key]);
    main.alt = view.alt;
    document.getElementById('gallery-caption').textContent = view.label;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
}

function renderEnquiryProduct(product) {
  const e = escapeHtml;
  const ring = product.category === 'Rings';
  document.getElementById('page-title').textContent = product.name + ' — The House of Aayam';
  document.querySelector('meta[name="description"]').content = product.shortDescription + ' Enquire about materials, sizing and price at The House of Aayam.';
  document.getElementById('app').innerHTML = `
    <div class="product-detail">
      ${galleryTemplate(product)}
      <div class="product-info enquiry-product">
        <p class="product-crumbs"><a href="index.html">Home</a> / <a href="${categoryUrl(product.category)}">${e(product.category)}</a></p>
        <p class="product-reference">${e(product.id)}</p>
        <h1>${e(product.name)}</h1>
        <p class="variant-line">${e(product.appearanceLabel)}</p>
        <p class="product-intro">${e(product.shortDescription)}</p>
        <p class="price">Price on enquiry</p>
        <p class="enquiry-guidance">${ring ? 'We’ll confirm materials, karat options, ring size, weight and availability for your piece.' : 'We’ll confirm materials, wrist fit, fastening, weight and availability for your piece.'}</p>
        <a class="btn-primary" id="enquire-btn" href="${e(whatsAppLink(product))}" target="_blank" rel="noopener">Enquire about this piece</a>
        <a class="btn-secondary email-enquiry" href="${e(emailEnquiryLink(product))}">Enquire by email</a>
        <p class="support-line">WhatsApp currently uses the demo contact shown below.</p>
        <a class="text-link sizing-link" href="materials-care.html#fit">${ring ? 'Help with ring sizing' : 'Help with wrist sizing'}</a>
        <div class="product-sections">
          <details open><summary>Description</summary><p>${e(product.description)}</p></details>
          <details><summary>Design &amp; details</summary><dl>
            <dt>Design</dt><dd>${e(product.details.design)}</dd>
            <dt>Finish shown</dt><dd>${e(product.details.finish)}</dd>
            <dt>Materials &amp; karat</dt><dd>${e(product.details.composition)}</dd>
            <dt>Dimensions &amp; size</dt><dd>${e(product.details.dimensions)}</dd>
            ${product.details.fastening ? `<dt>Fastening &amp; adjustment</dt><dd>${e(product.details.fastening)}</dd>` : ''}
            <dt>Weight</dt><dd>${e(product.details.weight)}</dd>
          </dl></details>
          <details><summary>Fit &amp; care</summary><p>${e(product.fitGuidance || 'Ask us for sizing guidance before choosing your ring. The on-hand image is an illustration of styling and scale.')}</p><p>${e(product.care)}</p></details>
          <details><summary>Enquiries &amp; ordering</summary><p>Include the name or reference ${e(product.id)} when you get in touch. We’ll confirm the piece’s materials, specifications, price, availability and ordering steps before you decide.</p></details>
        </div>
      </div>
    </div>`;
  initGallery(product);
}
