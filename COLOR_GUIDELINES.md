# Color Usage Guidelines

This document outlines the color palette and usage guidelines for the Italian Learning Application.

## Color Palette

The application uses the following custom color palette:

- **Primary (#363123)** - Dark brown for main text, primary actions, and navigation
- **Secondary (#202610)** - Dark green for secondary elements and accents
- **Accent (#854039)** - Rust red for highlights and important actions (mapped to error color)
- **Success (#78C15F)** - Green for success states and positive actions
- **Background (#EEC69F)** - Light beige for card backgrounds and subtle highlights

## Theme Implementation

Colors are defined in `src/theme/theme.ts` using Material-UI's theme system:

```typescript
const colors = {
  primary: '#363123',      // Dark brown - main text, primary actions
  secondary: '#202610',    // Dark green - secondary elements, accents
  accent: '#854039',       // Rust red - highlights, important actions
  success: '#78C15F',      // Green - success states, positive actions
  background: '#EEC69F',   // Light beige - backgrounds, subtle highlights
};
```

## Usage Guidelines

### Component Styling

1. **Cards and Containers**
   - Use `backgroundColor: 'background.paper'` for card backgrounds
   - Apply `borderRadius: 4` for rounded corners
   - Remove hardcoded background colors in favor of theme values

2. **Buttons**
   - Primary buttons automatically use the primary color
   - Success actions use the success color
   - Error/destructive actions use the accent color (mapped to error)

3. **Typography**
   - All text automatically uses the primary color from theme
   - Secondary text uses the secondary color
   - Use `fontFamily: 'Poppins, sans-serif'` consistently

4. **Progress Indicators**
   - Linear progress bars use success color for the progress bar
   - Chips and status indicators follow the color scheme

### Best Practices

1. **Always use theme colors** instead of hardcoded hex values
2. **Reference colors semantically** (e.g., `color="primary"` instead of specific hex)
3. **Maintain consistency** across all components
4. **Test color combinations** for accessibility and readability

### Component Examples

```typescript
// ✅ Good - Using theme colors
<Button color="primary" variant="contained">
  Primary Action
</Button>

<Card sx={{ backgroundColor: 'background.paper' }}>
  Content here
</Card>

// ❌ Avoid - Hardcoded colors
<Button sx={{ backgroundColor: '#363123' }}>
  Primary Action
</Button>

<Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.60)' }}>
  Content here
</Card>
```

## Glass Effect Components

The theme includes built-in glass effect styling for cards through component overrides:

```typescript
MuiCard: {
  styleOverrides: {
    root: {
      backgroundColor: 'rgba(238, 198, 159, 0.60)',
      backdropFilter: 'blur(10px)',
      borderRadius: 16,
      border: `1px solid rgba(54, 49, 35, 0.1)`,
    },
  },
}
```

This means cards automatically get the glass effect without needing to specify backdrop filters manually.

## Color Accessibility

All color combinations have been chosen to maintain good contrast ratios for accessibility. The dark browns and greens provide sufficient contrast against the light beige backgrounds.