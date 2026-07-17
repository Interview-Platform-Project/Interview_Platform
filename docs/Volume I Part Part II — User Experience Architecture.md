# Product Design Specification

# Volume I — Product Vision & UX Foundation

## Part II — User Experience Architecture

---

# 11. User Roles

At the initial stage of the product, the platform supports two user roles. Both roles share the majority of the interface and functionality to keep the product simple and reduce implementation complexity.

---

## Developer

A software engineer who wants to practice technical interviews, improve problem-solving skills, and build interview experience.

### Main Goals

- Practice interviews with other developers.
- Improve technical communication.
- Receive structured feedback.
- Track interview history.
- Improve interview performance over time.
- Build a public profile.
- Find suitable interview partners.

---

## Company Representative

An engineer or hiring manager conducting technical interviews.

Unlike developers, company representatives require an additional workspace for structured candidate evaluation during interviews.

### Main Goals

- Conduct technical interviews.
- Evaluate candidates.
- Write interview notes.
- Leave structured feedback.
- Review previous interviews.
- Manage interview sessions efficiently.

---

## Shared Experience

Both roles should feel like first-class citizens.

The interface must remain almost identical for both users.

The only contextual difference should appear inside the Interview Room, where company representatives gain access to the Interview Notes panel.

This approach keeps the platform consistent while allowing future role-specific expansion.

---

# 12. Primary Product Modules

The product is divided into several high-level functional modules.

Each module represents an independent area of responsibility.

---

## Public Area

Accessible without authentication.

Includes:

- Landing Page
- Login
- Registration
- About Product
- How It Works

---

## Personal Workspace

Accessible after authentication.

Includes:

- Dashboard
- Profile
- Settings
- Statistics

---

## Interview System

Core functionality.

Includes:

- Session Creation
- Session Joining
- Password-Protected Sessions
- Invitations
- Interview Room
- AI Assistant
- Collaborative Code Editor
- Camera Controls
- Microphone Controls

---

## Marketplace

Community-driven interview discovery.

Includes:

- Candidate Cards
- Search
- Filters
- Availability
- Interview Requests

---

## Feedback

Interview evaluation.

Includes:

- Rating
- Written Feedback
- Personal Reflection
- Previous Feedback History

---

## Statistics

Progress tracking.

Includes:

- Interview Count
- Success Metrics
- Personal Statistics
- Leaderboard

---

# 13. Information Architecture

The application should follow a flat and predictable navigation hierarchy.

```
Interview Platform

├── Landing
│
├── Authentication
│   ├── Login
│   └── Register
│
├── Onboarding
│
├── Dashboard
│   ├── Statistics
│   ├── Upcoming Interviews
│   ├── Recent Interviews
│   └── Quick Actions
│
├── Marketplace
│   ├── Candidate Feed
│   ├── Candidate Details
│   └── Filters
│
├── Interview
│   ├── Create Session
│   ├── Join Session
│   ├── Active Interview
│   ├── AI Assistant
│   └── Interview Notes
│
├── History
│
├── Feedback
│
├── Leaderboard
│
├── Profile
│
└── Settings
```

---

# 14. Navigation Structure

Navigation should remain extremely simple.

Avoid deep nesting.

The application should use a persistent left sidebar after authentication.

## Primary Navigation

- Dashboard
- Marketplace
- History
- Leaderboard
- Profile
- Settings

The currently active page should always be visually highlighted.

---

## Secondary Navigation

Secondary navigation should exist only where required.

Examples:

Marketplace

- All Candidates
- My Card
- Invitations

Profile

- Overview
- Statistics
- Account

History

- Interviews
- Feedback

---

# 15. Screen Inventory

The initial product release should contain the following screens.

## Public

Landing

Login

Registration

Forgot Password

---

## Onboarding

Choose Role

Complete Profile

Choose Technology Stack

Finish Setup

---

## Dashboard

Overview

Statistics

Upcoming Interviews

Recent Interviews

Quick Actions

---

## Marketplace

Candidate Feed

Candidate Details

Create Candidate Card

Search Results

---

## Interview

Create Session

Join Session

Password Entry

Interview Room

Interview Summary

---

## Feedback

Leave Feedback

Feedback Details

---

## History

Interview History

Interview Details

---

## Leaderboard

Leaderboard List

---

## Profile

Profile Overview

Edit Profile

---

## Settings

General

Appearance

Notifications

---

## System

404

500

Empty States

Loading States

Maintenance

---

# 16. Core User Flows

## Flow 1 — First-Time User

```
Landing

↓

Register

↓

Email Verification (optional)

↓

Choose Role

↓

Complete Profile

↓

Dashboard
```

---

## Flow 2 — Mock Interview

```
Dashboard

↓

Marketplace

↓

Choose Candidate

↓

Send Request

↓

Session Created

↓

Interview Room

↓

Feedback

↓

History
```

---

## Flow 3 — Company Interview

```
Dashboard

↓

Create Session

↓

Invite Candidate

↓

Interview Room

↓

Company Notes

↓

Feedback

↓

History
```

---

## Flow 4 — Join by Invitation

```
Invitation

↓

Password (optional)

↓

Join Session

↓

Interview

↓

Feedback
```

---

## Flow 5 — Returning User

```
Login

↓

Dashboard

↓

Upcoming Interview

↓

Interview Room
```

---

# 17. Functional Hierarchy

The importance of each feature should directly influence its visual prominence.

## Tier 1 — Core Features

These actions define the product.

- Start Interview
- Join Interview
- Code Editor
- AI Assistant
- Feedback

These features should always be easily accessible.

---

## Tier 2 — Frequently Used

- Marketplace
- Dashboard
- History
- Profile

Visible through primary navigation.

---

## Tier 3 — Secondary

- Leaderboard
- Statistics
- Settings

Accessible but visually less prominent.

---

# 18. Dashboard Strategy

The Dashboard should answer four questions immediately after login:

### What should I do next?

Upcoming interviews.

Primary call-to-action.

---

### What have I achieved?

Personal statistics.

Completed interviews.

Rating.

Performance metrics.

---

### What happened recently?

Recent interviews.

Recent feedback.

Recent activity.

---

### What can I do now?

Quick actions.

- Create Interview
- Browse Marketplace
- Edit Profile

---

# 19. Empty State Strategy

Every feature must include a dedicated empty state.

Examples:

No interview history.

No upcoming interviews.

No candidates found.

No leaderboard data.

No profile completed.

Each empty state should:

- Explain why the screen is empty.
- Suggest the next logical action.
- Include a primary CTA.
- Never leave the screen visually empty.

---

# 20. Error Strategy

Errors should always help users recover.

Examples:

Session not found.

Invalid password.

Camera permission denied.

Microphone unavailable.

Network disconnected.

Every error screen should include:

- Clear explanation.
- Recovery instructions.
- Retry action.
- Alternative navigation when possible.