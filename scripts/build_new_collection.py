"""Export approved collection art and merge enquiry-only records into the preview.

Run after the earlier category builders. The original PNG masters live in the
ignored output folder; this script verifies their manifests before exporting.
"""
import hashlib
import json
import re
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MASTERS = ROOT / 'output/catalogue-images'
CONTENT = ROOT / 'catalog/new-collection.content.json'
CATALOGUE = ROOT / 'catalog/products.sample.json'
VIEWS = [('primary', '01-hero.png', 'Hero view'),
         ('alternate', '02-alternate.png', 'Alternate view'),
         ('detail', '03-worn.png', 'Worn view')]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def export(master_dir, target_dir, filename):
    manifest = json.loads((master_dir / 'manifest.json').read_text())
    if manifest['status'] not in {'approved', 'approved-local', 'approved_by_user'}:
        raise ValueError(f'Unapproved source: {master_dir}')
    source = master_dir / filename
    asset = manifest['assets'][filename]
    if digest(source) != asset['sha256'] or asset['pixels'] != [1254, 1254]:
        raise ValueError(f'Master integrity failed: {source}')
    target = target_dir / source.with_suffix('.webp').name
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        if image.format != 'PNG' or image.size != (1254, 1254):
            raise ValueError(f'Unexpected image format or size: {source}')
        image.convert('RGB').save(target, 'WEBP', quality=90, method=6)
    return target.relative_to(ROOT).as_posix(), {
        'source': source.relative_to(ROOT).as_posix(), 'masterSha256': asset['sha256'],
        'export': target.relative_to(ROOT).as_posix(), 'exportSha256': digest(target)
    }


def triplet(source_dir, target_dir, name, worn_label):
    images, gallery, media = {}, [], []
    for key, filename, label in VIEWS:
        path, item = export(source_dir, target_dir, filename)
        images[key] = path
        gallery.append({'key': key, 'label': worn_label if key == 'detail' else label,
                        'alt': name + (' — illustrative styling on the body' if key == 'detail'
                                       else ' — illustrated ' + label.lower())})
        media.append(item)
    images['onBody'] = images['detail']
    return images, gallery, media


def details_for(row):
    category = row['category']
    fit = {
        'Chains': ('Finished length, link width and clasp are confirmed on enquiry.',
                   'Clasp design and operation require confirmation.'),
        'Cufflinks': ('Face dimensions and shirt-cuff fit are confirmed on enquiry.',
                      'Reverse fastening and whether supplied singly or as a pair require confirmation.'),
        'Accessories': ('Finished dimensions and fit with your band or frames are confirmed on enquiry.',
                        'Attachment method and compatibility require confirmation.'),
    }
    dimensions, fastening = fit[category]
    return {'design': row['design'], 'finish': row['finish'],
            'composition': 'Metal, accent materials and any karat options are confirmed on enquiry.',
            'dimensions': dimensions, 'fastening': fastening,
            'weight': 'Confirmed for the finished piece.'}


