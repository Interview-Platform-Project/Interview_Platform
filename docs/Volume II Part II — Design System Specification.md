# Product Design Specification

# Volume II — Design System Specification

## Part II — Component Library Specification

---

# 17. Component Philosophy

Every component within the design system must satisfy the following requirements.

- Fully reusable.
- Theme-aware.
- Responsive.
- Accessible.
- Built entirely with Auto Layout.
- Compatible with shadcn/ui architecture.
- Scalable without redesign.
- Independent from page-specific layouts.

Components should never be designed for a single screen.

Instead, every component should solve a general interface problem.

---

# 18. Component Inventory

The design system should include the following component categories.

## Foundations

- Color Tokens
- Typography Tokens
- Spacing Tokens
- Radius Tokens
- Shadow Tokens
- Motion Tokens
- Icon Tokens

---

## Navigation

- Sidebar
- Top Navigation
- Breadcrumb
- Tabs
- Pagination
- Context Menu
- Command Palette

---

## Inputs

- Input
- Password Input
- Search Input
- Textarea
- Number Input
- Select
- Multi Select
- Combobox
- Checkbox
- Radio
- Switch
- Slider
- Date Picker (future-ready)

---

## Buttons

- Primary Button
- Secondary Button
- Outline Button
- Ghost Button
- Link Button
- Destructive Button
- Icon Button

---

## Data Display

- Badge
- Tag
- Avatar
- Tooltip
- Card
- Statistic Card
- Progress
- Divider
- Code Block

---

## Overlay

- Dialog
- Drawer
- Sheet
- Popover
- Dropdown
- Toast
- Alert

---

## Feedback

- Spinner
- Skeleton
- Empty State
- Error State
- Success State

---

## Product Components

- Candidate Card
- Interview Card
- Session Card
- AI Sidebar
- AI Hint
- Camera Tile
- Code Editor Container
- Notes Sidebar
- Feedback Card
- Leaderboard Row
- Statistic Widget

---

# 19. Button Specification

Buttons are the primary interaction element of the platform.

Buttons should never compete for attention.

Every screen should contain only one Primary Button whenever possible.

---

## Variants

- Primary
- Secondary
- Outline
- Ghost
- Link
- Destructive

---

## Sizes

- Small
- Medium
- Large

---

## States

Every button must support:

- Default
- Hover
- Active
- Focus
- Disabled
- Loading

---

## Content Rules

A button may contain:

- Label
- Leading Icon
- Trailing Icon
- Loading Spinner

Never both spinner and icons simultaneously.

---

## Interaction

Hover

Slight background transition.

Active

Subtle pressed effect.

Focus

Visible focus ring.

Loading

Disable interaction.

Keep width unchanged.

---

# 20. Input Specification

Inputs should feel lightweight and developer-oriented.

---

## Types

- Text
- Email
- Password
- Search
- URL
- Number

---

## States

- Empty
- Filled
- Focus
- Hover
- Disabled
- Error
- Success

---

## Optional Elements

- Label
- Description
- Error Message
- Prefix Icon
- Suffix Icon
- Character Counter

---

# 21. Search Component

Search is one of the primary interaction methods.

Used in:

- Marketplace
- History
- Leaderboard
- Dashboard
- Profile

Requirements:

- Instant feedback.
- Clear button.
- Keyboard focus.
- Search icon.
- Optional filters.

---

# 22. Card System

Cards represent high-level objects.

Cards must never become overloaded.

Maximum hierarchy:

Title

↓

Metadata

↓

Actions

---

Card Types

- Candidate Card
- Interview Card
- Statistic Card
- Feedback Card

---

# 23. Candidate Card

This is one of the most important components.

Contents:

Avatar

↓

Name

↓

Experience Level

↓

Technology Stack

↓

Languages

↓

Interview Count

↓

Rating

↓

Availability Status

↓

Interview Button

Optional:

Country

Timezone

Bio

---

Variants

Compact

Default

Expanded

---

States

Normal

Hover

Selected

Disabled

Loading

---

# 24. Avatar

Variants

Circle

Square

Sizes

XS

SM

MD

LG

XL

States

Online

Offline

Busy

In Interview

---

# 25. Badge

Used for

Technology

Status

