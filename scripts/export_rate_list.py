#!/usr/bin/env python3
import os
import re
import csv
import html
import zipfile

# 1. Parse PRODUCT_PRICES from src/data/product-prices.ts
with open('src/data/product-prices.ts') as f:
    price_content = f.read()

prices = {}
pattern = r"['\"]([a-z0-9-]+)['\"]\s*:\s*\{\s*low:\s*([0-9.]+),\s*high:\s*([0-9.]+),\s*unit:\s*['\"]([^'\"]+)['\"]\s*\}"
for m in re.finditer(pattern, price_content):
    slug, low, high, unit = m.groups()
    prices[slug] = {
        'low': int(float(low)),
        'high': int(float(high)),
        'unit': unit
    }

# 2. Parse Granite Products from src/data/granite-products.ts
with open('src/data/granite-products.ts') as f:
    granite_content = f.read()

# 3. Parse Marble Products from src/data/marble-products.ts
with open('src/data/marble-products.ts') as f:
    marble_content = f.read()

# 4. Parse Collections Products from src/lib/product-data.ts
with open('src/lib/product-data.ts') as f:
    collection_content = f.read()

def parse_objects(content):
    objs = []
    # Find slug occurrences
    slug_matches = list(re.finditer(r"slug:\s*['\"]([a-z0-9-]+)['\"]", content))
    for i, sm in enumerate(slug_matches):
        start = sm.start()
        end = slug_matches[i+1].start() if i+1 < len(slug_matches) else len(content)
        chunk = content[start:end]
        
        slug = sm.group(1)
        name_m = re.search(r"name:\s*['\"]([^'\"]+)['\"]", chunk)
        name = name_m.group(1) if name_m else slug.replace('-', ' ').title()
        
        alt_m = re.search(r"altNames:\s*\[(.*?)\]", chunk)
        alt_names = ""
        if alt_m:
            alts = re.findall(r"['\"]([^'\"]+)['\"]", alt_m.group(1))
            alt_names = ", ".join(alts)
            
        cat_m = re.search(r"(?:category|type):\s*['\"]([^'\"]+)['\"]", chunk)
        category = cat_m.group(1) if cat_m else "granite"
        
        origin_m = re.search(r"origin:\s*['\"]([^'\"]+)['\"]", chunk)
        origin = origin_m.group(1) if origin_m else "India"
        
        color_m = re.search(r"colorFamily:\s*\[(.*?)\]", chunk)
        colors = ""
        if color_m:
            cols = re.findall(r"['\"]([^'\"]+)['\"]", color_m.group(1))
            colors = ", ".join(cols).title()
            
        thick_m = re.search(r"thickness:\s*['\"]([^'\"]+)['\"]", chunk)
        thickness = thick_m.group(1) if thick_m else "18–20 mm"
        
        finishes_m = re.search(r"finishesAvailable:\s*\[(.*?)\]", chunk)
        if finishes_m:
            fins = re.findall(r"['\"]([^'\"]+)['\"]", finishes_m.group(1))
            finishes = ", ".join([f.title() for f in fins])
        else:
            finishes = "Polished, Honed, Flamed, Leather"
            
        apps_m = re.search(r"applications:\s*\[(.*?)\]", chunk)
        if apps_m:
            apps = re.findall(r"['\"]([^'\"]+)['\"]", apps_m.group(1))
            apps_str = ", ".join([a.replace('-', ' ').title() for a in apps])
        else:
            apps_str = "Flooring, Kitchen Countertops, Wall Cladding"
            
        objs.append({
            'slug': slug,
            'name': name,
            'alt_names': alt_names,
            'category': category,
            'origin': origin,
            'colors': colors,
            'thickness': thickness,
            'finishes': finishes,
            'applications': apps_str
        })
    return objs

granite_objs = parse_objects(granite_content)
marble_objs = parse_objects(marble_content)
collection_objs = parse_objects(collection_content)

# Merge all products
all_products = []
seen = set()

# Process granite
for p in granite_objs:
    if p['slug'] in seen: continue
    seen.add(p['slug'])
    p['display_cat'] = 'Granite'
    p['url'] = f"https://granitegalleryindia.com/granite/{p['slug']}"
    all_products.append(p)

# Process marble
for p in marble_objs:
    if p['slug'] in seen: continue
    seen.add(p['slug'])
    p['display_cat'] = 'Imported Marble' if p['category'] == 'imported-marble' else 'Indian Marble'
    p['url'] = f"https://granitegalleryindia.com/marble/{p['slug']}"
    all_products.append(p)

