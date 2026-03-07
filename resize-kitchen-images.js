const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Directories to process
const directories = [
  path.join(__dirname, 'src', 'assets', 'images', 'living'),
  path.join(__dirname, 'src', 'assets', 'images', 'bath')
];
const maxWidth = 2560;

// Image extensions to process
const imageExtensions = ['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp'];

// Recursively find all image files
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Process a single image
async function processImage(imagePath) {
  try {
    const ext = path.extname(imagePath).toLowerCase();
    const dir = path.dirname(imagePath);
    const baseName = path.basename(imagePath, ext);
    const outputPath = path.join(dir, `${baseName}.webp`);
    
    // Skip if WebP already exists and source is also WebP
    if (ext === '.webp' && fs.existsSync(outputPath)) {
      console.log(`Skipping: ${imagePath} (already WebP)`);
      return;
    }
    
    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    const { width, height } = metadata;
    
    console.log(`Processing: ${imagePath} (${width}x${height})`);
    
    // Create sharp instance
    let image = sharp(imagePath);
    
    // Resize if width exceeds maxWidth
    if (width > maxWidth) {
      const newHeight = Math.round((maxWidth / width) * height);
      image = image.resize(maxWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
      console.log(`  Resizing to: ${maxWidth}x${newHeight}`);
    }
    
    // Convert to WebP
    await image.webp({ quality: 90 }).toFile(outputPath);
    
    console.log(`  ✓ Saved as: ${outputPath}`);
    
    // Delete original if it's not WebP
    if (ext !== '.webp') {
      fs.unlinkSync(imagePath);
      console.log(`  ✓ Deleted original: ${imagePath}`);
    }
    
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
  }
}

// Main function
async function main() {
  for (const dir of directories) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Processing directory: ${dir}`);
    console.log('='.repeat(60) + '\n');
    
    if (!fs.existsSync(dir)) {
      console.log(`Directory does not exist: ${dir}\n`);
      continue;
    }
    
    console.log('Finding all images...\n');
    const imageFiles = getAllImageFiles(dir);
    
    console.log(`Found ${imageFiles.length} images to process.\n`);
    
    // Process images one by one
    for (const imagePath of imageFiles) {
      await processImage(imagePath);
    }
    
    console.log(`\n✓ Finished processing ${dir}`);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✓ All directories processed!');
  console.log('='.repeat(60));
}

main().catch(console.error);
