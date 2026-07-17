# Product Design Specification

# Volume V — Product Architecture

## Chapter I — Application Navigation

---

# 262. Navigation Philosophy

Navigation should be predictable, unobtrusive, and consistent across the entire application.

Users should always understand:

- where they are;
- how they arrived there;
- where they can go next.

Navigation should support uninterrupted workflows rather than encourage exploration for its own sake.

The application should feel like a cohesive workspace rather than a collection of disconnected pages.

---

# 263. Navigation Principles

The navigation system follows five core principles.

### Consistency

Navigation behaves identically across all modules.

---

### Persistence

Primary navigation remains available throughout authenticated sections of the application.

---

### Context Awareness

The interface clearly communicates the current location within the product.

---

### Minimalism

Only navigation relevant to the current context should be visible.

---

### Recoverability

Users should always be able to return to a previous meaningful state without losing progress.

---

# 264. Navigation Structure

The application consists of two major navigation contexts.

```
Public Application

├── Landing
├── Login
├── Register
└── Forgot Password
```

↓

```
Authenticated Workspace

├── Dashboard
├── Marketplace
├── Session
├── History
├── Leaderboard
├── Profile
├── Settings
```

The transition between public and authenticated areas should be immediate and clearly communicated.

---

# 265. Primary Navigation

Authenticated users navigate using a persistent left sidebar.

The sidebar contains:

- Dashboard
- Marketplace
- History
- Leaderboard
- Profile
- Settings

Persistent utility items:

- Notifications
- User Menu

The active destination should always be visually indicated.

---

# 266. Workspace Navigation

The Interview Workspace is intentionally isolated from the main application navigation.

During an active interview:

- the primary sidebar is hidden;
- browser distractions are minimized;
- interview-specific controls replace global navigation.

Users should remain focused on the interview until it ends.

---

# 267. Secondary Navigation

Modules may include local navigation.

Examples:

Profile

- Public Profile
- Analytics
- Settings

History

- Timeline
- Interviews
- Statistics

Settings

- Appearance
- Editor
- Privacy
- Notifications

Secondary navigation should never compete visually with the primary navigation.

---

# 268. Navigation Hierarchy

Priority:

```
Workspace

↓

Primary Navigation

↓

Secondary Navigation

↓

Local Controls
```

Users should immediately distinguish navigation from page-specific actions.

---

# 269. Context Preservation

Whenever possible, navigation should preserve the user's current context.

Examples:

- Search queries remain when returning from details.
- Selected filters persist.
- Scroll position is restored.
- Active tab remains selected.
- Unsaved forms are protected.

Unexpected resets should be avoided.

---

# 270. Deep Linking

Every meaningful screen should have a shareable URL.

Examples:

```
/marketplace

/profile/john

/interviews/123

/history

/settings/editor
```

URLs should be readable and predictable.

---

# 271. Breadcrumb Strategy

Breadcrumbs should be used only where hierarchical navigation exists.

Example:

```
History

↓

Interview

↓

Feedback
```

The Interview Workspace should not display breadcrumbs.

---

# 272. Navigation Feedback

Users should always receive immediate feedback after navigation.

Examples:

- active menu state;
- loading indicator;
- page title update;
- browser history update.

Navigation should feel instantaneous whenever possible.

---

# 273. Page Titles

Each page should expose a unique title.

Examples:

Dashboard

Marketplace

Interview History

Settings

Interview Session

Titles should remain consistent across browser tabs and internal headers.

---

# 274. Back Navigation

Browser back navigation should behave predictably.

Returning from a detail page should restore:

- filters;
- sorting;
- pagination;
- scroll position.

Back navigation should never unexpectedly redirect to the dashboard.

---

# 275. Modal Navigation

Temporary tasks should be completed within modal dialogs only when:

- the task is short;
- it does not require complex navigation;
- leaving the current page would be disruptive.

Large workflows should use dedicated pages instead.

---

# 276. Mobile Navigation

Desktop:

Persistent Sidebar.

Tablet:

Collapsible Sidebar.

Mobile:

Bottom Navigation for primary destinations.

Overflow destinations appear in a More menu.

The Interview Workspace remains a dedicated full-screen experience.

---

# 277. Accessibility

Navigation must support:

- keyboard navigation;
- skip links;
- focus management;
- screen readers;
- visible focus states.

Users navigating without a mouse should experience no loss of functionality.

---

# 278. Developer Notes

Navigation should be configuration-driven rather than hardcoded.

Routes, labels, permissions, and icons should originate from a centralized navigation configuration.

This enables future expansion without restructuring the navigation system.

---

# 279. Product Principles

Navigation should disappear into the background.

The best navigation is the one users rarely have to think about.

Every transition should reinforce confidence and maintain workflow continuity.