# Process collection
for p in collection_objs:
    if p['slug'] in seen: continue
    seen.add(p['slug'])
    t = p['category'].lower()
    if 'marble' in t:
        p['display_cat'] = 'Imported Marble'
    elif 'granite' in t:
        p['display_cat'] = 'Granite'
    elif 'sandstone' in t:
        p['display_cat'] = 'Sandstone'
    elif 'limestone' in t:
        p['display_cat'] = 'Limestone'
    elif 'slate' in t:
        p['display_cat'] = 'Slate'
    elif 'quartzite' in t:
        p['display_cat'] = 'Quartzite'
    elif 'onyx' in t:
        p['display_cat'] = 'Onyx'
    else:
        p['display_cat'] = t.title()
    p['url'] = f"https://granitegalleryindia.com/collections/{p['category']}/{p['slug']}"
    all_products.append(p)

# Add any price slugs that weren't captured in the regexes
for slug, pr in prices.items():
    if slug not in seen:
        seen.add(slug)
        cat = 'Granite'
        if 'marble' in slug: cat = 'Marble'
        elif 'sandstone' in slug: cat = 'Sandstone'
        elif 'limestone' in slug: cat = 'Limestone'
        elif 'slate' in slug: cat = 'Slate'
        elif 'quartzite' in slug: cat = 'Quartzite'
        elif 'onyx' in slug: cat = 'Onyx'
        
        all_products.append({
            'slug': slug,
            'name': slug.replace('-', ' ').title(),
            'alt_names': '',
            'category': cat.lower(),
            'display_cat': cat,
            'origin': 'Rajasthan / India',
            'colors': '',
            'thickness': '18–20 mm',
            'finishes': 'Polished, Honed, Flamed, Leather',
            'applications': 'Flooring, Kitchen Countertops, Wall Cladding',
            'url': f"https://granitegalleryindia.com/granite/{slug}"
        })

# Attach price details
for p in all_products:
    pr = prices.get(p['slug'], {'low': 60, 'high': 120, 'unit': 'sqft'})
    p['price_min'] = pr['low']
    p['price_max'] = pr['high']
    p['rate_range'] = f"₹{pr['low']} – ₹{pr['high']} / sq ft"
    p['unit'] = 'sq ft'
    p['basis'] = 'Ex-factory Kishangarh'

# Sort by Category, then Product Name
category_order = {
    'Granite': 1,
    'Indian Marble': 2,
    'Imported Marble': 3,
    'Marble': 4,
    'Sandstone': 5,
    'Limestone': 6,
    'Slate': 7,
    'Quartzite': 8,
    'Onyx': 9
}
all_products.sort(key=lambda x: (category_order.get(x['display_cat'], 99), x['name']))

# Write CSV
csv_file = 'Granite_Gallery_Product_Rate_List.csv'
headers = [
    'S.No.',
    'Product Name',
    'Alternative Trade Name',
    'Category',
    'Origin / Quarry',
    'Indicative Rate (₹ / sq ft)',
    'Min Rate (₹)',
    'Max Rate (₹)',
    'Unit',
    'Pricing Basis',
    'Standard Thickness',
    'Available Finishes',
    'Recommended Applications',
    'Product URL'
]

