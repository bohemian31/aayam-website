"""Build the approved enquiry catalogue as a domain-root static site.

The source GitHub Pages preview remains unchanged. Drag the generated `dist/`
folder into the existing Netlify site's manual deploy area after review.
"""
import hashlib
import json
import re
import shutil
from pathlib import Path
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'preview'
DEST = ROOT / 'dist'
CATALOGUE = ROOT / 'catalog/products.sample.json'
DOMAIN = 'https://thehouseofaayam.com'
WHATSAPP_DIGITS = '919429432142'
WHATSAPP_DISPLAY = '+91 94294 32142'
PAGES = ['index.html', 'all-jewellery.html', 'product.html',
         'our-story.html', 'materials-care.html', 'contact.html']
SCRIPTS = ['catalog.js', 'collection.js', 'product-gallery.js']
DESCRIPTIONS = {
    'index.html': 'The House of Aayam creates considered fine jewellery for men. Explore rings, bracelets, earrings, kada, chains, cufflinks and accessories.',
    'all-jewellery.html': 'Explore illustrated jewellery designs for men from The House of Aayam. Ask us about materials, fit, pricing and availability.',
    'our-story.html': 'The House of Aayam explores jewellery as an everyday expression of personal style for men.',
    'materials-care.html': 'A guide to jewellery colour, gold karat, fit and care from The House of Aayam.',
    'contact.html': 'Contact The House of Aayam about a jewellery design, its fit, materials, price or availability.',
}


def save(destination, content):
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(content, encoding='utf-8')


def html_for_live(name):
    html = (SOURCE / name).read_text(encoding='utf-8')
    html = re.sub(r'^<meta name="robots" content="noindex">\n', '', html, flags=re.M)
    html = re.sub(r'^<div class="preview-notice">.*?</div>\n', '', html, flags=re.M)
    html = html.replace('../assets/', 'assets/').replace('../catalog/', 'catalog/')
    html = html.replace(' (Draft Preview)', '').replace(' (Preview)', '')
    html = html.replace('Catalogue design preview — details on enquiry', 'Materials, fit and prices on enquiry')
    html = html.replace('Explore the preview collection', 'Explore the collection')
    html = html.replace('Browse the preview collection', 'Browse the collection')
    html = html.replace('preview link', 'product link')
    html = html.replace('This is general guidance for a design preview.', 'This is general guidance.')
    html = html.replace('This piece is not in the current preview.', 'This piece is not in the current collection.')
    html = html.replace('Piece unavailable in this preview', 'Piece unavailable in this collection')
    html = html.replace('Demo number for this public preview. Confirm the final business contact before using it to place an order.',
                        'Ask us about the finished details and ordering before you decide.')
    html = html.replace('https://wa.me/917265000916', f'https://wa.me/{WHATSAPP_DIGITS}')
    html = html.replace('+91 72650 00916 (demo)', WHATSAPP_DISPLAY)
    html = html.replace('+91 72650 00916', WHATSAPP_DISPLAY)
    if name != 'product.html':
        if '<meta name="description"' not in html:
            html = html.replace('<meta name="viewport" content="width=device-width, initial-scale=1">',
                                '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
                                f'<meta name="description" content="{escape(DESCRIPTIONS[name])}">')
        html = html.replace('</head>', f'<link rel="canonical" href="{DOMAIN}/{"" if name == "index.html" else name}">\n</head>')
    return html


def main():
    data = json.loads(CATALOGUE.read_text(encoding='utf-8'))
    if len(data['products']) != 60 or any(p['catalogueStatus'] != 'enquiry' for p in data['products']):
        raise ValueError('Expected the reviewed 60-product enquiry catalogue')
    if DEST.exists():
        shutil.rmtree(DEST)
    DEST.mkdir()

    for name in PAGES:
        save(DEST / name, html_for_live(name))
    shutil.copy2(SOURCE / 'styles.css', DEST / 'styles.css')
    for name in SCRIPTS:
        script = (SOURCE / name).read_text(encoding='utf-8')
        if name == 'catalog.js':
            script = script.replace("const CATALOG_URL = '../catalog/", "const CATALOG_URL = 'catalog/")
            script = script.replace("return path.replace(/^catalog\\//, '../catalog/');", "return path;")
            script = script.replace("const number = '917265000916';", f"const number = '{WHATSAPP_DIGITS}';")
        if name == 'collection.js':
            script = script.replace(' — The House of Aayam (Preview)', ' — The House of Aayam')
        if name == 'product-gallery.js':
            script = script.replace('<p class="support-line">WhatsApp currently uses the demo contact shown below.</p>',
                                    '<p class="support-line">Ask us to confirm the finished details of this piece.</p>')
        save(DEST / name, script)

    for name in ['campaign-neck.jpg', 'campaign-hand.jpg']:
        target = DEST / 'images' / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(SOURCE / 'images' / name, target)
    target = DEST / 'assets/logo.png'
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / 'assets/logo.png', target)

    # Export only referenced catalogue files; no source photos or rejected attempts.
    images = set()
    for product in data['products']:
        images.update(v for v in product['images'].values() if isinstance(v, str))
        for option in product.get('visualOptions', []):
            images.update(v for v in option['images'].values() if isinstance(v, str))
    for image in sorted(images):
        if not image.startswith('catalog/images/') or not image.endswith('.webp'):
            raise ValueError(f'Unexpected image path: {image}')
        source = ROOT / image
        if not source.is_file():
            raise FileNotFoundError(source)
        target = DEST / image
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
    save(DEST / 'catalog/products.sample.json', json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    save(DEST / 'robots.txt', 'User-agent: *\nAllow: /\nSitemap: ' + DOMAIN + '/sitemap.xml\n')
    urls = ['', 'all-jewellery.html', 'our-story.html', 'materials-care.html', 'contact.html']
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sitemap += ''.join('  <url><loc>' + escape(DOMAIN + '/' + url) + '</loc></url>\n' for url in urls)
    sitemap += '</urlset>\n'
    save(DEST / 'sitemap.xml', sitemap)

    all_files = sorted(p for p in DEST.rglob('*') if p.is_file())
    report = {'domain': DOMAIN, 'products': len(data['products']), 'catalogueImages': len(images),
              'files': len(all_files), 'bytes': sum(p.stat().st_size for p in all_files),
              'whatsapp': WHATSAPP_DISPLAY,
              'sha256': {p.relative_to(DEST).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in all_files}}
    save(ROOT / 'output/live-release-manifest.json', json.dumps(report, indent=2) + '\n')
    print(f'Built {DEST}: {report["products"]} products, {report["catalogueImages"]} unique catalogue images, '
          f'{report["files"]} files, {report["bytes"] / 1048576:.1f} MiB.')


if __name__ == '__main__':
    main()