Role

Interview Level

Interview Count

Experience

Variants

Neutral

Success

Warning

Danger

Info

Primary

---

# 26. Sidebar

Primary navigation.

Should remain fixed.

Collapsible.

Responsive.

Contains:

Logo

↓

Navigation

↓

Divider

↓

Profile

↓

Settings

---

Desktop

Expanded by default.

---

Tablet

Collapsed.

---

Mobile

Drawer.

---

# 27. Dialog

Used for

Create Session

Confirmation

Delete

Password Entry

Settings

Requirements

Close by ESC.

Click outside.

Trap keyboard focus.

Responsive width.

---

# 28. Toast

Variants

Success

Warning

Error

Info

Requirements

Auto dismiss.

Manual dismiss.

Stack support.

Top Right on Desktop.

Bottom Center on Mobile.

---

# 29. Tooltip

Every icon-only button must include tooltip support.

Delay:

Approximately 300ms.

Keyboard accessible.

---

# 30. Empty State

Every module must include a dedicated Empty State component.

Structure

Illustration Placeholder (minimal)

↓

Title

↓

Description

↓

Primary Action

↓

Optional Secondary Action

Avoid large decorative illustrations.

---

# 31. Error State

Structure

Error Icon

↓

Title

↓

Description

↓

Retry

↓

Secondary Navigation

Errors should explain the solution.

Not only the problem.

---

# 32. Skeleton

Skeletons should replace loading spinners whenever layout is already known.

Examples

Dashboard

Marketplace

Profile

History

Feedback

Leaderboard

---

# 33. Statistic Widget

Dashboard uses reusable statistic widgets.

Structure

Label

↓

Value

↓

Change Indicator

↓

Optional Chart

↓

Description

Variants

Compact

Expanded

---

# 34. Leaderboard Row

Structure

Rank

↓

Avatar

↓

Name

↓

Rating

↓

Interview Count

↓

Stack

↓

Profile Button

Top three users receive subtle visual emphasis.

Avoid excessive gamification.

---

# 35. AI Sidebar

One of the signature product components.

The AI Sidebar occupies the right side of the Interview Room.

Structure:

Header

- AI Assistant
- Remaining Hints (e.g. 2 / 3)

Hint History

- Chronological list of previous hints

Primary Action

- "Get Hint" button (disabled after 3 uses)

Status Area

- Displays generation progress while waiting for AI

Requirements:

- All participants see the same hint history in real time.
- Hint generation should not block the rest of the interface.
- The sidebar must remain usable on smaller desktop screens by becoming collapsible.

---

# 36. Camera Tile

The Camera Tile is intentionally minimal.

Structure:

- Video Feed
- User Name
- Role Badge (Developer / Company)
- Microphone Status
- Camera Status
- Speaking Indicator

States:

- Camera On
- Camera Off
- Microphone Muted
- Connection Lost
- Loading
- Speaking

Camera tiles should prioritize video clarity over decorative UI.

---

# 37. Interview Notes Panel (Company Only)

This component is visible only to users with the Company role.

Purpose:

Provide a private workspace for interview observations.

Structure:

- Candidate Information (collapsed by default)
- Rich Text Notes (basic formatting only)
- Quick Rating (0–10)
- Checklist (optional future enhancement)

Requirements:

- Notes are never visible to the candidate.
- Auto-save every few seconds.
- Clear indication that notes are private.

---

# 38. Code Editor Container

The code editor is the primary workspace of the application.

Requirements:

- Resembles a simplified VS Code editor.
- Single editable file.
- Language selector.
- Line numbers.
- Syntax highlighting.
- Auto-completion support (implementation-ready).
- Collaborative cursor indicators.
- Connection status.
- Editor toolbar with minimal controls.

The surrounding UI should never distract from the editor itself.

---

## Design Review Checklist

At the end of this section I would add a checklist that every new component must satisfy before being added to the UI Kit:

- Reusable by design.
- Supports Light and Dark themes.
- Uses only design tokens (no hardcoded values).
- Built with Auto Layout.
- Has all required interaction states.
- Keyboard accessible.
- Responsive.
- Compatible with shadcn/ui patterns.
- Clearly named following the design system convention.
- Documented with usage guidelines and examples.