with open(csv_file, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    for idx, p in enumerate(all_products, 1):
        writer.writerow([
            idx,
            p['name'],
            p['alt_names'],
            p['display_cat'],
            p['origin'],
            p['rate_range'],
            p['price_min'],
            p['price_max'],
            p['unit'],
            p['basis'],
            p['thickness'],
            p['finishes'],
            p['applications'],
            p['url']
        ])

print(f"Generated CSV with {len(all_products)} products: {csv_file}")

# Write XLSX
xlsx_file = 'Granite_Gallery_Product_Rate_List.xlsx'

content_types = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
</Types>'''

rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>'''

wb_rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
</Relationships>'''

workbook = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Product Rates" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>'''

styles = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="3">
    <font><name val="Calibri"/><sz val="11"/></font>
    <font><b/><color rgb="FFFFFFFF"/><name val="Calibri"/><sz val="11"/></font>
    <font><b/><color rgb="FF8B4513"/><name val="Calibri"/><sz val="11"/></font>
  </fonts>
  <fills count="4">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF4B2E2B"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFDF8F5"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border>
      <left style="thin"><color rgb="FFD4C5B9"/></left>
      <right style="thin"><color rgb="FFD4C5B9"/></right>
      <top style="thin"><color rgb="FFD4C5B9"/></top>
      <bottom style="thin"><color rgb="FFD4C5B9"/></bottom>
    </border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="4">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
  </cellXfs>
</styleSheet>'''

all_strings = []
string_map = {}
def get_str_id(s):
    s = str(s)
    if s not in string_map:
        string_map[s] = len(all_strings)
        all_strings.append(s)
    return string_map[s]

def get_col_letter(col_idx):
    if col_idx <= 26:
        return chr(64 + col_idx)
    return chr(64 + (col_idx - 1) // 26) + chr(64 + ((col_idx - 1) % 26) + 1)

sheet_rows_xml = []

# Column widths definition
cols_xml = '''<cols>
  <col min="1" max="1" width="7" customWidth="1"/>
  <col min="2" max="2" width="28" customWidth="1"/>
  <col min="3" max="3" width="22" customWidth="1"/>
  <col min="4" max="4" width="18" customWidth="1"/>
  <col min="5" max="5" width="26" customWidth="1"/>
  <col min="6" max="6" width="25" customWidth="1"/>
  <col min="7" max="7" width="13" customWidth="1"/>
  <col min="8" max="8" width="13" customWidth="1"/>
  <col min="9" max="9" width="10" customWidth="1"/>
  <col min="10" max="10" width="25" customWidth="1"/>
  <col min="11" max="11" width="20" customWidth="1"/>
  <col min="12" max="12" width="30" customWidth="1"/>
  <col min="13" max="13" width="35" customWidth="1"/>
  <col min="14" max="14" width="45" customWidth="1"/>
</cols>'''

# Header Row (Row 1)
row_xml = ['<row r="1" ht="28" customHeight="1">']
for col_idx, h in enumerate(headers, 1):
    col_letter = get_col_letter(col_idx)
    sid = get_str_id(h)
    row_xml.append(f'<c r="{col_letter}1" t="s" s="1"><v>{sid}</v></c>')
row_xml.append('</row>')
sheet_rows_xml.append(''.join(row_xml))

# Data Rows
for r_idx, p in enumerate(all_products, 2):
    row_data = [
        r_idx - 1,
        p['name'],
        p['alt_names'],
        p['display_cat'],
        p['origin'],
        p['rate_range'],
        p['price_min'],
        p['price_max'],
        p['unit'],
        p['basis'],
        p['thickness'],
        p['finishes'],
        p['applications'],
        p['url']
    ]
    style_idx = 2 if (r_idx % 2 == 0) else 0
    row_xml = [f'<row r="{r_idx}" ht="20" customHeight="1">']
    for col_idx, val in enumerate(row_data, 1):
        col_letter = get_col_letter(col_idx)
        # Highlight price column
        cell_style = 2 if col_idx == 6 else (3 if (r_idx % 2 == 0) else 0)
        if isinstance(val, (int, float)):
            row_xml.append(f'<c r="{col_letter}{r_idx}" s="{cell_style}"><v>{val}</v></c>')
        else:
            sid = get_str_id(val)
            row_xml.append(f'<c r="{col_letter}{r_idx}" t="s" s="{cell_style}"><v>{sid}</v></c>')
    row_xml.append('</row>')
    sheet_rows_xml.append(''.join(row_xml))

sheet_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  {cols_xml}
  <sheetData>
    {''.join(sheet_rows_xml)}
  </sheetData>
</worksheet>'''

sst_items = [f'<si><t>{html.escape(s)}</t></si>' for s in all_strings]
sst_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="{len(all_strings)}" uniqueCount="{len(all_strings)}">
  {''.join(sst_items)}
</sst>'''

with zipfile.ZipFile(xlsx_file, 'w', zipfile.ZIP_DEFLATED) as z:
    z.writestr('[Content_Types].xml', content_types)
    z.writestr('_rels/.rels', rels)
    z.writestr('xl/_rels/workbook.xml.rels', wb_rels)
    z.writestr('xl/workbook.xml', workbook)
    z.writestr('xl/styles.xml', styles)
    z.writestr('xl/sharedStrings.xml', sst_xml)
    z.writestr('xl/worksheets/sheet1.xml', sheet_xml)

print(f"Generated XLSX: {xlsx_file}")

