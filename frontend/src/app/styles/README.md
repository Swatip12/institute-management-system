# Shared Style Infrastructure

This directory contains the shared SCSS modules for the CSS Budget Optimization project.

## Files Created

### 1. `_variables.scss`
Contains all shared variables including:
- **Color Palette**: Primary, secondary, success, warning, danger gradients and solid colors
- **Shadows**: Glow, neon, float, deep, card, and button shadows
- **Spacing & Sizing**: Spacing units, border radius values
- **Transitions & Animations**: Smooth, bounce, elastic transitions with various durations
- **Breakpoints**: Responsive design breakpoints (xs, sm, md, lg, xl)
- **Z-Index Layers**: Organized z-index values for layering
- **Typography**: Font families, sizes, and weights
- **Opacity Levels**: Standard opacity values
- **Borders**: Border widths and colors

### 2. `_mixins.scss`
Contains reusable style patterns including:
- **Glass Effect**: `@include glass-effect($opacity, $blur)`
- **Gradient Text**: `@include gradient-text($gradient)`
- **Floating Animation**: `@include floating-animation($duration, $distance)`
- **Pulse Animation**: `@include pulse-animation($duration, $scale)`
- **Shimmer Effect**: `@include shimmer-effect($duration)`
- **Button Base**: `@include button-base` and `@include button-gradient($gradient)`
- **Card Base**: `@include card-base` and `@include card-hover-effect`
- **Responsive**: `@include respond-to($breakpoint)`, `@include mobile`, `@include tablet`, `@include desktop`
- **Gradient Background**: `@include gradient-background($gradient)`
- **Glow Effect**: `@include glow-effect($color, $intensity)`
- **Focus State**: `@include focus-state($color)`
- **Flexbox**: `@include flex-center`, `@include flex-between`, `@include flex-column`, etc.
- **Truncate Text**: `@include truncate-text($lines)`
- **Custom Scrollbar**: `@include custom-scrollbar($width, $track-color, $thumb-gradient)`
- **Skeleton Loader**: `@include skeleton-loader($height)`
- **Fade In Up**: `@include fade-in-up($duration, $distance)`
- **Backdrop Blur**: `@include backdrop-blur($blur, $brightness)`

### 3. `_animations.scss`
Contains all shared keyframe animations including:
- **Fade Animations**: fadeIn, fadeOut, fadeInUp, fadeInDown
- **Slide Animations**: slideInLeft, slideInRight, slideInUp, slideInDown
- **Bounce Animations**: bounceIn, bounce
- **Floating Animations**: floating, floatingLarge, iconFloat
- **Pulse Animations**: pulse, pulseGlow, headerPulse
- **Rotation Animations**: spin, spinGlow, headerFloat
- **Shimmer Animations**: cardShimmer, textShine, numberShine
- **Background Animations**: backgroundFloat, gradientShift
- **Scale Animations**: scaleIn, scaleOut
- **Glow Animations**: rowGlow, neonGlow
- **Stats Animations**: statsPulse
- **Loading Animations**: loading, loadingSpinner
- **Shake Animations**: shake, shakeVertical
- **Utility Animation Classes**: Ready-to-use classes like `.animate-fade-in`, `.animate-floating`, etc.

### 4. `_utilities.scss`
Contains common utility classes including:
- **Glass Effect Utilities**: `.glass-effect`, `.glass-effect-dark`, `.glass-effect-light`
- **Glow Utilities**: `.neon-glow`, `.glow-primary`, `.glow-success`, `.glow-danger`
- **Animation Utilities**: `.floating`, `.floating-slow`, `.pulse`, `.pulse-fast`
- **Flexbox Utilities**: `.flex-center`, `.flex-between`, `.flex-column`, etc.
- **Spacing Utilities**: Margin and padding classes (`.m-*`, `.mt-*`, `.p-*`, `.pt-*`, etc.)
- **Text Utilities**: Alignment, transform, weight, size, color, gradient text, truncate
- **Background Utilities**: `.bg-primary`, `.bg-secondary`, `.bg-success`, etc.
- **Border Utilities**: Border width, color, and radius classes
- **Shadow Utilities**: `.shadow-glow`, `.shadow-neon`, `.shadow-float`, etc.
- **Visibility Utilities**: `.visible`, `.invisible`, `.hidden`, `.block`, etc.
- **Position Utilities**: `.relative`, `.absolute`, `.fixed`, `.sticky`
- **Opacity Utilities**: `.opacity-0` through `.opacity-100`
- **Overflow Utilities**: `.overflow-auto`, `.overflow-hidden`, etc.
- **Cursor Utilities**: `.cursor-pointer`, `.cursor-default`, etc.
- **Responsive Utilities**: `.hidden-mobile`, `.visible-desktop`, etc.
- **Width & Height Utilities**: `.w-full`, `.h-full`, `.max-w-*`, etc.
- **Transition Utilities**: `.transition-smooth`, `.transition-bounce`, etc.
- **Backdrop Utilities**: `.backdrop-blur`, `.backdrop-blur-sm`, `.backdrop-blur-lg`
- **Z-Index Utilities**: `.z-0` through `.z-50`

## Usage

### In Component SCSS Files

```scss
// Import the shared modules
@import '../../../styles/variables';
@import '../../../styles/mixins';

.my-component {
  // Use variables
  background: $primary-gradient;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  box-shadow: $shadow-float;
  
  // Use mixins
  @include glass-effect;
  @include floating-animation(3s, 10px);
  
  // Responsive design
  @include respond-to('sm') {
    padding: $spacing-md;
  }
}

.my-button {
  @include button-gradient($success-gradient);
}

.my-card {
  @include card-base;
  @include card-hover-effect;
}
```

### In HTML Templates

```html
<!-- Use utility classes directly -->
<div class="glass-effect rounded-lg p-lg shadow-float">
  <h1 class="text-gradient-primary text-2xl text-bold">Title</h1>
  <p class="text-center mt-md">Content</p>
  <button class="bg-primary rounded-full p-md cursor-pointer">
    Click Me
  </button>
</div>

<!-- Use animation classes -->
<div class="animate-fade-in-up floating">
  Animated Content
</div>
```

## Import Order

The shared modules are imported in `frontend/src/styles.scss` in the following order:

1. `_variables.scss` - Must be first as other files depend on it
2. `_mixins.scss` - Depends on variables
3. `_animations.scss` - Standalone keyframes
4. `_utilities.scss` - Depends on variables and mixins

## Benefits

1. **Reduced Duplication**: Common styles are defined once and reused
2. **Consistency**: All components use the same design tokens
3. **Maintainability**: Changes to shared styles propagate automatically
4. **Smaller Bundle Size**: SCSS compilation optimizes repeated patterns
5. **Budget Compliance**: Helps keep component styles under the 4KB limit
6. **Developer Experience**: Easy-to-use mixins and utilities speed up development

## Next Steps

When extracting inline styles from components:
1. Replace hardcoded values with variables from `_variables.scss`
2. Replace repeated patterns with mixins from `_mixins.scss`
3. Use animation classes from `_animations.scss` instead of inline keyframes
4. Apply utility classes from `_utilities.scss` where appropriate
