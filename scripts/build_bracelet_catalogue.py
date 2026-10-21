"""Export approved bracelet masters and replace only bracelet catalogue records.

Run with Python and Pillow. No publishing or image-generation calls are made.
"""
import hashlib
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MASTERS = ROOT / 'output/catalogue-images/approved/bracelets'


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    content_rows = json.loads((ROOT / 'catalog/bracelets.content.json').read_text())
    records, media = [], []
    for index, content in enumerate(content_rows, start=101):
        key = content['productKey']
        master_dir = MASTERS / key
        manifest = json.loads((master_dir / 'manifest.json').read_text())
        if manifest['status'] != 'approved_by_user':
            raise ValueError(f'{key} is not approved')
        selected = {asset['file']: asset for asset in manifest['selectedAssets']}
        paths, assets = {}, []
        for role, filename in [('primary', '01-hero'), ('alternate', '02-detail'), ('detail', '03-worn')]:
            source = master_dir / (filename + '.png')
            if digest(source) != selected[source.name]['sha256']:
                raise ValueError(f'{source} differs from the approved selection')
            target = ROOT / 'catalog/images/bracelets' / key / (filename + '.webp')
            target.parent.mkdir(parents=True, exist_ok=True)
            with Image.open(source) as image:
                if image.size != (1254, 1254):
                    raise ValueError(f'{source} must be native square 1254 × 1254')
                image.convert('RGB').save(target, 'WEBP', quality=90, method=6)
                dimensions = list(image.size)
            paths[role] = target.relative_to(ROOT).as_posix()
            assets.append({'role': role, 'path': paths[role], 'dimensions': dimensions,
                           'approvedMasterSha256': digest(source), 'exportSha256': digest(target)})
        paths['onBody'] = paths['detail']
        product_id = f'AYM-BR-{index:03d}'
        records.append({
            'id': product_id, 'productKey': key,
            'slug': re.sub(r'[^a-z0-9]+', '-', content['name'].lower()).strip('-'),
            'name': content['name'], 'category': 'Bracelets', 'catalogueStatus': 'enquiry',
            'sampleContent': False, 'pricingStatus': 'on_enquiry', 'specificationStatus': 'confirm_on_enquiry',
            'shortDescription': content['shortDescription'], 'description': content['description'],
            'appearanceLabel': content['appearanceLabel'], 'designTags': content['designTags'],
            'weightGrams': None, 'sizeType': 'Wrist fit', 'sizeOptions': [],
            'sizeHelpText': 'Ask us for wrist sizing guidance', 'variants': [],
            'fitGuidance': 'Share your wrist measurement and whether you prefer a close or relaxed fit. We’ll confirm the bracelet length, fastening and any adjustment options. The worn image illustrates styling; it is not a measured fit guide.',
            'details': {
                'design': content['design'], 'finish': content['finish'],
                'composition': 'Materials, any accent details and any applicable karat options are confirmed on enquiry.',
                'dimensions': 'Band width, bracelet length and wrist fit are confirmed on enquiry.',
                'fastening': 'Confirm the final fastening and any adjustment options on enquiry.',
                'weight': 'Confirmed for the final piece and size.'
            },
            'care': 'Store separately and wipe gently with a soft dry cloth. Until the materials are confirmed, avoid soaking or using jewellery cleaners; ask us for care instructions suited to the piece.',
            'images': paths, 'mediaType': 'generated_illustration',
            'gallery': [
                {'key': 'primary', 'label': 'Hero view', 'alt': content['name'] + ' — illustrated hero view'},
                {'key': 'alternate', 'label': 'Detail view', 'alt': content['name'] + ' — illustrated diagonal design detail'},
                {'key': 'detail', 'label': 'On wrist', 'alt': content['name'] + ' — illustrative styling on a wrist'}
            ],
            'galleryNote': 'Generated product illustrations. Fine details, fastening and worn fit are indicative; confirm final specifications on enquiry.',
            'imageStatus': 'Approved for website preview use. Generated details, hidden construction and worn scale remain illustrative.'
        })
        media.append({'id': product_id, 'productKey': key, 'name': content['name'],
                      'mediaType': 'generated_illustration', 'assets': assets})
    catalogue_path = ROOT / 'catalog/products.sample.json'
    catalogue = json.loads(catalogue_path.read_text())
    old = catalogue['products']
    first = next(i for i, p in enumerate(old) if p['category'] == 'Bracelets')
    catalogue['products'] = [p for p in old[:first] if p['category'] != 'Bracelets'] + records + [p for p in old[first:] if p['category'] != 'Bracelets']
    catalogue['_readme'] = 'Mixed-stage preview: approved illustrated rings and bracelets use enquiry-only product specifications; chains and pendants retain reference photos and explicitly labelled sample facts. Generated details, unseen construction and worn fit are indicative, not verified physical specifications.'
    catalogue_path.write_text(json.dumps(catalogue, ensure_ascii=False, indent=2) + '\n')
    (ROOT / 'catalog/bracelets.media.json').write_text(json.dumps(media, ensure_ascii=False, indent=2) + '\n')
    print(f'Exported {len(records)} bracelets / {len(media) * 3} views; {len(catalogue["products"])} catalogue records.')


if __name__ == '__main__':
    main()
