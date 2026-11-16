/* The two homepage panels show the requested worn views, one at a time. */
const CAMPAIGN_IDS = {
  'first-collection': ['AYM-CH-101', 'AYM-RG-102', 'AYM-BR-106', 'AYM-RG-112'],
  'everyday-signatures': ['AYM-RG-106', 'AYM-AC-103', 'AYM-CL-105', 'AYM-BR-101']
};

function initCampaignRotators(products) {
  const byId = new Map(products.map(product => [product.id, product]));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-campaign]').forEach(panel => {
    const slides = (CAMPAIGN_IDS[panel.dataset.campaign] || [])
      .map(id => byId.get(id))
      .filter(product => product?.images?.onBody);
    if (slides.length < 2 || reduceMotion) return;

    const frame = panel.querySelector('.frame');
    const link = panel.querySelector('.campaign-image-link');
    let visible = frame.querySelector('.campaign-image');
    let hidden = document.createElement('img');
    hidden.className = 'campaign-image';
    hidden.alt = '';
    hidden.setAttribute('aria-hidden', 'true');
    hidden.decoding = 'async';
    frame.appendChild(hidden);
    let position = 0;
    let changing = false;

    async function advance() {
      if (changing || document.hidden) return;
      changing = true;
      const nextPosition = (position + 1) % slides.length;
      const product = slides[nextPosition];
      hidden.src = imageUrl(product.images.onBody);
      hidden.alt = `${product.name} worn view`;
      try {
        await hidden.decode();
        if (!frame.isConnected) return;
        hidden.removeAttribute('aria-hidden');
        visible.setAttribute('aria-hidden', 'true');
        hidden.classList.add('is-visible');
        visible.classList.remove('is-visible');
        link.href = productUrl(product);
        link.setAttribute('aria-label', `View ${product.name}`);
        [visible, hidden] = [hidden, visible];
        position = nextPosition;
      } catch { /* Keep the current photograph if the next one fails to load. */ }
      finally { changing = false; }
    }

    window.setInterval(advance, 6000);
  });
}
