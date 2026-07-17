# Product Design Specification

# Volume III — Screen Specifications

## Part II — Authenticated Experience (Dashboard)

---

# 26. Dashboard Philosophy

The Dashboard is the user's personal workspace.

It should not function as a reporting page.

It should function as a launchpad for every major action inside the platform.

The Dashboard should answer four questions immediately:

- What should I do next?
- What happened recently?
- How am I progressing?
- Where can I go from here?

Every widget should justify its presence.

If a widget does not help answer one of these questions, it should not exist.

---

# 27. Layout Structure

Desktop

```
┌──────────────────────────────────────────────────────────────┐
│ Sidebar │ Header                                            │
│         ├────────────────────────────────────────────────────┤
│         │ Welcome Block                                     │
│         ├────────────────────────────────────────────────────┤
│         │ Statistics Widgets                                │
│         ├────────────────────────────────────────────────────┤
│         │ Upcoming Interviews                               │
│         ├───────────────────────┬────────────────────────────┤
│         │ Recent Activity       │ Quick Actions             │
│         ├───────────────────────┴────────────────────────────┤
│         │ Profile Summary                                 │
└──────────────────────────────────────────────────────────────┘
```

The layout should rely entirely on CSS Grid and Auto Layout.

---

# 28. Sidebar Navigation

Persistent navigation positioned on the left side.

---

## Sections

Main

- Dashboard
- Marketplace
- Interview History
- Leaderboard

Divider

Personal

- Profile
- Settings

Bottom Section

User Avatar

Theme Switch

Logout

---

Requirements

Current page always highlighted.

Icons always visible.

Collapsible.

Keyboard navigable.

---

Tablet

Collapsed by default.

---

Mobile

Transforms into Drawer.

---

# 29. Dashboard Header

Contains:

Greeting

Current Date

User Avatar

Optional Notification Button (future-ready)

---

Greeting examples

Good morning, Alex.

Ready for today's interviews?

---

Avoid generic dashboard titles.

---

# 30. Welcome Block

Purpose

Create context.

Display personalized information.

Contains

Avatar

↓

Name

↓

Current Role

↓

Interview Rating

↓

Short motivational message

↓

Primary CTA

Example

Start Interview

---

# 31. Statistics Widgets

The first visual block after the welcome section.

Each widget should remain compact.

---

Default widgets

Completed Interviews

Upcoming Interviews

Average Rating

Current Streak

---

Widget Structure

Icon

↓

Value

↓

Label

↓

Trend

↓

Optional Description

---

States

Loading

Empty

Normal

Error

---

# 32. Upcoming Interviews

Purpose

Display the user's next scheduled interviews.

Sorted chronologically.

---

Each item contains

Time

↓

Candidate

↓

Role

↓

Technology Stack

↓

Join Button

---

Requirements

If interview starts within 15 minutes

Highlight row.

---

If none exist

Display Empty State.

Primary CTA

Create Interview

---

# 33. Recent Activity

Shows latest actions.

Examples

Interview Completed

↓

Feedback Received

↓

Profile Updated

↓

New Candidate Request

↓

Invitation Accepted

---

Each item includes

Icon

↓

Description

↓

Timestamp

---

Should remain concise.

---

# 34. Quick Actions

Purpose

Allow users to perform the most common actions without navigation.

Actions

Create Interview

Browse Marketplace

Complete Profile

View History

---

Represented as large action cards.

---

# 35. Profile Summary

Displays

Avatar

↓

Role

↓

Experience

↓

Preferred Technologies

↓

Current Rating

↓

Edit Profile Button

---

This section should not replace the Profile page.

Provide only a quick overview.

---

# 36. Empty Dashboard

First-time users should never see an empty page.

Instead display

Welcome Message

↓

Illustration Placeholder

↓

Suggested Actions

↓

Create Candidate Card

↓

Browse Marketplace

↓

Start Your First Interview

---

# 37. Dashboard Loading State

Every widget loads independently.

Avoid blocking the entire dashboard.

Skeleton placeholders should replace content.

Never show full-page loading.

---

# 38. Personal Statistics

Statistics should motivate users.

Examples

Interviews Completed

Hours Interviewed

Average Rating

Favorite Technology

Most Practiced Stack

Weekly Progress

---

Avoid overwhelming users with charts.

Prefer concise metrics.

---

# 39. Notification Strategy

Notifications should remain passive.

Never interrupt workflows.

Future examples

Interview Invitation

↓

Reminder

↓

Feedback Received

↓

Marketplace Request

---

No notification center required in the first release.

---

# 40. Dashboard Responsiveness

Desktop

Two-column layout.

Widgets aligned using CSS Grid.

---

Tablet

Widgets reorganize into a single flowing layout.

Sidebar collapses.

---

Mobile

Vertical stacking.

Quick Actions become horizontally scrollable cards.

Statistics become two-column grid.

---

# 41. Dashboard Accessibility

Every widget should be keyboard accessible.

Cards must receive visible focus.

Screen readers should announce

Widget title

↓

Value

↓

Available action

---

# 42. Performance Guidelines

Dashboard should prioritize perceived performance.

Requirements

Lazy load non-critical widgets.

Load statistics independently.

Avoid layout shifts.

Skeletons instead of spinners.

---

# 43. Future Expansion

Dashboard architecture should allow insertion of future widgets without redesign.

Examples

Achievements

AI Recommendations

Learning Progress

Company Analytics

Upcoming Events

---

New widgets should integrate naturally into the existing grid.

---

# 44. Developer Handoff Notes

The Dashboard should be implemented using reusable widgets.

Recommended structure:

```
Dashboard
├── WelcomeCard
├── StatisticsGrid
│   └── StatisticWidget
├── UpcomingInterviews
│   └── InterviewCard
├── RecentActivity
│   └── ActivityItem
├── QuickActions
│   └── ActionCard
└── ProfileSummary
```

Each widget should own its own loading, empty, error and success states.

Avoid creating page-specific components when reusable patterns already exist.