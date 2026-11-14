# Image Request Brief — Granite Galleri

## 0. Why this matters (the two promises we keep)

1. **Rank on Google & Google Images.** We are an image-heavy stone catalogue. Owned,
   well-named, high-quality photos rank. Every image you send becomes
   a discoverable asset on our own domain.
2. **Never look broken.** Correctly-sized images load fast on phones and degrade gracefully on
   slow networks. Wrong-ratio or oversized images crop badly, shift the layout, and hurt ranking.

Total set for a full launch: **~1,355 image files across 481 slots** (see the manifest). You do
**not** have to send everything at once — we deliver page-by-page; prioritise Homepage + the
top stones first.

---

## 1. How to send images — rules that apply to **every** photo

1. **Send high-resolution JPEG or PNG masters.** We convert to AVIF/WebP ourselves — do **not**
   pre-compress, screenshot, or send WhatsApp-downscaled copies.
2. **Owned photography only.** No stock-site downloads, no hot-linked or watermarked images. We
   can only name, host, and rank images we own.
3. **Meet the minimum resolution** for each slot. Shoot larger if possible; **never upscale**
   a small image to hit the number — it shows artefacts on stone texture.
4. **Name files descriptively** — lowercase, hyphenated, no `IMG_4821.jpg`, no spaces:
   `calacatta-gold-polished-slab-hero.jpg`. Use the `suggested_filename` column in the excel.

## 2. Aspect ratio & resolution reference

| Slot type                  | Aspect                        | Min resolution | Recommended  | Separate mobile file?     |
| -------------------------- | ----------------------------- | -------------- | ------------ | ------------------------- |
| **Hero — desktop**  | 16:9                          | 1920 × 1080   | 2560 × 1440 | —                        |
| **Hero — mobile**   | 9:16                          | 1080 × 1920   | 1290 × 2294 | **Yes — required** |
| Stone card / thumbnail     | 16:9 (crops to 1:1 on mobile) | 1200 × 675    | 1600 × 900  | No                        |
| Gallery / project card     | 5:7 portrait                  | 800 × 1120    | 1200 × 1680 | No                        |
| Team portrait              | 1:1.1 portrait                | 800 × 880     | 1200 × 1320 | No                        |
| Blog / article card        | 16:9                          | 1200 × 675    | 1600 × 900  | No                        |
| Project detail gallery     | 16:10                         | 1600 × 1000   | 2000 × 1250 | No                        |
| Application detail         | 4:3                           | 1600 × 1200   | 2000 × 1500 | No                        |
| Collection panel images    | 16:9                          | 1400 × 788    | 1920 × 1080 | No                        |
| Finish / application thumb | square-ish                    | 1200 × 900    | 1600 × 1200 | No                        |

### Why heroes need **two** files (desktop **and** mobile)

Every hero on the site is **full-screen** (`height: 100vh`). A single wide 16:9 photo looks
great on a laptop but, on a tall phone screen, the browser must crop the sides away hard — the
subject gets lost or the framing breaks. So for **heroes only**, we ask for:

- a **landscape 16:9** master for desktop/tablet, **and**
- a **portrait 9:16** master (1080 × 1920) of the same scene, framed for a phone screen.

Everything that is **not** a hero (cards, thumbnails, galleries, portraits) uses a single image
— the layout crops it cleanly, so one well-composed file per slot is enough.

## 3. What will I do with the images (so you know the pipeline)

- Convert masters to **AVIF/WebP** and auto-generate responsive `srcset`/`sizes` .
- Add a **blur placeholder + branded error fallback** so nothing ever flashes blank or shows a
  broken-image icon .
- Write **descriptive alt text + captions** from excel .
- Register them in the **image sitemap** and emit **`ImageObject` structured data** for Google
  Images .

---

## 4. Delivery checklist (per batch)

- [ ] Files are JPEG/PNG masters at or above the min resolution for their slot (§2).
- [ ] Filenames are lowercase-hyphenated and match the manifest's `suggested_filename`.
- [ ] Heroes include **both** a 16:9 desktop **and** a 9:16 mobile file.
- [ ] Non-hero images have the subject centred (they get cropped on mobile).
- [ ] Each image has a one-line description/caption for SEO alt text.
- [ ] Files follow the `suggested_filename` paths in the manifest.
