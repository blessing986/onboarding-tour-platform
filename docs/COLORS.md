# Project Color Palette

## Brand Colors

Our project uses a custom color palette defined in `tailwind.config.ts`. These colors are available throughout the entire project.

### Color Definitions

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|----------------|-------|
| **Sky** | `#86defe` | `brand-sky` | Light blue for accents, backgrounds, and highlights |
| **Sage** | `#8eb19d` | `brand-sage` | Soft green for secondary elements and cards |
| **Teal** | `#66b3ba` | `brand-teal` | Main teal for primary actions, buttons, and CTAs |
| **Blush** | `#f0d2d1` | `brand-blush` | Soft pink for subtle highlights and accents |

---

## How to Use

### Background Colors
```tsx
<div className="bg-brand-sky">Sky background</div>
<div className="bg-brand-sage">Sage background</div>
<div className="bg-brand-teal">Teal background</div>
<div className="bg-brand-blush">Blush background</div>
```

### Text Colors
```tsx
<p className="text-brand-sky">Sky text</p>
<p className="text-brand-sage">Sage text</p>
<p className="text-brand-teal">Teal text</p>
<p className="text-brand-blush">Blush text</p>
```

### Border Colors
```tsx
<div className="border border-brand-sky">Sky border</div>
<div className="border-2 border-brand-teal">Teal border</div>
```

### With Opacity
```tsx
<div className="bg-brand-sky/20">20% opacity</div>
<div className="bg-brand-teal/50">50% opacity</div>
<div className="text-brand-sage/80">80% opacity</div>
```

### Gradients
```tsx
<div className="bg-linear-to-r from-brand-teal to-brand-sky">
  Teal to Sky gradient
</div>

<Button className="bg-linear-to-r from-purple-600 to-pink-600">
  Purple to Pink gradient button
</Button>
```

---

## Additional Colors Used

### Purple/Pink Gradient Theme
- `purple-50` to `purple-900` - Main theme colors
- `pink-50` to `pink-900` - Accent theme colors
- `cyan-50` to `cyan-900` - Secondary theme colors

### Usage in Project
```tsx
// Hero section background
bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50

// Buttons
bg-gradient-to-r from-purple-600 to-pink-600

// Cards
bg-white/80 backdrop-blur-sm border-2 border-white/50
```

---

## Examples from the Project

### 1. Primary Button
```tsx
<Button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full">
  Get Started
</Button>
```

### 2. Feature Card Icon Background
```tsx
<div className="p-2.5 rounded-xl bg-linear-to-br from-brand-sky to-brand-teal">
  <Icon className="h-5 w-5 text-white" />
</div>
```

### 3. Badge/Pill
```tsx
<Badge className="bg-brand-teal/20 text-brand-teal border-0">
  New Feature
</Badge>
```

### 4. Section Background
```tsx
<section className="bg-linear-to-br from-purple-50 via-blue-50 to-cyan-50">
  {/* Content */}
</section>
```

---

## Best Practices

1. **Primary Actions**: Use `brand-teal` or purple-to-pink gradients
2. **Backgrounds**: Use light versions with opacity (`brand-sky/20`)
3. **Icons**: Match icon color with the background theme
4. **Hover States**: Add `/90` or `/80` opacity on hover
5. **Glass Effect**: Combine with `backdrop-blur-sm` for modern look

---

## Color Psychology

- **Sky Blue (#86defe)**: Trust, clarity, innovation
- **Sage Green (#8eb19d)**: Growth, balance, harmony
- **Teal (#66b3ba)**: Confidence, professionalism, reliability
- **Blush Pink (#f0d2d1)**: Warmth, approachability, creativity

---

## Where Colors are Defined

- **Tailwind Config**: `tailwind.config.ts` - Line 14-19
- **Global CSS**: `app/globals.css` - For custom animations
- **Usage Examples**: Throughout `app/page.tsx` and `app/about/page.tsx`

---

## Need Help?

If you need to add new brand colors or modify existing ones:
1. Edit `tailwind.config.ts`
2. Add your color under the `brand` object
3. Restart the dev server to see changes
4. Update this documentation file

Example:
```ts
brand: {
  sky: "#86defe",
  sage: "#8eb19d",
  teal: "#66b3ba",
  blush: "#f0d2d1",
  newColor: "#hexcode", // Add new color here
}
```
