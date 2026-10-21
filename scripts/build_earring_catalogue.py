"""Export approved earring masters and add enquiry-led earring records to the preview.

The local PNG masters are required. This script checks their approved hashes, then
exports only selected views; Rion intentionally has no alternate image.
"""
import hashlib
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MASTERS = ROOT / 'output/catalogue-images/approved/earrings'
CONTENT = ROOT / 'catalog/earrings.content.json'
CATALOGUE = ROOT / 'catalog/products.sample.json'
ROLES = [('primary', 'hero', '01-hero.png', '01-hero.webp', 'Hero view'),
         ('alternate', 'alternate', '02-alternate.png', '02-alternate.webp', 'Alternate view'),
         ('detail', 'worn', '03-worn.png', '03-worn.webp', 'On ear')]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    content_rows = json.loads(CONTENT.read_text())
    if len(content_rows) != 13 or len({row['productKey'] for row in content_rows}) != 13:
        raise ValueError('Expected thirteen distinct approved earring designs')
    records, media = [], []
    for index, content in enumerate(content_rows, start=101):
        key = content['productKey']
        master_dir = MASTERS / key
        manifest = json.loads((master_dir / 'manifest.json').read_text())
        if manifest['status'] != 'approved_by_user':
            raise ValueError(f'{key} is not approved')
        selected = {asset['role']: asset for asset in manifest['selectedAssets']}
        expected_roles = {'hero', 'worn'} if key == 'small-warm-ball-stud' else {'hero', 'alternate', 'worn'}
        if set(selected) != expected_roles:
            raise ValueError(f'{key} selected roles differ from founder approval')
        paths, assets, gallery = {}, [], []
        for role, master_role, source_name, target_name, label in ROLES:
            if master_role not in expected_roles:
                continue
            source = master_dir / source_name
            if selected[master_role]['file'] != source_name or digest(source) != selected[master_role]['sha256']:
                raise ValueError(f'{source} differs from approved master')
            target = ROOT / 'catalog/images/earrings' / key / target_name
            target.parent.mkdir(parents=True, exist_ok=True)
            with Image.open(source) as image:
                if image.format != 'PNG' or image.size != (1254, 1254):
                    raise ValueError(f'{source} must be native 1254 × 1254 PNG')
                image.convert('RGB').save(target, 'WEBP', quality=90, method=6)
                dimensions = list(image.size)
            paths[role] = target.relative_to(ROOT).as_posix()
            alt = content['name'] + (' — illustrative styling on an ear' if role == 'detail' else ' — illustrated ' + label.lower())
            gallery.append({'key': role, 'label': label, 'alt': alt})
            assets.append({'role': role, 'path': paths[role], 'dimensions': dimensions,
                           'approvedMasterSha256': digest(source), 'exportSha256': digest(target)})
        paths['onBody'] = paths['detail']
        product_id = f'AYM-ER-{index:03d}'
        records.append({
            'id': product_id, 'productKey': key,
            'slug': re.sub(r'[^a-z0-9]+', '-', content['name'].lower()).strip('-'),
            'name': content['name'], 'category': 'Earrings', 'catalogueStatus': 'enquiry',
            'sampleContent': False, 'pricingStatus': 'on_enquiry', 'specificationStatus': 'confirm_on_enquiry',
            'shortDescription': content['shortDescription'], 'description': content['description'],
            'appearanceLabel': content['appearanceLabel'], 'designTags': content['designTags'],
            'weightGrams': None, 'sizeType': 'Ear fit', 'sizeOptions': [],
            'sizeHelpText': 'Ask us about dimensions and closure', 'variants': [],
            'fitGuidance': 'Ask us for the finished diameter or front size, fit on the lobe, and closure or backing before choosing. The on-ear image illustrates styling; it is not a measured fit guide.',
            'details': {
                'design': content['design'], 'finish': content['finish'],
                'composition': 'The metal, any accents and applicable karat options are confirmed on enquiry.',
                'dimensions': 'Diameter, front size, thickness and worn fit are confirmed on enquiry.',
                'fastening': 'Confirm the final closure or backing on enquiry; generated rear views are illustrative.',
                'weight': 'Confirmed for the finished piece.'
            },
            'care': 'Store separately and wipe gently with a soft dry cloth. Ask us for care instructions suited to the confirmed materials and finish.',
            'images': paths, 'mediaType': 'generated_illustration', 'gallery': gallery,
            'galleryNote': 'Generated product illustrations. Rear construction, closure and worn size are indicative; confirm final specifications and whether supplied singly or as a pair on enquiry.',
            'imageStatus': 'Approved for website preview use. Hidden construction and worn scale remain illustrative.'
        })
        media.append({'id': product_id, 'productKey': key, 'name': content['name'],
                      'mediaType': 'generated_illustration', 'assets': assets})
    catalogue = json.loads(CATALOGUE.read_text())
    existing = [product for product in catalogue['products'] if product['category'] != 'Earrings']
    first = next(i for i, product in enumerate(existing) if product['category'] == 'Chains')
    catalogue['products'] = existing[:first] + records + existing[first:]
    catalogue['categories'] = ['Rings', 'Bracelets', 'Earrings', 'Chains', 'Pendants']
    catalogue['_readme'] = 'Mixed-stage preview: approved illustrated rings, bracelets and earrings use enquiry-only specifications; chains and pendants retain reference photos and labelled sample facts. Generated details, unseen construction and worn fit are indicative, not verified physical specifications.'
    CATALOGUE.write_text(json.dumps(catalogue, ensure_ascii=False, indent=2) + '\n')
    (ROOT / 'catalog/earrings.media.json').write_text(json.dumps(media, ensure_ascii=False, indent=2) + '\n')
    print(f'Exported {len(records)} earrings / {sum(len(item["assets"]) for item in media)} views; {len(catalogue["products"])} catalogue records.')


if __name__ == '__main__':
    main()
