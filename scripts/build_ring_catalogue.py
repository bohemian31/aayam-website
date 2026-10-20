"""Export locally approved ring masters and build enquiry-led catalogue records.

Run from any directory with Python and Pillow. This script never publishes files.
"""
import hashlib
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MASTERS = ROOT / 'output/catalogue-images/approved/rings'
COPY = json.loads((ROOT / 'catalog/rings.content.json').read_text())
CATALOGUE = ROOT / 'catalog/products.sample.json'


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    records, media = [], []
    for index, content in enumerate(COPY, start=101):
        key = content['productKey']
        master_dir = MASTERS / key
        manifest = json.loads((master_dir / 'manifest.json').read_text())
        if manifest['status'] != 'approved_by_user':
            raise ValueError(f'{key} is not approved')
        assets = []
        paths = {}
        for role, filename in [('primary', '01-hero'), ('alternate', '02-alternate'), ('detail', '03-worn')]:
            source = master_dir / (filename + '.png')
            target = ROOT / 'catalog/images/rings' / key / (filename + '.webp')
            target.parent.mkdir(parents=True, exist_ok=True)
            with Image.open(source) as image:
                if image.width != image.height:
                    raise ValueError(f'{source} must be square')
                image.convert('RGB').save(target, 'WEBP', quality=90, method=6)
                dimensions = list(image.size)
            paths[role] = target.relative_to(ROOT).as_posix()
            assets.append({'role': role, 'path': paths[role], 'dimensions': dimensions,
                           'approvedMasterSha256': digest(source), 'exportSha256': digest(target)})
        paths['onBody'] = paths['detail']
        product_id = f'AYM-RG-{index:03d}'
        record = {
            'id': product_id, 'productKey': key,
            'slug': re.sub(r'[^a-z0-9]+', '-', content['name'].lower()).strip('-'),
            'name': content['name'], 'category': 'Rings', 'catalogueStatus': 'enquiry',
            'sampleContent': False, 'pricingStatus': 'on_enquiry',
            'specificationStatus': 'confirm_on_enquiry',
            'shortDescription': content['shortDescription'], 'description': content['description'],
            'appearanceLabel': content['appearanceLabel'], 'designTags': content['designTags'],
            'weightGrams': None, 'sizeType': 'Ring size', 'sizeOptions': [],
            'sizeHelpText': 'Ask us for sizing guidance', 'variants': [],
            'details': {'design': content['design'], 'finish': content['finish'],
                        'composition': 'Materials, any inset details and karat options are confirmed on enquiry.',
                        'dimensions': 'Band dimensions and available sizes are confirmed on enquiry.',
                        'weight': 'Confirmed for the final piece and size.'},
            'care': 'Keep the piece separate from other jewellery and wipe gently with a soft dry cloth. Ask us for care instructions suited to its confirmed materials and finish.',
            'images': paths, 'mediaType': 'generated_illustration',
            'gallery': [
                {'key': 'primary', 'label': 'Hero view', 'alt': content['name'] + ' — illustrated hero view'},
                {'key': 'alternate', 'label': 'Alternate view', 'alt': content['name'] + ' — illustrated alternate angle'},
                {'key': 'detail', 'label': 'On hand', 'alt': content['name'] + ' — illustrative styling on a hand'}
            ],
            'imageStatus': 'Approved generated product illustrations. Worn scale is indicative; final product details are confirmed on enquiry.'
        }
        records.append(record)
        media.append({'id': product_id, 'productKey': key, 'name': content['name'],
                      'mediaType': 'generated_illustration', 'assets': assets})
    catalogue = json.loads(CATALOGUE.read_text())
    catalogue['products'] = records + [p for p in catalogue['products'] if p['category'] != 'Rings']
    catalogue['_readme'] = 'Mixed-stage preview: 20 approved image-led ring designs with generated illustrations and enquiry-only specifications; other categories retain reference photos and explicitly labelled sample facts. No unverified numeric prices or product-specific material claims are supplied for rings.'
    CATALOGUE.write_text(json.dumps(catalogue, ensure_ascii=False, indent=2) + '\n')
    (ROOT / 'catalog/rings.media.json').write_text(json.dumps(media, ensure_ascii=False, indent=2) + '\n')
    print(f'Exported {len(records)} rings / {len(media) * 3} views; {len(catalogue["products"])} catalogue records.')


if __name__ == '__main__':
    main()
