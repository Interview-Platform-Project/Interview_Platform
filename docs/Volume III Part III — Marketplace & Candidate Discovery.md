# Product Design Specification

# Volume III — Screen Specifications

## Part III — Marketplace & Candidate Discovery

---

# 45. Marketplace Philosophy

The Marketplace is the community hub of the platform.

Its primary goal is to help users quickly find suitable interview partners based on their experience, technology stack, and availability.

Unlike traditional job boards, the Marketplace is not intended for recruitment.

It is designed to facilitate learning, practice, and technical collaboration.

The experience should feel lightweight, approachable, and efficient.

Users should be able to find a suitable interview partner within one minute.

---

# 46. Marketplace Objectives

The Marketplace must allow users to:

- Discover interview partners.
- Filter candidates by relevant criteria.
- View public profiles.
- Send interview requests.
- Accept or decline requests.
- Create or edit their own candidate card.
- Monitor their availability.

The interface should prioritize discoverability over density.

---

# 47. Layout Structure

Desktop

```
┌──────────────────────────────────────────────────────────────┐
│ Sidebar │ Marketplace Header                               │
│         ├────────────────────────────────────────────────────┤
│         │ Search Bar                                        │
│         ├────────────────────────────────────────────────────┤
│         │ Filters                                            │
│         ├────────────────────────────────────────────────────┤
│         │ Candidate List                                     │
└──────────────────────────────────────────────────────────────┘
```

Candidate profiles should be displayed in a vertical list.

Avoid masonry layouts or dense card grids.

---

# 48. Marketplace Header

Contains:

- Page Title
- Candidate Count
- "Create My Card" button (if no profile exists)
- "Edit My Card" button (if profile already exists)

The header should remain compact and avoid unnecessary statistics.

---

# 49. Search Experience

Search should be one of the primary interaction methods.

Capabilities:

- Search by name.
- Search by technology.
- Search by keyword in biography.

Search results should update instantly.

A clear button should always be visible when input contains text.

---

# 50. Filtering System

Filters should appear directly below the search bar.

Initially supported filters:

- Technology Stack
- Experience Level
- Languages
- Availability
- Time Zone (optional)

Filters should remain simple and avoid overwhelming users.

Collapsed by default on mobile devices.

---

# 51. Candidate List

Candidates are displayed as a vertical feed.

Each row should occupy the full available width.

Rows should maintain generous spacing and remain easy to scan.

Hover states should clearly indicate interactivity.

Infinite scrolling may be introduced in future versions, but the initial implementation should use pagination or "Load More" depending on technical preference.

---

# 52. Candidate Card

The Candidate Card is the central object of the Marketplace.

Each card should present enough information for users to decide whether they want to start an interview.

Structure:

- Avatar
- Full Name
- Experience Level
- Primary Technology Stack
- Additional Technologies
- Languages
- Short Biography (maximum three lines)
- Total Interviews
- Average Rating
- Availability Status
- Primary Action ("Request Interview")

Optional metadata:

- Country
- Local Time
- Member Since

Cards should never exceed a comfortable reading height.

---

# 53. Availability States

Every candidate should expose one of the following statuses:

- Available
- Busy
- In Interview
- Offline

Status indicators should combine color with text or iconography.

Color alone must never communicate availability.

---

# 54. Candidate Profile

Selecting a candidate opens a dedicated profile page.

Contents:

Header:

- Avatar
- Name
- Headline
- Experience Level

Professional Information:

- Technology Stack
- Languages
- Biography

Statistics:

- Interviews Completed
- Average Rating
- Preferred Technologies

Availability

Primary Action:

- Request Interview

Secondary Action:

- Copy Profile Link (future-ready)

---

# 55. Create Candidate Card

Users without a public profile should be guided through a lightweight creation flow.

Required fields:

- Display Name
- Experience Level
- Technology Stack

Optional fields:

- Biography
- Languages
- Country
- Time Zone
- Avatar

The form should support draft saving.

---

# 56. Interview Request Flow

1. User opens candidate profile.
2. Clicks "Request Interview".
3. Selects date and time (optional for MVP).
4. Sends request.
5. Candidate receives notification.
6. Candidate accepts or declines.
7. Upon acceptance, an interview session is automatically created.

The flow should require as few steps as possible.

---

# 57. Marketplace Empty States

Examples:

No candidates found.

No profile created.

No search results.

No matching filters.

Each empty state should explain why the list is empty and provide a clear next action.

---

# 58. Loading States

Candidate cards should display skeleton placeholders.

Filters and search should remain interactive whenever possible during loading.

Avoid blocking the entire page.

---

# 59. Error States

Possible scenarios:

- Failed to load candidates.
- Network unavailable.
- Failed to send interview request.
- Candidate unavailable.

Every error should provide a recovery action.

---

# 60. Responsive Behaviour

Desktop:

Search and filters remain visible.

Tablet:

Filters may collapse into a popover.

Mobile:

Search occupies the full width.

Filters move into a bottom sheet or drawer.

Candidate cards become more compact while preserving readability.

---

# 61. Accessibility

Marketplace must support:

- Full keyboard navigation.
- Visible focus indicators.
- Screen reader compatibility.
- Proper labeling of filters and actions.

---

# 62. Performance Considerations

Marketplace should remain responsive even with a large number of candidates.

Recommendations:

- Server-side pagination.
- Debounced search input.
- Lazy loading of avatars.
- Optimistic UI for interview requests where appropriate.

---

# 63. Developer Handoff Notes

Suggested component structure:

```
MarketplacePage
├── MarketplaceHeader
├── SearchBar
├── FilterPanel
├── CandidateList
│   ├── CandidateCard
│   ├── CandidateCardSkeleton
│   └── EmptyState
└── Pagination
```

Candidate cards should be composed entirely from reusable design system components such as Avatar, Badge, Button, Statistic, and StatusIndicator.