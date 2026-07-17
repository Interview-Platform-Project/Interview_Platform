# Product Design Specification

# Volume IV — Functional Modules

## Module III — Profile & Personal Analytics

---

# 127. Module Philosophy

The Profile module represents the user's professional identity within the platform.

It combines public information, private account settings, and long-term interview analytics into a single cohesive experience.

The goal is not to create another social profile, but to help users present themselves professionally while tracking their technical growth.

The Profile should answer three questions:

- Who am I?
- What have I achieved?
- How am I improving?

---

# 128. Module Objectives

The Profile module allows users to:

- Manage their public profile.
- Configure account settings.
- Update interview preferences.
- Monitor long-term statistics.
- Control profile visibility.
- Review personal achievements.
- Maintain a professional presence within the platform.

---

# 129. Information Architecture

The Profile consists of three major sections:

```
Profile

├── Public Profile
├── Account Settings
└── Personal Analytics
```

Each section serves a distinct purpose while sharing the same visual language.

---

# 130. Overall Layout

Desktop

```
┌──────────────────────────────────────────────────────────────┐
│ Sidebar │ Profile Header                                    │
│         ├────────────────────────────────────────────────────┤
│         │ Profile Summary                                   │
│         ├────────────────────────────────────────────────────┤
│         │ Tabs                                               │
│         │                                                    │
│         │ Public │ Settings │ Analytics                      │
│         ├────────────────────────────────────────────────────┤
│         │ Active Tab Content                                │
└──────────────────────────────────────────────────────────────┘
```

Navigation between sections should be instant without full-page reloads.

---

# 131. Profile Header

The header introduces the user's identity.

Contents:

- Avatar
- Full Name
- Professional Headline
- Experience Level
- Current Rating
- Availability Status

Primary Actions:

- Edit Profile
- Share Profile (future-ready)

Secondary Actions:

- Copy Public Link (future)

The header should remain visually lightweight.

---

# 132. Public Profile

The Public Profile defines how other users see the participant in the Marketplace.

Editable fields:

- Avatar
- Full Name
- Headline
- Biography
- Experience Level
- Technology Stack
- Spoken Languages
- Country
- Time Zone
- Availability

Optional:

- LinkedIn
- GitHub (future)
- Portfolio Website (future)

Users should always understand which fields are publicly visible.

---

# 133. Profile Visibility

Visibility should be configurable.

Supported options:

- Public
- Platform Members Only
- Hidden

Visibility settings should be explained using short descriptions.

Avoid ambiguous terminology.

---

# 134. Availability Management

Users should be able to update their current interview availability.

Statuses:

- Available
- Busy
- In Interview
- Away

Availability should be reflected instantly throughout the platform.

---

# 135. Account Settings

Private settings include:

Account

- Email
- Password
- Two-Factor Authentication (future)

Preferences

- Theme
- Language
- Time Zone
- Notification Preferences

Security

- Active Sessions
- Connected Devices (future)

Danger Zone

- Delete Account
- Export Personal Data (future)

Settings should prioritize clarity over density.

---

# 136. Personal Analytics

The Analytics section provides insight into the user's interview journey.

It should encourage improvement rather than competition.

Suggested widgets:

- Total Interviews
- Average Rating
- Total Interview Time
- Favorite Technology
- Current Streak
- Weekly Activity
- Monthly Activity

Charts should remain simple and minimal.

Avoid overly complex dashboards.

---

# 137. Technology Breakdown

Display technologies practiced across completed interviews.

Possible visualization:

- Horizontal bar chart.
- Compact percentage indicators.

Example:

React — 38%

TypeScript — 24%

Node.js — 18%

Go — 11%

Other — 9%

The goal is to visualize learning focus rather than mastery.

---

# 138. Rating Progress

Show the evolution of interview ratings over time.

Requirements:

- Time-based line chart.
- Average trend.
- Hover tooltip with interview details.

The visualization should emphasize progress rather than individual scores.

---

# 139. Activity Calendar

Display interview activity across recent months.

Inspired by GitHub contribution heatmaps.

Each day represents interview activity.

Darker intensity indicates more completed interviews.

The calendar should remain optional on smaller screens.

---

# 140. Achievements

Achievements should celebrate meaningful milestones without becoming overly gamified.

Examples:

- First Interview
- Ten Interviews Completed
- Fifty Interviews Completed
- First Five-Star Feedback
- One Month Streak

Achievements should remain subtle and secondary.

---

# 141. Edit Profile Flow

Editing should occur inline whenever possible.

Large modal dialogs should be avoided.

Changes should support:

- Save
- Cancel
- Auto-validation

Unsaved changes must be clearly communicated.

---

# 142. Empty States

Examples:

No biography.

No technologies selected.

No interview history.

No analytics available.

Each state should encourage completion of the profile.

---

# 143. Loading States

Skeleton placeholders should represent:

- Header
- Statistic Widgets
- Charts
- Profile Fields

Individual sections should load independently.

---

# 144. Error Handling

Possible scenarios:

- Failed to update profile.
- Avatar upload failed.
- Network unavailable.

Every error should include:

- Explanation.
- Recovery action.
- Retry option.

---

# 145. Accessibility

The Profile module must support:

- Keyboard navigation.
- Accessible forms.
- Focus indicators.
- Screen readers.
- Proper chart descriptions.

---

# 146. Responsive Behaviour

Desktop:

Tabbed layout.

Tablet:

Reduced spacing.

Mobile:

Tabs become segmented controls or horizontal scrolling.

Analytics stack vertically.

Charts simplify for readability.

---

# 147. Data Model Preview

```
User

id

name

headline

bio

avatar

experienceLevel

technologyStack

languages

country

timezone

availability

visibility

linkedin

createdAt

updatedAt
```

---

### Related Models

```
User
├── CandidateProfile
├── InterviewSession
├── Feedback
├── Statistics
└── Achievement
```

---

# 148. API Preview

```
GET /me
```

Retrieve current user profile.

---

```
PATCH /me
```

Update profile.

---

```
GET /me/statistics
```

Retrieve analytics.

---

```
GET /me/achievements
```

Retrieve achievements.

---

# 149. Event Flow

```
User Updates Profile
        ↓
Profile Saved
        ↓
Marketplace Updated
        ↓
Dashboard Updated
        ↓
Public Profile Refreshed
```

---

# 150. Component Dependencies

```
ProfileModule
├── ProfileHeader
├── TabNavigation
├── PublicProfileForm
├── SettingsForm
├── AnalyticsDashboard
├── StatisticWidget
├── ChartCard
└── AchievementCard
```

---

# 151. Developer Notes

The Profile module should separate editable account data from computed analytics.

Analytics should be loaded independently of editable profile information.

Charts should gracefully handle users with limited interview history.

The Public Profile form should reuse the same validation rules as the Marketplace profile creation flow.

---

# 152. Product Principles

The Profile should reinforce professional growth rather than social engagement.

Every statistic should encourage reflection and learning.

Public information should remain concise, relevant, and easy to maintain.

Avoid features that incentivize vanity metrics.