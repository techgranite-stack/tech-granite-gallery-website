# `/public/images` — hosted image assets

This is where **owned, optimized images live and are served from** (`https://<domain>/images/...`).
Drop client-supplied photography here following the structure below. Specs, ratios, and per-slot
counts are in [docs/IMAGE_REQUEST_BRIEF.md](../../docs/IMAGE_REQUEST_BRIEF.md); engineering rules in
[docs/IMAGE_STANDARDS.md](../../docs/IMAGE_STANDARDS.md); the slot tracker is
[docs/image-manifest.xlsx](../../docs/image-manifest.xlsx).

## Structure

```
images/
  home/
    hero/        home-hero-1-desktop.jpg, home-hero-1-mobile.jpg ...   (16:9 + 9:16)
    featured/    <product>-card.jpg                                    (16:9)
    banner/      contact-banner-bg.jpg                                 (decorative)
  stones/<stone-slug>/
    <slug>-hero-1-desktop.jpg / -mobile.jpg                            (16:9 + 9:16)
    <slug>-thumbnail.jpg                                               (16:9)
    gallery/     <slug>-gallery-1.jpg ...                              (5:7)
    finishes/    <slug>-finish-<finish>.jpg                            (square-ish)
    applications/<slug>-app-<application>.jpg                          (4:3)
  collections/<category>/                                             (collection LISTING page)
    <category>-cover.jpg, <category>-hero-desktop.jpg / -mobile.jpg    (16:9 + 9:16)
    panel/       <category>-panel-1.jpg ...                            (16:9)
  collections/<type>/<slug>/                                          (collection stone DETAIL page)
    <slug>-hero-desktop.jpg / <slug>-hero-mobile.jpg                   (16:9 + 9:16)
    <slug>-card.jpg                                                    (16:9 listing card)
    gallery/     <slug>-gallery-1.jpg ...                              (4:3)
    # e.g. collections/sandstone/jodhpur-sandstone/ ,
    #      collections/slate/himachal-slate/ , collections/porphyry/multi-porphyry/
  applications/<app-slug>/
    <app>-tile.jpg, <app>-hero-desktop.jpg / -mobile.jpg
    gallery/     <app>-1.jpg ...                                       (4:3)
  projects/<project-slug>/
    <project>-card.jpg, <project>-hero-desktop.jpg / -mobile.jpg
    gallery/     <project>-1.jpg ...                                   (16:10)
  team/          <person>.jpg                                          (1:1.1)
  blog/          <post-slug>.jpg                                       (16:9)
  finishes/      <finish>-hero-desktop.jpg / -mobile.jpg               (16:9 + 9:16)
  landing/       <slug>-hero-desktop.jpg / -mobile.jpg                 (16:9 + 9:16)
```

## Rules
- Filenames: **lowercase, hyphenated, descriptive** — match the `suggested_filename` column in the manifest.
- **Heroes need two files**: a `-desktop` (16:9) and a `-mobile` (9:16) master.
- Deliver **JPEG/PNG masters** at or above the min resolution; we convert to AVIF/WebP at build.
- `.gitkeep` files just preserve empty folders in git — delete them once real images land in a folder.