def main():
    rows = json.loads(CONTENT.read_text())
    if len(rows) != 13 or len({row['id'] for row in rows}) != 13:
        raise ValueError('Expected 13 distinct approved new product records')
    records, media_map = [], []
    for row in rows:
        source_dir = MASTERS / row['sourceDir']
        target_dir = ROOT / 'catalog/images' / row['category'].lower() / row['productKey']
        if row['productKey'] == 'custom-monogram-cufflinks':
            images, gallery, media = {}, [], []
            for variant, prefix, title in [('script-monogram', '', 'Script'),
                                           ('serif-dn-monogram', 'dn', 'Serif DN'),
                                           ('angular-ng-monogram', 'ng', 'Angular NG')]:
                filenames = [name for _, name, _ in VIEWS] if variant != 'angular-ng-monogram' else ['03-worn.png']
                for index, filename in enumerate(filenames):
                    key = (['primary', 'alternate', 'detail'][index] if not prefix else
                           prefix + filename[:2].replace('01', 'Hero').replace('02', 'Alternate').replace('03', 'Worn'))
                    path, item = export(source_dir / 'variants' / variant, target_dir / variant, filename)
                    images[key] = path
                    label = title + ' — ' + {'01': 'hero', '02': 'alternate', '03': 'worn'}[filename[:2]]
                    gallery.append({'key': key, 'label': label, 'alt': row['name'] + ' — ' + label + ' illustration'})
                    media.append(item)
            images['onBody'] = images['detail']
        elif row['productKey'] in {'tennis-racket-charm', 'tennis-ball-charm'}:
            options, media = [], []
            for key, label in [('silver-beige', 'Silver tone / beige band'),
                               ('gold-black', 'Gold tone / black band')]:
                variant_images, _, variant_media = triplet(source_dir / 'variants' / key,
                    target_dir / key, row['name'], 'On band')
                options.append({'key': key, 'label': label, 'images': variant_images})
                media.extend(variant_media)
            images = options[0]['images']
            gallery = [{'key': key, 'label': label if key != 'detail' else 'On band',
                        'alt': row['name'] + ' — ' + label.lower() + ' illustration'}
                       for key, _, label in VIEWS]
        else:
            worn_label = {'Chains': 'On neck', 'Cufflinks': 'On cuff',
                          'Accessories': 'On frames'}[row['category']]
            images, gallery, media = triplet(source_dir, target_dir, row['name'], worn_label)
        category = row['category']
        fit = row.get('fitGuidance') or {
            'Cufflinks': 'Ask us to confirm the face dimensions, backing, and whether the design is supplied singly or as a pair. The on-cuff view illustrates styling and scale.',
            'Accessories': 'Ask us to confirm the finished dimensions, attachment and compatibility with your own band or frames. The worn view illustrates styling, not guaranteed fit.'
        }[category]
        record = {
            'id': row['id'], 'productKey': row['productKey'],
            'slug': re.sub(r'[^a-z0-9]+', '-', row['name'].lower()).strip('-'),
            'name': row['name'], 'category': category, 'catalogueStatus': 'enquiry',
            'sampleContent': False, 'pricingStatus': 'on_enquiry',
            'specificationStatus': 'confirm_on_enquiry',
            'shortDescription': row['shortDescription'], 'description': row['description'],
            'appearanceLabel': row['appearanceLabel'], 'designTags': row['designTags'],
            'weightGrams': None, 'sizeType': 'Fit', 'sizeOptions': [],
            'sizeHelpText': 'Ask us for fit guidance', 'variants': [],
            'fitGuidance': fit, 'details': details_for(row),
            'care': 'Store separately and wipe gently with a soft dry cloth. Ask for care instructions suited to the confirmed materials and finish.',
            'images': images, 'mediaType': 'generated_illustration',
            'gallery': gallery, 'galleryNote': row['galleryNote'],
            'imageStatus': 'Approved for website preview. Generated details and worn scale are illustrative.',
        }
        if row['productKey'] in {'tennis-racket-charm', 'tennis-ball-charm'}:
            record['visualOptions'] = options
        records.append(record)
        media_map.append({'id': row['id'], 'assets': media})

    catalogue = json.loads(CATALOGUE.read_text())
    existing = [product for product in catalogue['products']
                if product['category'] in {'Rings', 'Bracelets', 'Earrings', 'Kada'}]
    if len(existing) != 47:
        raise ValueError(f'Expected 47 existing approved listings, found {len(existing)}')
    catalogue['products'] = existing + records
    catalogue['categories'] = ['Rings', 'Bracelets', 'Earrings', 'Kada',
                               'Chains', 'Cufflinks', 'Accessories']
    catalogue['goldColours'] = []
    catalogue['karats'] = []
    catalogue['sampleContent'] = False
    catalogue['_readme'] = ('Enquiry-only design preview using approved generated product illustrations. '
                            'Photos of intended designs informed the images; hidden details and worn scale '
                            'may be interpreted. All materials, dimensions, prices, fit and availability '
                            'require confirmation for the finished piece.')
    CATALOGUE.write_text(json.dumps(catalogue, ensure_ascii=False, indent=2) + '\n')
    (ROOT / 'catalog/new-collection.media.json').write_text(json.dumps(media_map, ensure_ascii=False, indent=2) + '\n')
    print(f'Exported {len(records)} new listings and {sum(len(x["assets"]) for x in media_map)} selected views; '
          f'{len(catalogue["products"])} catalogue products.')


if __name__ == '__main__':
    main()
