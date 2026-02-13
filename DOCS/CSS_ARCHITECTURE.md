# CSS Architecture Documentation

## Table of Contents

1. [Overview](#overview)
2. [Shared Style Modules](#shared-style-modules)
3. [Using Variables](#using-variables)
4. [Using Mixins](#using-mixins)
5. [Using Animations](#using-animations)
6. [Using Utility Classes](#using-utility-classes)
7. [Budget Limits and Guidelines](#budget-limits-and-guidelines)
8. [Creating New Components](#creating-new-components)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Overview

This document describes the CSS architecture for the Institute Management System frontend application. The architecture was designed to solve CSS budget violations that prevented successful Vercel deployments while maintaining the application's rich visual design.

### Key Principles

- **External Stylesheets**: All component styles are in external `.scss` files, not inline
- **Shared Modules**: Common styles are centralized in shared SCSS modules
- **Budget Compliance**: Component styles stay under the 8KB limit (with a 6KB warning threshold)
- **Maintainability**: Consistent patterns and naming conventions across all components
- **Performance**: Optimized CSS delivery with minification and tree-shaking

### Architecture Overview

```
frontend/src/app/
├── components/
│   └── [component-name]/
│       ├── [component-name].component.ts      (no inline styles)
│       ├── [component-name].component.html
│       └── [component-name].component.scss    (external styles)
├── styles/
│   ├── _variables.scss    (shared variables)
│   ├── _mixins.scss       (reusable mixins)
│   ├── _animations.scss   (keyframe animations)
│   └── _utilities.scss    (utility classes)
└── styles.scss            (global imports)
```

---

## Shared Style Modules

The shared style modules are located in `frontend/src/app/styles/` and provide reusable design tokens and patterns.


### 1. `_variables.scss`

Contains all design tokens including:

- **Color Palette**: Gradients and solid colors for primary, secondary, success, warning, danger themes
- **Shadows**: Pre-defined shadow effects (glow, neon, float, deep, card, button)
- **Spacing**: Consistent spacing scale based on 8px unit
- **Border Radius**: Standardized border radius values
- **Transitions**: Smooth, bounce, elastic, and fast transitions
- **Breakpoints**: Responsive design breakpoints
- **Typography**: Font families, sizes, and weights
- **Z-Index**: Organized layering system

### 2. `_mixins.scss`

Contains reusable style patterns including:

- **Glass Effects**: Frosted glass and glassmorphism effects
- **Gradient Text**: Animated and static gradient text
- **Animations**: Floating, pulse, and shimmer effects
- **Buttons**: Base button styles with gradients
- **Cards**: Card base styles with hover effects
- **Responsive**: Media query helpers
- **Flexbox**: Common flexbox patterns
- **Scrollbars**: Custom styled scrollbars
- **Text**: Truncation and glow effects

### 3. `_animations.scss`

Contains keyframe animations including:

- **Fade**: fadeIn, fadeOut, fadeInUp, fadeInDown
- **Slide**: slideInLeft, slideInRight, slideInUp, slideInDown
- **Bounce**: bounceIn, bounce
- **Float**: floating, floatingLarge, iconFloat
- **Pulse**: pulse, pulseGlow, headerPulse
- **Rotate**: spin, spinGlow, headerFloat
- **Shimmer**: cardShimmer, textShine, numberShine
- **Scale**: scaleIn, scaleOut
- **Shake**: shake, shakeVertical

### 4. `_utilities.scss`

Contains ready-to-use utility classes for:

- Glass effects, glows, animations
- Flexbox layouts
- Spacing (margin/padding)
- Text styling and colors
- Backgrounds and borders
- Shadows and visibility
- Positioning and overflow
- Responsive utilities
- Transitions and z-index

---


## Using Variables

### Importing Variables

```scss
// At the top of your component SCSS file
@import '../../../styles/variables';
```

### Common Variables Examples

#### Colors

```scss
.my-component {
  // Gradients
  background: $primary-gradient;
  background: $secondary-gradient;
  background: $success-gradient;
  background: $neon-gradient;
  
  // Solid colors
  color: $primary-color;
  border-color: $success-color;
}
```

#### Spacing

```scss
.my-component {
  padding: $spacing-lg;           // 24px
  margin: $spacing-md;            // 16px
  gap: $spacing-sm;               // 8px
  
  // Responsive spacing
  @media (max-width: $breakpoint-sm) {
    padding: $spacing-md;
  }
}
```

#### Shadows

```scss
.my-card {
  box-shadow: $shadow-float;      // Floating card effect
  
  &:hover {
    box-shadow: $shadow-deep;     // Deeper shadow on hover
  }
}

.my-button {
  box-shadow: $shadow-button;     // Button shadow
  
  &:hover {
    box-shadow: $shadow-neon;     // Neon glow on hover
  }
}
```

#### Border Radius

```scss
.my-element {
  border-radius: $border-radius-lg;    // 16px
  border-radius: $border-radius-full;  // 50px (pill shape)
  border-radius: $border-radius-circle; // 50% (perfect circle)
}
```

#### Transitions

```scss
.my-element {
  transition: $transition-smooth;      // Smooth cubic-bezier
  transition: $transition-bounce;      // Bouncy effect
  transition: $transition-fast;        // Quick transition
}
```

### Typography Variables

```scss
.my-heading {
  font-family: $font-family-heading;   // Poppins
  font-size: $font-size-3xl;           // 30px
  font-weight: $font-weight-bold;      // 700
}

.my-text {
  font-family: $font-family-primary;   // Inter
  font-size: $font-size-base;          // 16px
  font-weight: $font-weight-normal;    // 400
}
```

---


## Using Mixins

### Importing Mixins

```scss
// Import both variables and mixins (mixins depend on variables)
@import '../../../styles/variables';
@import '../../../styles/mixins';
```

### Glass Effect Mixin

```scss
.my-card {
  @include glass-effect;                    // Default: 95% opacity, 20px blur
  @include glass-effect(0.8, 15px);        // Custom opacity and blur
  @include glass-effect-dark;               // Dark glass effect
}
```

### Gradient Text Mixin

```scss
.my-heading {
  @include gradient-text($primary-gradient);
  @include gradient-text-animated($neon-gradient);  // Animated gradient
}
```

### Animation Mixins

```scss
.my-element {
  @include floating-animation(3s, 10px);    // Float up/down 10px over 3s
  @include pulse-animation(2s, 1.05);       // Pulse to 105% scale over 2s
  @include shimmer-effect(2s);              // Shimmer on hover
}
```

### Button Mixins

```scss
.my-button {
  @include button-base;                     // Base button styles
  @include button-gradient($success-gradient);  // Button with gradient
}
```

### Card Mixins

```scss
.my-card {
  @include card-base;                       // Base card styles
  @include card-hover-effect;               // Hover lift effect
}
```

### Responsive Mixins

```scss
.my-component {
  padding: $spacing-xl;
  
  // Specific breakpoint
  @include respond-to('md') {
    padding: $spacing-lg;
  }
  
  // Device-specific
  @include mobile {
    padding: $spacing-md;
  }
  
  @include tablet {
    padding: $spacing-lg;
  }
  
  @include desktop {
    padding: $spacing-xl;
  }
}
```

### Flexbox Mixins

```scss
.my-container {
  @include flex-center;           // Center items horizontally and vertically
  @include flex-between;          // Space between with center alignment
  @include flex-column;           // Flex column direction
  @include flex-column-center;    // Flex column with centered items
}
```

### Text Utilities Mixins

```scss
.my-text {
  @include truncate-text(1);      // Single line truncation
  @include truncate-text(3);      // Truncate after 3 lines
  @include text-glow(white, 0.8); // Text glow effect
}
```

### Custom Scrollbar Mixin

```scss
.my-scrollable {
  @include custom-scrollbar(12px, rgba(255, 255, 255, 0.1), $primary-gradient);
}
```

### Glow Effect Mixin

```scss
.my-element {
  @include glow-effect($primary-color, 0.5);  // Colored glow
}
```

---


## Using Animations

### Method 1: Using Animation Classes (Recommended for HTML)

```html
<!-- Apply animation classes directly in templates -->
<div class="animate-fade-in-up">
  Content fades in from bottom
</div>

<div class="animate-floating">
  Content floats up and down
</div>

<div class="animate-pulse">
  Content pulses
</div>

<div class="animate-bounce-in">
  Content bounces in
</div>
```

### Method 2: Using Keyframes in SCSS

```scss
@import '../../../styles/animations';

.my-element {
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.my-floating-element {
  animation: floating 3s ease-in-out infinite;
}

.my-spinning-element {
  animation: spin 2s linear infinite;
}
```

### Available Animation Classes

- `.animate-fade-in` - Fade in
- `.animate-fade-in-up` - Fade in from bottom
- `.animate-slide-in-left` - Slide in from left
- `.animate-slide-in-right` - Slide in from right
- `.animate-bounce-in` - Bounce in with rotation
- `.animate-floating` - Continuous floating
- `.animate-pulse` - Continuous pulse
- `.animate-spin` - Continuous spin
- `.animate-shake` - Shake effect

### Staggered Animations

```scss
.my-list-item {
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}
```

---


## Using Utility Classes

Utility classes can be applied directly in HTML templates for rapid styling without writing custom CSS.

### Glass Effects

```html
<div class="glass-effect rounded-lg p-lg">
  Frosted glass card
</div>

<div class="glass-effect-dark rounded-xl p-xl">
  Dark glass effect
</div>
```

### Layout Utilities

```html
<!-- Flexbox -->
<div class="flex-center">Centered content</div>
<div class="flex-between">Space between items</div>
<div class="flex-column">Vertical layout</div>

<!-- Spacing -->
<div class="p-lg m-md">Padding large, margin medium</div>
<div class="mt-xl mb-lg">Top margin XL, bottom margin large</div>
```

### Text Utilities

```html
<!-- Alignment and transform -->
<p class="text-center text-uppercase">Centered uppercase text</p>

<!-- Size and weight -->
<h1 class="text-3xl text-bold">Large bold heading</h1>

<!-- Colors -->
<p class="text-primary">Primary color text</p>

<!-- Gradient text -->
<h2 class="text-gradient-primary text-2xl">Gradient heading</h2>

<!-- Truncation -->
<p class="text-truncate">This text will be truncated...</p>
<p class="text-truncate-3">This text will be truncated after 3 lines...</p>
```

### Background Utilities

```html
<div class="bg-primary rounded-lg p-lg">
  Primary gradient background
</div>

<div class="bg-success rounded-full p-md">
  Success gradient background
</div>
```

### Shadow Utilities

```html
<div class="shadow-float">Floating shadow</div>
<div class="shadow-neon">Neon glow shadow</div>
<div class="shadow-deep">Deep shadow</div>
```

### Animation Utilities

```html
<div class="floating">Continuous floating</div>
<div class="pulse">Continuous pulse</div>
<div class="glow-primary">Primary color glow</div>
```

### Responsive Utilities

```html
<!-- Hide on mobile -->
<div class="hidden-mobile">
  Only visible on tablet and desktop
</div>

<!-- Show only on desktop -->
<div class="visible-desktop">
  Only visible on desktop
</div>
```

### Border and Radius Utilities

```html
<div class="border-thin border-primary rounded-lg">
  Thin primary border with large radius
</div>

<button class="rounded-full border-none">
  Pill-shaped button
</button>
```

### Combining Utilities

```html
<div class="glass-effect rounded-xl p-xl shadow-float animate-fade-in-up">
  <h2 class="text-gradient-primary text-2xl text-bold mb-md">
    Beautiful Card
  </h2>
  <p class="text-center text-muted">
    Combining multiple utility classes for rapid development
  </p>
  <button class="bg-primary rounded-full p-md mt-lg cursor-pointer">
    Click Me
  </button>
</div>
```

---


## Budget Limits and Guidelines

### Current Budget Configuration

The Angular build configuration in `angular.json` enforces the following CSS budget limits:

```json
{
  "type": "anyComponentStyle",
  "maximumWarning": "6kb",
  "maximumError": "8kb"
}
```

- **Warning Threshold**: 6KB - You'll see a warning but the build continues
- **Error Threshold**: 8KB - Build fails, preventing deployment
- **Target**: Keep component styles under 4KB for optimal performance

### Why These Limits?

1. **Performance**: Smaller CSS files load faster
2. **Maintainability**: Forces modular, reusable styles
3. **Best Practices**: Encourages use of shared styles
4. **Deployment**: Prevents Vercel deployment failures

### Monitoring Component Size

Check your component's CSS size during development:

```bash
# Build in production mode to see budget warnings
cd frontend
ng build --configuration=production
```

Output will show:
```
✔ Browser application bundle generation complete.
⚠ Warning: bundle initial exceeded maximum budget.
  Budget 6.00 kB was exceeded by 1.23 kB.
```

### Staying Under Budget

#### 1. Use Shared Variables

❌ **Bad** - Hardcoded values (increases size):
```scss
.my-component {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}
```

✅ **Good** - Use variables (reduces size):
```scss
@import '../../../styles/variables';

.my-component {
  background: $primary-gradient;
  border-radius: $border-radius-xl;
  padding: $spacing-lg;
  box-shadow: $shadow-float;
}
```

#### 2. Use Mixins for Repeated Patterns

❌ **Bad** - Repeated code:
```scss
.card-1 {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-2 {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

✅ **Good** - Use mixin:
```scss
@import '../../../styles/mixins';

.card-1 {
  @include glass-effect;
}

.card-2 {
  @include glass-effect;
}
```

#### 3. Use Animation Classes Instead of Inline Keyframes

❌ **Bad** - Inline keyframes in component:
```scss
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.my-element {
  animation: fadeIn 0.6s ease-in-out;
}
```

✅ **Good** - Use shared animation class:
```html
<div class="animate-fade-in">Content</div>
```

#### 4. Leverage Utility Classes

❌ **Bad** - Custom CSS for common patterns:
```scss
.my-centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

✅ **Good** - Use utility class:
```html
<div class="flex-center">Content</div>
```

### Budget Violation Recovery

If your component exceeds the budget:

1. **Identify the culprit**: Check build output for the specific file
2. **Extract to shared modules**: Move common styles to `_variables.scss` or `_mixins.scss`
3. **Use utility classes**: Replace custom CSS with utility classes where possible
4. **Remove duplicates**: Look for repeated patterns that can be consolidated
5. **Simplify animations**: Use shared animations instead of component-specific ones

---


## Creating New Components

### Step-by-Step Guide

#### 1. Generate Component with Angular CLI

```bash
cd frontend
ng generate component components/my-feature/my-component
```

This creates:
- `my-component.component.ts`
- `my-component.component.html`
- `my-component.component.scss` ✅ (external stylesheet)
- `my-component.component.spec.ts`

#### 2. Component Structure

```typescript
// my-component.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']  // ✅ External stylesheet
})
export class MyComponentComponent {
  // Component logic
}
```

❌ **Never use inline styles**:
```typescript
@Component({
  selector: 'app-my-component',
  template: `...`,
  styles: [`...`]  // ❌ Avoid this!
})
```

#### 3. Set Up SCSS File

```scss
// my-component.component.scss

// Import shared modules
@import '../../../styles/variables';
@import '../../../styles/mixins';

// Component-specific styles
.my-component {
  @include glass-effect;
  padding: $spacing-lg;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-float;
  
  &__header {
    @include gradient-text($primary-gradient);
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-md;
  }
  
  &__content {
    color: $text-primary;
    line-height: 1.6;
  }
  
  &__button {
    @include button-gradient($success-gradient);
    margin-top: $spacing-lg;
  }
  
  // Responsive
  @include respond-to('sm') {
    padding: $spacing-md;
  }
}
```

#### 4. Use BEM Naming Convention

```scss
// Block
.my-component { }

// Element
.my-component__header { }
.my-component__content { }
.my-component__button { }

// Modifier
.my-component--large { }
.my-component__button--disabled { }
```

#### 5. Template with Utility Classes

```html
<!-- my-component.component.html -->
<div class="my-component animate-fade-in-up">
  <h2 class="my-component__header">
    {{ title }}
  </h2>
  
  <div class="my-component__content">
    <p class="text-center mb-md">{{ description }}</p>
  </div>
  
  <button class="my-component__button" (click)="handleClick()">
    {{ buttonText }}
  </button>
</div>
```

### Component Checklist

Before committing a new component, verify:

- [ ] Uses external SCSS file (not inline styles)
- [ ] Imports shared variables and mixins
- [ ] Uses variables instead of hardcoded values
- [ ] Uses mixins for common patterns
- [ ] Follows BEM naming convention
- [ ] Includes responsive styles using mixins
- [ ] Leverages utility classes where appropriate
- [ ] Component SCSS is under 6KB (check with production build)
- [ ] No duplicate animations (use shared animations)
- [ ] Properly documented with comments

### Example: Complete Component

```typescript
// feature-card.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: string = '';
}
```

```html
<!-- feature-card.component.html -->
<div class="feature-card animate-fade-in-up">
  <div class="feature-card__icon floating">
    <i [class]="icon"></i>
  </div>
  <h3 class="feature-card__title">{{ title }}</h3>
  <p class="feature-card__description">{{ description }}</p>
</div>
```

```scss
// feature-card.component.scss
@import '../../../styles/variables';
@import '../../../styles/mixins';

.feature-card {
  @include card-base;
  @include card-hover-effect;
  padding: $spacing-xl;
  text-align: center;
  
  &__icon {
    @include flex-center;
    width: 80px;
    height: 80px;
    margin: 0 auto $spacing-lg;
    background: $primary-gradient;
    border-radius: $border-radius-circle;
    color: white;
    font-size: $font-size-3xl;
    box-shadow: $shadow-glow;
  }
  
  &__title {
    @include gradient-text($primary-gradient);
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-sm;
  }
  
  &__description {
    color: $text-muted;
    line-height: 1.6;
  }
  
  @include respond-to('sm') {
    padding: $spacing-lg;
    
    &__icon {
      width: 60px;
      height: 60px;
      font-size: $font-size-2xl;
    }
  }
}
```

---


## Troubleshooting

### Issue: Build Fails with Budget Error

**Error Message:**
```
Error: bundle initial exceeded maximum budget.
Budget 8.00 kB was exceeded by 2.34 kB.
```

**Solution:**

1. Identify the problematic component from the error message
2. Open the component's SCSS file
3. Look for opportunities to use shared styles:
   - Replace hardcoded colors with variables
   - Replace repeated patterns with mixins
   - Move animations to shared animations file
   - Use utility classes instead of custom CSS

4. Example refactoring:

```scss
// Before (10KB)
.my-component {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 24px;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  animation: fadeIn 0.6s ease-in-out;
}

// After (2KB)
@import '../../../styles/variables';

.my-component {
  background: $primary-gradient;
  border-radius: $border-radius-xl;
  padding: $spacing-lg;
}
```

Then add `animate-fade-in` class to the HTML template.

### Issue: Styles Not Applying

**Symptoms:**
- Component renders but styles are missing
- Console shows 404 errors for CSS files

**Solutions:**

1. **Check import paths**: Ensure correct relative path to shared modules
   ```scss
   // Correct path depends on component location
   @import '../../../styles/variables';  // For components/feature/component
   @import '../../../../styles/variables';  // For components/feature/sub/component
   ```

2. **Verify styleUrls in component decorator**:
   ```typescript
   @Component({
     selector: 'app-my-component',
     templateUrl: './my-component.component.html',
     styleUrls: ['./my-component.component.scss']  // Must match filename
   })
   ```

3. **Check file exists**: Ensure the SCSS file is in the same directory as the component

4. **Rebuild the application**:
   ```bash
   cd frontend
   ng serve
   ```

### Issue: Variables Not Recognized

**Error Message:**
```
Error: Undefined variable: "$primary-gradient"
```

**Solution:**

1. Ensure you're importing variables before using them:
   ```scss
   @import '../../../styles/variables';
   
   .my-component {
     background: $primary-gradient;  // Now it works
   }
   ```

2. Check the import path is correct for your component's location

3. Verify `_variables.scss` exists in `frontend/src/app/styles/`

### Issue: Mixin Not Found

**Error Message:**
```
Error: Undefined mixin: "glass-effect"
```

**Solution:**

1. Import both variables and mixins (mixins depend on variables):
   ```scss
   @import '../../../styles/variables';
   @import '../../../styles/mixins';
   
   .my-component {
     @include glass-effect;  // Now it works
   }
   ```

### Issue: Animation Not Working

**Symptoms:**
- Animation class applied but no animation occurs
- Element appears static

**Solutions:**

1. **Check animation class is correct**:
   ```html
   <!-- Correct -->
   <div class="animate-fade-in-up">Content</div>
   
   <!-- Incorrect -->
   <div class="fade-in-up">Content</div>
   ```

2. **Ensure animations are imported in global styles**:
   Check `frontend/src/styles.scss` includes:
   ```scss
   @import 'app/styles/animations';
   ```

3. **Verify animation duration**: Some animations may be too fast to notice
   ```scss
   .my-element {
     animation: fadeInUp 2s ease-in-out;  // Slower for testing
   }
   ```

### Issue: Responsive Styles Not Working

**Symptoms:**
- Styles don't change on mobile/tablet
- Media queries seem ignored

**Solutions:**

1. **Use the responsive mixins correctly**:
   ```scss
   @import '../../../styles/mixins';
   
   .my-component {
     padding: $spacing-xl;
     
     @include respond-to('sm') {  // Correct
       padding: $spacing-md;
     }
   }
   ```

2. **Check viewport meta tag** in `index.html`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1">
   ```

3. **Test in browser dev tools**: Use responsive design mode to verify breakpoints

### Issue: Utility Classes Not Working

**Symptoms:**
- Utility classes applied but no effect
- Classes show in inspector but no styles

**Solutions:**

1. **Ensure utilities are imported in global styles**:
   Check `frontend/src/styles.scss` includes:
   ```scss
   @import 'app/styles/utilities';
   ```

2. **Check for CSS specificity conflicts**:
   ```scss
   // Component style may override utility
   .my-component {
     padding: 10px !important;  // Overrides .p-lg
   }
   ```

3. **Verify class name is correct**:
   ```html
   <!-- Correct -->
   <div class="flex-center">Content</div>
   
   <!-- Incorrect -->
   <div class="center-flex">Content</div>
   ```

### Issue: Production Build Succeeds but Styles Look Wrong

**Symptoms:**
- Development looks correct
- Production build has missing or incorrect styles

**Solutions:**

1. **Check for CSS minification issues**: Some complex selectors may break
   ```scss
   // Avoid overly complex selectors
   .a .b .c .d .e .f { }  // Too deep
   ```

2. **Verify all imports are correct**: Production build is stricter

3. **Test production build locally**:
   ```bash
   cd frontend
   ng build --configuration=production
   ng serve --configuration=production
   ```

4. **Check for dynamic class names**: These may not work with tree-shaking
   ```typescript
   // Avoid
   const className = `my-component-${type}`;
   
   // Prefer
   const className = type === 'primary' ? 'my-component-primary' : 'my-component-secondary';
   ```

### Getting Help

If you're still stuck:

1. **Check the build output**: Look for specific error messages
2. **Review similar components**: See how they handle styling
3. **Verify file structure**: Ensure all files are in correct locations
4. **Clear cache and rebuild**:
   ```bash
   cd frontend
   rm -rf node_modules .angular
   npm install
   ng serve
   ```

5. **Check Angular documentation**: https://angular.io/guide/component-styles

---


## Best Practices

### 1. Always Use External Stylesheets

❌ **Never do this**:
```typescript
@Component({
  selector: 'app-my-component',
  template: `<div>Content</div>`,
  styles: [`
    .my-component {
      background: blue;
    }
  `]
})
```

✅ **Always do this**:
```typescript
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
```

### 2. Import Shared Modules at the Top

```scss
// Always at the top of your SCSS file
@import '../../../styles/variables';
@import '../../../styles/mixins';

// Then your component styles
.my-component {
  // ...
}
```

### 3. Use Variables for All Design Tokens

```scss
// ❌ Bad
.my-component {
  color: #667eea;
  padding: 24px;
  border-radius: 20px;
}

// ✅ Good
.my-component {
  color: $primary-color;
  padding: $spacing-lg;
  border-radius: $border-radius-xl;
}
```

### 4. Prefer Mixins Over Repeated Code

```scss
// ❌ Bad - Repeated pattern
.card-1 {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-2 {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

// ✅ Good - Use mixin
.card-1 {
  @include glass-effect;
}

.card-2 {
  @include glass-effect;
}
```

### 5. Follow BEM Naming Convention

```scss
// Block
.feature-card { }

// Element (use __)
.feature-card__header { }
.feature-card__content { }
.feature-card__footer { }

// Modifier (use --)
.feature-card--large { }
.feature-card--highlighted { }
.feature-card__header--centered { }
```

### 6. Use Utility Classes for Common Patterns

```html
<!-- ❌ Bad - Custom CSS for common pattern -->
<div class="my-custom-centered-container">
  Content
</div>

<!-- ✅ Good - Use utility class -->
<div class="flex-center p-lg rounded-lg">
  Content
</div>
```

### 7. Leverage Shared Animations

```scss
// ❌ Bad - Component-specific animation
@keyframes myFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.my-element {
  animation: myFadeIn 0.6s ease-in-out;
}

// ✅ Good - Use shared animation class
```

```html
<div class="animate-fade-in">Content</div>
```

### 8. Write Responsive Styles with Mixins

```scss
// ✅ Good - Clear and maintainable
.my-component {
  padding: $spacing-xl;
  font-size: $font-size-xl;
  
  @include respond-to('md') {
    padding: $spacing-lg;
    font-size: $font-size-lg;
  }
  
  @include respond-to('sm') {
    padding: $spacing-md;
    font-size: $font-size-base;
  }
}
```

### 9. Keep Selectors Shallow

```scss
// ❌ Bad - Too deep, hard to maintain
.my-component .header .title .text .span {
  color: blue;
}

// ✅ Good - Shallow, using BEM
.my-component__title-text {
  color: $primary-color;
}
```

### 10. Document Complex Styles

```scss
.my-component {
  // Glass effect with custom opacity for better contrast
  @include glass-effect(0.85, 25px);
  
  // Larger padding on desktop for better spacing
  padding: $spacing-xl;
  
  // Custom animation timing for smooth entrance
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  @include respond-to('sm') {
    // Reduce padding on mobile to maximize content area
    padding: $spacing-md;
  }
}
```

### 11. Avoid !important

```scss
// ❌ Bad - Using !important
.my-component {
  color: blue !important;
}

// ✅ Good - Increase specificity properly
.my-component.is-active {
  color: $primary-color;
}
```

### 12. Group Related Styles

```scss
.my-component {
  // Layout
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  
  // Appearance
  background: $primary-gradient;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-float;
  
  // Typography
  font-family: $font-family-primary;
  font-size: $font-size-base;
  color: $text-primary;
  
  // Transitions
  transition: $transition-smooth;
  
  // States
  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-deep;
  }
}
```

### 13. Test in Production Mode

Always test your styles in production mode before deploying:

```bash
cd frontend
ng build --configuration=production
```

Check for:
- Budget warnings/errors
- Missing styles
- Broken animations
- Incorrect colors

### 14. Keep Components Focused

Each component should have a single responsibility:

```scss
// ✅ Good - Focused component
.user-card {
  @include card-base;
  // Only user card specific styles
}

// ❌ Bad - Too many responsibilities
.user-card {
  // User card styles
  // Navigation styles
  // Footer styles
  // Modal styles
}
```

### 15. Use Semantic Class Names

```scss
// ❌ Bad - Non-semantic
.blue-box { }
.big-text { }
.mt-20 { }  // Exception: utility classes are OK

// ✅ Good - Semantic
.feature-card { }
.section-heading { }
.user-profile { }
```

---

## Summary

This CSS architecture provides:

- **Consistency**: Shared design tokens ensure visual consistency
- **Maintainability**: Centralized styles are easier to update
- **Performance**: Optimized CSS delivery stays under budget limits
- **Developer Experience**: Mixins and utilities speed up development
- **Scalability**: Architecture supports growth without technical debt

### Quick Reference

- **Variables**: `@import '../../../styles/variables'`
- **Mixins**: `@import '../../../styles/mixins'`
- **Animations**: Use `.animate-*` classes or import keyframes
- **Utilities**: Apply classes directly in HTML
- **Budget**: Keep component SCSS under 6KB
- **Naming**: Follow BEM convention
- **Testing**: Always test production builds

### Additional Resources

- [Angular Component Styles](https://angular.io/guide/component-styles)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [BEM Methodology](http://getbem.com/)
- [CSS Performance Best Practices](https://web.dev/css-performance/)

---

**Last Updated**: 2024
**Maintained By**: Development Team
**Questions?**: Check the troubleshooting section or review existing components for examples

