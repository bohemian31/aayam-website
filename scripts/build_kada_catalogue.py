"""Validate approved Kada masters, export WebPs and add enquiry-only records.

The ignored approved PNGs must be present locally. This builder is idempotent and
changes only the Kada catalogue records and their exported media.
"""
import hashlib
import json
import re
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MASTERS = ROOT / 'output/catalogue-images/approved/kada'
CONTENT = ROOT / 'catalog/kada.content.json'
CATALOGUE = ROOT / 'catalog/products.sample.json'
EXPECTED_KEYS = [
    'gold-clasp-open-kada', 'silver-clasp-open-kada', 'tri-tone-hinged-kada',
    'engraved-scroll-kada', 'twin-line-open-kada',
]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    content_rows = json.loads(CONTENT.read_text())
    if [row['productKey'] for row in content_rows] != EXPECTED_KEYS:
        raise ValueError('Expected the five selected Kada colourways and designs in order')

    records, media = [], []
    for index, content in enumerate(content_rows, start=101):
        key = content['productKey']
        master_dir = MASTERS / key
        manifest = json.loads((master_dir / 'manifest.json').read_text())
        if manifest['status'] != 'approved_by_user':
            raise ValueError(f'{key} has not been approved')
        if manifest['sourceGroup'] != content['sourceGroup']:
            raise ValueError(f'{key} source group differs from content record')
        selected = manifest['selected']
        second_role = 'detail' if 'detail' in selected else 'alternate'
        if set(selected) != {'hero', second_role, 'worn'}:
            raise ValueError(f'{key} has an unexpected selected-view set')

        paths, assets, gallery = {}, [], []
        for role, master_role, label in [
            ('primary', 'hero', 'Hero view'),
            ('alternate', second_role, 'Detail view' if second_role == 'detail' else 'Alternate view'),
            ('detail', 'worn', 'On wrist'),
        ]:
            item = selected[master_role]
            source = master_dir / item['path']
            if source.suffix != '.png' or digest(source) != item['sha256']:
                raise ValueError(f'{source} differs from its approved master hash')
            target = ROOT / 'catalog/images/kada' / key / (source.stem + '.webp')
            target.parent.mkdir(parents=True, exist_ok=True)
            with Image.open(source) as image:
                if image.format != 'PNG' or image.size != (1254, 1254):
                    raise ValueError(f'{source} must be a native 1254 × 1254 PNG')
                image.convert('RGB').save(target, 'WEBP', quality=90, method=6)
                dimensions = list(image.size)
            paths[role] = target.relative_to(ROOT).as_posix()
            alt = content['name'] + (' — illustrative styling on a wrist' if role == 'detail'
                                     else ' — illustrated ' + label.lower())
            gallery.append({'key': role, 'label': label, 'alt': alt})
            assets.append({'role': role, 'path': paths[role], 'dimensions': dimensions,
                           'approvedMasterSha256': digest(source), 'exportSha256': digest(target)})
        paths['onBody'] = paths['detail']
        product_id = f'AYM-KD-{index:03d}'
        source_caveat = ('The source photograph shows two partly cropped pieces. '
                         'The completed oval, hidden construction and worn fit are illustrative.'
                         if content['sourceGroup'] == 'k1' else
                         'Unseen construction and worn fit are illustrative.')
        records.append({
            'id': product_id, 'productKey': key,
            'slug': re.sub(r'[^a-z0-9]+', '-', content['name'].lower()).strip('-'),
            'name': content['name'], 'category': 'Kada', 'catalogueStatus': 'enquiry',
            'sampleContent': False, 'pricingStatus': 'on_enquiry',
            'specificationStatus': 'confirm_on_enquiry',
            'shortDescription': content['shortDescription'], 'description': content['description'],
            'appearanceLabel': content['appearanceLabel'], 'designTags': content['designTags'],
            'weightGrams': None, 'sizeType': 'Wrist fit', 'sizeOptions': [],
            'sizeHelpText': 'Ask us for wrist sizing guidance', 'variants': [],
            'fitGuidance': 'Share your wrist measurement and whether you prefer a close or relaxed fit. '
                           'We’ll confirm the finished opening, band width and how this rigid kada sits on the wrist. '
                           'The worn image is a styling illustration, not a measured fit guide.',
            'details': {
                'design': content['design'], 'finish': content['finish'],
                'composition': 'Metal composition, accent materials and applicable karat options are confirmed on enquiry.',
                'dimensions': 'Inner opening, band width and wrist fit are confirmed on enquiry.',
                'fastening': 'Confirm whether and how this piece opens or adjusts before ordering; generated hidden views are illustrative.',
                'weight': 'Confirmed for the finished piece.'
            },
            'care': 'Store separately and wipe gently with a soft dry cloth. Ask us for care instructions suited to the confirmed materials and finish.',
            'images': paths, 'mediaType': 'generated_illustration', 'gallery': gallery,
            'galleryNote': 'Generated product illustrations. ' + source_caveat +
                           ' Confirm final metal, dimensions and fastening on enquiry.',
            'imageStatus': 'Approved for website preview use. Generated details and worn scale remain illustrative.',
            **({'colourwayGroup': content['colourwayGroup'],
                'colourwayLabel': content['colourwayLabel']} if 'colourwayGroup' in content else {}),
        })
        media.append({'id': product_id, 'productKey': key, 'name': content['name'],
                      'mediaType': 'generated_illustration', 'assets': assets})

    colourways = [row for row in records if row.get('colourwayGroup') == 'veyar-cutout-kada']
    if len(colourways) != 2:
        raise ValueError('Veyar requires gold- and silver-tone colourway records')
    for row in colourways:
        row['colourways'] = [{'id': option['id'], 'label': option['colourwayLabel']}
                              for option in colourways]

    catalogue = json.loads(CATALOGUE.read_text())
    existing = [product for product in catalogue['products'] if product['category'] != 'Kada']
    first = next(i for i, product in enumerate(existing) if product['category'] == 'Chains')
    catalogue['products'] = existing[:first] + records + existing[first:]
    catalogue['categories'] = ['Rings', 'Bracelets', 'Earrings', 'Kada', 'Chains', 'Pendants']
    catalogue['_readme'] = ('Mixed-stage preview: approved illustrated rings, bracelets, earrings and Kada '
                            'use enquiry-only specifications; chains and pendants retain reference photos '
                            'and labelled sample facts. Generated details, hidden construction and worn fit '
                            'are indicative, not verified physical specifications.')
    CATALOGUE.write_text(json.dumps(catalogue, ensure_ascii=False, indent=2) + '\n')
    (ROOT / 'catalog/kada.media.json').write_text(json.dumps(media, ensure_ascii=False, indent=2) + '\n')
    print(f'Exported {len(records)} Kada listings / {sum(len(item["assets"]) for item in media)} views; '
          f'{len(catalogue["products"])} catalogue records.')


if __name__ == '__main__':
    main()
