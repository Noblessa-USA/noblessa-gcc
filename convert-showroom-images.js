/**
 * One-time script: Convert KSA Showrooms images to WebP and copy to src/assets/images/showrooms/
 * Usage: node convert-showroom-images.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const baseDir = path.resolve('src/assets/images/KSA Showrooms');
const outDir  = path.resolve('src/assets/images/showrooms');

const cityFolders = {
  'KSA Jeddah': 'jeddah',
  'KSA Riyadh': 'riyadh',
  'OM Muscat':  'muscat',
  'UAE Dubai':  'dubai',
};

// Sections we care about → output suffix
const sectionMap = {
  'Hero Section':          'hero',
  'Section 6 - The Map':   'showroom',
};

async function convert(srcPath, destPath) {
  await sharp(srcPath)
    .webp({ quality: 82 })
    .toFile(destPath);
  const srcKB  = Math.round(fs.statSync(srcPath).size / 1024);
  const destKB = Math.round(fs.statSync(destPath).size / 1024);
  console.log(`  ✓  ${path.basename(destPath)}  (${srcKB}KB → ${destKB}KB)`);
}

async function run() {
  for (const [folderName, citySlug] of Object.entries(cityFolders)) {
    const cityDir = path.join(baseDir, folderName);
    console.log(`\n── ${folderName} (${citySlug}) ──`);

    for (const [sectionName, suffix] of Object.entries(sectionMap)) {
      const sectionDir = path.join(cityDir, sectionName);
      if (!fs.existsSync(sectionDir)) continue;

      const files = fs.readdirSync(sectionDir)
        .filter(f => /\.(jpe?g|png|webp|JPG|JPEG|PNG)$/i.test(f))
        .sort();

      for (let i = 0; i < files.length; i++) {
        const src  = path.join(sectionDir, files[i]);
        const dest = path.join(outDir, `${citySlug}-${suffix}-${i + 1}.webp`);
        await convert(src, dest);
      }
    }
  }
  console.log('\nDone.');
}

run().catch(err => { console.error(err); process.exit(1); });
