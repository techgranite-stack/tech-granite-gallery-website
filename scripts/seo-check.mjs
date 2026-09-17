#!/usr/bin/env node
/**
 * SEO regression guard.  `npm run seo:check` (after `npm run build`).
 *
 * Checks the *built HTML*, not the source data files. That is deliberate: the
 * defects this repo actually shipped were all invisible at the data layer —
 * a title defined in page-seo.ts but never read because the page was a client
 * component, a `breadcrumb` prop passed but never rendered, a canonical missing
 * only on the granite twin of a route that had one. Only the output tells you.
 *
 * Exits non-zero on any FAIL, so it can gate CI.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const APP_DIR = '.next/server/app';
const ROOT = process.cwd();

if (!existsSync(join(ROOT, APP_DIR))) {
  console.error(`✗ ${APP_DIR} not found — run \`npm run build\` first.`);
  process.exit(1);
}

// ── Collect built pages ───────────────────────────────────────────────────────

/** @type {string[]} */
const htmlFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (entry.endsWith('.html')) htmlFiles.push(p);
  }
})(join(ROOT, APP_DIR));

const failures = [];
const warnings = [];
const fail = (route, msg) => failures.push(`${route}: ${msg}`);
const warn = (route, msg) => warnings.push(`${route}: ${msg}`);

// ── Per-page checks ───────────────────────────────────────────────────────────

const TITLE_MAX = 60;
const DESC_MIN = 140;
const DESC_MAX = 160;

const seenTitles = new Map();
const seenDescriptions = new Map();

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

for (const file of htmlFiles) {
  const route = relative(join(ROOT, APP_DIR), file).replace(/\.html$/, '');
  // 404 page is exempt from the metadata contract.
  if (route === '_not-found') continue;

  const html = readFileSync(file, 'utf8');

  // ── <title> ──
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  if (!titleMatch) {
    fail(route, 'no <title>');
  } else {
    const title = decode(titleMatch[1]).trim();
    if (title.length > TITLE_MAX) {
      fail(route, `title ${title.length} chars (max ${TITLE_MAX}) — "${title}"`);
    }
    if (seenTitles.has(title)) {
      fail(route, `duplicate title, shared with ${seenTitles.get(title)}`);
    } else {
      seenTitles.set(title, route);
    }
  }

  // ── meta description ──
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  if (!descMatch) {
    fail(route, 'no meta description');
  } else {
    const desc = decode(descMatch[1]).trim();
    if (desc.length < DESC_MIN || desc.length > DESC_MAX) {
      // Length is a soft signal — Google rewrites descriptions freely — so this
      // is a warning, while a missing or duplicated one is a hard failure.
      warn(route, `description ${desc.length} chars (want ${DESC_MIN}–${DESC_MAX})`);
    }
    if (seenDescriptions.has(desc)) {
      fail(route, `duplicate description, shared with ${seenDescriptions.get(desc)}`);
    } else {
      seenDescriptions.set(desc, route);
    }
  }

  // ── canonical ──
  if (!/<link rel="canonical" href="https?:\/\/[^"]+"/.test(html)) {
    fail(route, 'missing or non-absolute canonical');
  }

  // ── exactly one <h1> ──
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length === 0) fail(route, 'no <h1>');
  if (h1s.length > 1) fail(route, `${h1s.length} <h1> elements (want exactly 1)`);

  // ── nested <main> (the root layout already provides one) ──
  const mains = html.match(/<main[\s>]/g) ?? [];
  if (mains.length > 1) fail(route, `${mains.length} <main> elements — nested landmark`);

  // ── JSON-LD must parse ──
  const ldBlocks = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  ) ?? [];
  for (const block of ldBlocks) {
    const json = block
      .replace(/^<script type="application\/ld\+json">/, '')
      .replace(/<\/script>$/, '');
    try {
      JSON.parse(json);
    } catch {
      fail(route, 'JSON-LD block does not parse');
    }
  }

  // ── images must carry alt text ──
  const imgs = html.match(/<img\b[^>]*>/g) ?? [];
  const noAlt = imgs.filter((t) => !/\balt=/.test(t)).length;
  if (noAlt > 0) fail(route, `${noAlt} <img> without alt`);
}

// ── Whole-site checks ─────────────────────────────────────────────────────────

// robots.txt must never disallow /_next/ again — this bug alone suppressed
// 100% of image indexing on the site.
const robotsPath = join(ROOT, APP_DIR, 'robots.txt.body');
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, 'utf8');
  if (/Disallow:\s*\/_next/i.test(robots)) {
    fail('robots.txt', 'disallows /_next/ — this blocks every next/image URL');
  }
} else {
  warn('robots.txt', 'not found in build output');
}

// No Unsplash hotlinks — image equity there accrues to unsplash.com.
let unsplash = 0;
(function walkSrc(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walkSrc(p);
    else if (/\.(ts|tsx)$/.test(p)) {
      const body = readFileSync(p, 'utf8');
      // Ignore commented-out blocks — they ship nothing.
      const live = body.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
      const hits = live.match(/images\.unsplash\.com/g);
      if (hits) {
        unsplash += hits.length;
        warn(relative(ROOT, p), `${hits.length} live Unsplash hotlink(s)`);
      }
    }
  }
})(join(ROOT, 'src'));

// ── Report ────────────────────────────────────────────────────────────────────

console.log(`\nChecked ${htmlFiles.length} built pages.\n`);

if (warnings.length) {
  console.log(`⚠  ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`   ${w}`);
  console.log('');
}

if (failures.length) {
  console.log(`✗  ${failures.length} failure(s):`);
  for (const f of failures) console.log(`   ${f}`);
  console.log('');
  process.exit(1);
}

console.log('✓  All SEO checks passed.\n');
