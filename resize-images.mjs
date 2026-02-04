import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function resizeImages() {
  const srcDir = path.join(__dirname, 'src', 'assets', 'images');
  
  // Check original dimensions first
  console.log('Checking original image dimensions...\n');
  
  const logoPath = path.join(srcDir, 'logo.avif');
  const davinciPath = path.join(srcDir, 'davinci.avif');
  
  try {
    const logoMeta = await sharp(logoPath).metadata();
    console.log(`Original logo.avif: ${logoMeta.width}x${logoMeta.height}`);
    
    const davinciMeta = await sharp(davinciPath).metadata();
    console.log(`Original davinci.avif: ${davinciMeta.width}x${davinciMeta.height}\n`);
  } catch (err) {
    console.error('Error reading original images:', err.message);
    return;
  }
  
  console.log('Creating responsive versions...\n');
  
  // Logo versions (3 sizes)
  const logoSizes = [80, 160, 240];
  
  for (const width of logoSizes) {
    try {
      const outputPath = path.join(srcDir, `logo-${width}.avif`);
      await sharp(logoPath)
        .resize(width, null, { withoutEnlargement: true })
        .toFile(outputPath);
      
      const meta = await sharp(outputPath).metadata();
      console.log(`✓ Created logo-${width}.avif (${meta.width}x${meta.height})`);
    } catch (err) {
      console.error(`✗ Failed to create logo-${width}.avif:`, err.message);
    }
  }
  
  console.log('');
  
  // Davinci versions (4 sizes)
  const davinciSizes = [360, 480, 720, 960];
  
  for (const width of davinciSizes) {
    try {
      const outputPath = path.join(srcDir, `davinci-${width}.avif`);
      await sharp(davinciPath)
        .resize(width, width, { 
          fit: 'cover',
          withoutEnlargement: true 
        })
        .toFile(outputPath);
      
      const meta = await sharp(outputPath).metadata();
      console.log(`✓ Created davinci-${width}.avif (${meta.width}x${meta.height})`);
    } catch (err) {
      console.error(`✗ Failed to create davinci-${width}.avif:`, err.message);
    }
  }
  
  console.log('\n✅ Image processing complete!');
}

resizeImages().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
