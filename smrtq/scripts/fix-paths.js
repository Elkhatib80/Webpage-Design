/**
 * fix-paths.js
 *
 * Next.js static export generates absolute paths like /_next/static/...
 * which only work when served from a web server.
 *
 * This script rewrites those paths to be relative, so the out/ folder
 * works when:
 *  (a) opened directly as a local file (file://)
 *  (b) uploaded to a subdirectory on a web host
 *  (c) served normally from the web root (still works)
 */

const fs   = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'out');

// Patterns that reference Next.js bundles — safe to make relative
// We intentionally do NOT touch href="/products" navigation links.
const ASSET_PATTERNS = [
  // stylesheet and preload links:  href="/_next/...
  { from: /href="\/_next\//g,          to: (rel) => `href="${rel}_next/` },
  { from: /href='\/_ next\//g,         to: (rel) => `href='${rel}_next/` },
  // script src:                     src="/_next/...
  { from: /src="\/_next\//g,           to: (rel) => `src="${rel}_next/` },
  { from: /src='\/_ next\//g,          to: (rel) => `src='${rel}_next/` },
  // JS dynamic imports (webpack/turbopack): "/_next/
  { from: /"\/_ next\//g,             to: (rel) => `"${rel}_next/` },
  // Clean versions (no space typo)
  { from: /href="\/_ next\//g,         to: (rel) => `href="${rel}_next/` },
  { from: /src="\/_ next\//g,          to: (rel) => `src="${rel}_next/` },
];

// More robust single replace: catches all /_next/ occurrences in attribute values
function fixContent(content, relativePrefix) {
  // Replace /_next/ appearing after = " or = '  (asset references)
  // Also replace bare "/_next/ strings used in JS chunk loading
  return content
    .replace(/"\/_next\//g,  `"${relativePrefix}_next/`)
    .replace(/'\/_next\//g,  `'${relativePrefix}_next/`)
    // JS inline: (/_next/  or ,/_next/  — dynamic imports
    .replace(/\(\"\/_ next\//g, `("${relativePrefix}_next/`)
    // Simpler catch-all for the above with no space:
    .replace(/\(\"\/_ next\//g, `("${relativePrefix}_next/`)
    // Also fix /assets/ references (product images, logo)
    .replace(/"\/_assets\//g, `"${relativePrefix}assets/`)
    .replace(/src="\/assets\//g, `src="${relativePrefix}assets/`)
    .replace(/href="\/assets\//g, `href="${relativePrefix}assets/`)
    // favicon
    .replace(/href="\/favicon.ico"/g, `href="${relativePrefix}favicon.ico"`);
}

let count = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (entry.endsWith('.html')) {
      // Calculate how many levels deep this file is from out/
      const rel      = path.relative(OUT_DIR, full);  // e.g. "about/index.html"
      const depth    = rel.split(path.sep).length - 1; // "about/index.html" → 1
      const prefix   = depth === 0 ? './' : '../'.repeat(depth); // e.g. "../"

      const original = fs.readFileSync(full, 'utf8');
      const fixed    = fixContent(original, prefix);

      if (fixed !== original) {
        fs.writeFileSync(full, fixed, 'utf8');
        console.log(`  fixed (depth ${depth}): ${rel}`);
        count++;
      }
    }
  }
}

console.log('\n🔧 Fixing asset paths for local file:// compatibility...');
walk(OUT_DIR);
console.log(`✅ Done — ${count} HTML file(s) updated.\n`);
console.log('The out/ folder now works both locally (file://) and on any web host.\n');
