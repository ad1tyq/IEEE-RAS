# Sponsor Images

## Required Files

Place the following sponsor logo files in the `/public` directory:

- `sponsor1.png` - First sponsor logo
- `sponsor2.png` - Second sponsor logo

## Image Requirements

- **Format**: PNG (recommended for transparency)
- **Size**: Minimum 200x120 pixels, Maximum 400x240 pixels
- **Aspect Ratio**: 5:3 or 16:10 preferred
- **Background**: Transparent or white background
- **Quality**: High resolution for crisp display on all devices

## Usage

These images are used in:
1. **Homepage**: Small sponsor logos in the "Sponsored by" section
2. **Sponsors Page**: Large detailed sponsor showcase

## Styling

The images will be automatically styled with:
- Grayscale filter with neon accent glow
- Responsive sizing
- Hover effects
- High-quality rendering for retina displays

## Adding More Sponsors

To add more sponsors:
1. Add the logo file to `/public` (e.g., `sponsor3.png`)
2. Update the sponsors array in `/src/app/sponsors/page.tsx`
3. Add the logo to the homepage section in `/src/app/page.tsx` 