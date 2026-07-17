# Product Design Specification

# Volume II — Design System Specification

---

# 1. Design System Philosophy

The design system is the foundation of the entire product.

Its primary objective is not visual beauty, but consistency, scalability, accessibility, and developer efficiency.

Every interface element must originate from the design system.

No page should introduce custom visual solutions unless absolutely necessary.

The design system must allow the product to scale without requiring redesign of existing interfaces.

Every component should be reusable.

Every style should be tokenized.

Every layout should be responsive by default.

---

# 2. Design Principles

The design system follows six fundamental principles.

## Consistency

Similar problems must always have similar solutions.

Buttons should always look and behave identically.

Inputs should always behave identically.

Spacing should remain predictable.

Typography should remain consistent.

---

## Simplicity

Prefer the smallest possible number of component variants.

Avoid creating new components when existing ones can be extended.

---

## Composability

Large UI blocks should be composed from smaller reusable components.

For example:

```
Interview Card

↓

Avatar
Badge
Button
Status
Tags
```

instead of designing Interview Card independently.

---

## Accessibility

Every interactive element must satisfy accessibility standards.

Keyboard navigation is mandatory.

Focus visibility is mandatory.

Minimum contrast ratio must satisfy WCAG AA.

---

## Predictability

Every interaction should feel familiar.

No experimental navigation.

No surprising animations.

No hidden interactions.

---

## Scalability

The system should comfortably support future product expansion without visual inconsistency.

---

# 3. Technology Alignment

The design system is intended to map directly to the frontend implementation.

Technology stack:

- Next.js
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- CSS Variables

Design decisions should avoid introducing patterns that are difficult to implement using these technologies.

---

# 4. Design Tokens

Every visual property must originate from a reusable token.

Hardcoded values should be avoided whenever possible.

The following token categories are required.

## Color Tokens

```
Primary

Secondary

Accent

Success

Warning

Danger

Info

Surface

Background

Border

Muted

Overlay
```

---

## Typography Tokens

```
Display

Heading

Title

Body

Label

Caption

Code
```

---

## Radius Tokens

```
4

8

12

16

20

24
```

---

## Spacing Tokens

The design system follows a strict 4px spacing scale.

```
4

8

12

16

20

24

32

40

48

56

64

80

96
```

No arbitrary spacing values should exist.

---

## Shadow Tokens

```
xs

sm

md

lg

xl
```

Shadows should remain subtle.

Avoid excessive elevation.

---

## Motion Tokens

```
Fast

Normal

Slow
```

Recommended durations:

```
100ms

150ms

200ms

300ms
```

Avoid animations longer than 300ms.

---

# 5. Color System

The visual language should be heavily inspired by Raycast and Linear.

The interface should appear calm and professional.

Primary colors should never dominate the interface.

Accent colors should guide attention rather than decorate the UI.

---

## Primary Palette

Muted Purple

Muted Blue

Muted Cyan

Very low saturation.

No neon colors.

No highly saturated gradients.

---

## Neutral Palette

Large grayscale palette.

Neutral colors should compose approximately 90% of the interface.

Accent colors should compose approximately 10%.

---

## Feedback Colors

Success

Green

Warning

Amber

Danger

Red

Info

Blue

Each color must have:

```
Background

Foreground

Border

Hover

Pressed
```

---

# 6. Theme Strategy

Both Light and Dark themes are first-class citizens.

Neither theme should feel like an afterthought.

Dark mode should become the primary working environment.

Light mode should preserve identical hierarchy and spacing.

All colors must be implemented through Variables.

No duplicated components for themes.

---

# 7. Typography

Typography should feel similar to Raycast.

Preferred fonts:

Primary

Geist

Fallback

Inter

System

Every text element must belong to a typography token.

Hierarchy:

```
Display

H1

H2

H3

H4

Body Large

Body

Body Small

Label

Caption

Code
```

---

## Code Typography

The code editor should use a monospace font.

Recommended:

JetBrains Mono

or

Geist Mono

The editor should resemble VS Code Dark+.

---

# 8. Grid System

Desktop:

12-column layout

Large content width

Generous whitespace

Tablet:

8-column layout

Mobile:

4-column layout

Layouts should rely on Auto Layout rather than absolute positioning.

---

# 9. Iconography

Use Lucide Icons exclusively.

Guidelines:

- outline style only
- consistent stroke width
- avoid filled icons
- icons should communicate function, not decoration
- every icon button must include tooltip support

---

# 10. Corner Radius

Use the following radius scale only:

```
4

8

12

16

20

24
```

Recommendations:

Buttons → 8

Cards → 12

Dialogs → 16

Avatars → full

Tags → full

---

# 11. Elevation

Elevation should communicate hierarchy.

Avoid floating everything.

Recommended levels:

Background

↓

Surface

↓

Card

↓

Popover

↓

Modal

↓

Toast

The majority of the interface should remain visually flat.

---

# 12. Borders

The interface should rely more on borders than shadows.

Thin borders.

Subtle contrast.

Never use thick borders.

---

# 13. Layout Philosophy

Whitespace is a design element.

Never attempt to fill every available space.

Interfaces should breathe.

Users should immediately identify:

Primary action

↓

Secondary information

↓

Additional context

---

# 14. Auto Layout Requirements

Every single frame must use Auto Layout.

No exceptions.

Every component must resize naturally.

No fixed positioning unless technically necessary.

The design should support dynamic content without breaking.

---

# 15. Component Architecture

Components should follow a layered hierarchy.

```
Foundations

↓

Primitives

↓

Components

↓

Patterns

↓

Templates

↓

Screens
```

---

## Foundations

Colors

Typography

Spacing

Radius

Elevation

Icons

Motion

---

## Primitives

Button

Input

Label

Icon

Avatar

Badge

Separator

Spinner

---

## Components

Dropdown

Dialog

Card

Tooltip

Toast

Tabs

Table

Pagination

Command

Search

Empty State

---

## Patterns

Dashboard Widgets

Interview Layout

Candidate Card

Feedback Card

Statistic Block

Navigation

Sidebar

---

## Templates

Dashboard

Profile

Marketplace

Interview

History

Leaderboard

Landing

---

## Screens

The actual application pages.

---

# 16. Naming Convention

Every component must follow a predictable naming scheme.

```
Component

↓

Variant

↓

State

↓

Size
```

Example:

```
Button

Primary

Default

Medium
```

instead of vague names like:

```
Button New
Button Final
Primary Copy
```

---