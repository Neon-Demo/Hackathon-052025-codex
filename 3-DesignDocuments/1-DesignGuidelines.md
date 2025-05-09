# Design Guidelines

## 1. Design Principles

### 1.1 Accessibility
- WCAG 2.1 AA compliance
- High contrast ratios (minimum 4.5:1)
- Keyboard navigation support
- Screen reader compatibility
- Resizable text without loss of functionality
- Focus indicators for interactive elements

### 1.2 Responsiveness
- Mobile-first approach
- Fluid layouts
- Breakpoints:
  - Mobile: 320px - 480px
  - Tablet: 481px - 768px
  - Desktop: 769px+
- Touch-friendly targets (minimum 44x44px)

### 1.3 Consistency
- Unified component library
- Consistent spacing system
- Standardized interaction patterns
- Predictable navigation patterns

### 1.4 Performance
- Lazy loading for images
- Progressive loading for data
- Optimized assets
- Offline-first approach

## 2. Typography

### 2.1 Font Family
- Primary: Inter (UI)
- Secondary: SF Pro Display (Headings)
- Monospace: SF Mono (Code/Data)

### 2.2 Font Sizes
```css
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
--font-size-3xl: 1.875rem; /* 30px */
--font-size-4xl: 2.25rem;  /* 36px */
```

### 2.3 Font Weights
```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 2.4 Line Heights
```css
--line-height-tight: 1.25;
--line-height-base: 1.5;
--line-height-relaxed: 1.75;
```

## 3. Spacing System

### 3.1 Base Units
```css
--spacing-unit: 0.25rem; /* 4px */
--spacing-xs: calc(var(--spacing-unit) * 2);     /*  8px */
--spacing-sm: calc(var(--spacing-unit) * 3);     /* 12px */
--spacing-md: calc(var(--spacing-unit) * 4);     /* 16px */
--spacing-lg: calc(var(--spacing-unit) * 6);     /* 24px */
--spacing-xl: calc(var(--spacing-unit) * 8);     /* 32px */
--spacing-2xl: calc(var(--spacing-unit) * 12);   /* 48px */
--spacing-3xl: calc(var(--spacing-unit) * 16);   /* 64px */
```

### 3.2 Layout Grid
- 12-column grid system
- Gutters: 24px (desktop), 16px (tablet), 12px (mobile)
- Margins: 32px (desktop), 24px (tablet), 16px (mobile)

## 4. Components

### 4.1 Buttons
- Primary: Filled background, high contrast
- Secondary: Outlined, medium contrast
- Tertiary: Text-only, low contrast
- States: Default, Hover, Active, Disabled
- Size variants: Small, Medium, Large

### 4.2 Forms
- Input fields: 40px height (desktop), 48px (mobile)
- Labels: Above inputs
- Helper text: Below inputs
- Error states: Red accent, icon, message
- Success states: Green accent, icon, message

### 4.3 Cards
- Consistent padding (16px)
- Optional header
- Optional footer
- Shadow elevation system
- Hover states for interactive cards

### 4.4 Tables
- Zebra striping for readability
- Sticky headers
- Responsive patterns
- Sort indicators
- Selection states

### 4.5 Navigation
- Clear hierarchy
- Active state indicators
- Breadcrumb trails
- Progress indicators
- Back buttons where appropriate

## 5. Interaction States

### 5.1 Hover States
- Subtle background changes
- Cursor changes
- Shadow adjustments
- Scale transforms (where appropriate)

### 5.2 Active States
- Color intensity increase
- Position/scale adjustments
- Immediate feedback

### 5.3 Focus States
- High contrast outline
- No loss of content
- Clearly visible
- Keyboard accessible

### 5.4 Loading States
- Skeleton screens
- Progress indicators
- Spinners for short waits
- Progress bars for longer operations

## 6. Motion

### 6.1 Timing
```css
--transition-fast: 100ms;
--transition-base: 200ms;
--transition-slow: 300ms;
```

### 6.2 Easing
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### 6.3 Animation
- Subtle and purposeful
- Support reduced motion preferences
- Consistent timing
- Natural easing

## 7. Icons

### 7.1 System
- Material Icons (filled)
- 24x24px base size
- Consistent stroke width
- Aligned to pixel grid

### 7.2 Usage
- Clear meaning
- Accompanied by labels where needed
- Consistent positioning
- Appropriate sizing

## 8. Images

### 8.1 Aspect Ratios
- 16:9 for landscapes
- 4:3 for documents
- 1:1 for avatars/thumbnails
- 2:3 for portraits

### 8.2 Quality
- Optimized file sizes
- Appropriate formats (WebP with fallbacks)
- Resolution switching
- Lazy loading

## 9. Dark Mode

### 9.1 Colors
- Automatic dark mode detection
- Maintain contrast ratios
- Reduce eye strain
- Preserve brand colors

### 9.2 Images
- Dark mode variants where needed
- Adjusted contrast
- Appropriate shadows
- Maintained readability
