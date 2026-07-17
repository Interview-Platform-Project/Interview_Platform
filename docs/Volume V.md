# Product Design Specification

# Volume V — Product Architecture

## Chapter II — Identity, Context & Permission Model

---

# 298. Architecture Philosophy

The platform follows a capability-based access model rather than a traditional role-based permission system.

Instead of assigning fixed global roles, the application determines available actions based on the user's identity, the current context, ownership of resources, and participation within a workflow.

This approach provides greater flexibility, simplifies future expansion, and more accurately reflects how collaborative applications evolve over time.

---

# 299. Core Concepts

The permission model is built on four independent concepts:

```
Identity
        ↓
Context
        ↓
Ownership
        ↓
Capabilities
```

Participation acts as an additional layer within collaborative modules, such as interview sessions.

Each concept should remain independent and composable.

---

# 300. Identity

Identity answers the question:

> **Who is using the application?**

The MVP defines two identities.

```
Anonymous

Authenticated User
```

### Anonymous

Can:

- View Landing Page
- Register
- Log In

Cannot:

- Access Workspace
- Create Sessions
- View Community Data
- Use AI Assistant

---

### Authenticated User

Can access all core product modules, subject to contextual capabilities.

Identity alone does not grant editing privileges or ownership.

---

# 301. Context

Context answers the question:

> **Where is the user operating?**

Examples:

```
Dashboard

Marketplace

History

Interview Session

Profile

Settings
```

Capabilities may vary depending on the active context.

A user may have permission to perform an action in one context but not in another.

---

# 302. Ownership

Ownership answers the question:

> **Does this resource belong to the current user?**

Examples of owned resources:

- Profile
- Marketplace Card
- Interview Session
- Feedback
- Notification Preferences

Ownership enables actions such as:

- Edit
- Delete
- Archive
- Publish
- Share

Resources owned by another user may expose only viewing capabilities.

---

# 303. Participation

Participation defines how a user is involved in a collaborative workflow.

For the MVP, interview sessions support the following participation states:

```
Session Owner

Participant
```

Future-ready states include:

```
Observer

Interviewer

Candidate

Hiring Manager

Technical Expert
```

Participation is local to a session and must not affect permissions outside that session.

---

# 304. Capability Model

Capabilities describe specific actions available to the user.

Examples:

```
Create Session

Edit Session

Delete Session

Join Session

Leave Session

Request AI Hint

Submit Feedback

View History

Edit Profile

Manage Settings
```

Capabilities should be granular and reusable.

---

# 305. Capability Resolution

Capabilities are determined dynamically.

```
Identity
        ↓
Context
        ↓
Ownership
        ↓
Participation
        ↓
Capabilities
```

The application should evaluate capabilities in this order.

---

# 306. Capability Categories

Capabilities are grouped into functional domains.

### Session

- Create
- Join
- Invite
- Cancel
- Start

---

### Marketplace

- Create Card
- Edit Card
- Archive Card
- Search Cards

---

### Interview

- Request AI Hint
- Submit Feedback
- View Participants

---

### Profile

- Edit Personal Information
- Upload Avatar
- Connect Services

---

### Settings

- Update Preferences
- Manage Integrations
- Configure Notifications

---

# 307. Authorization Principles

The permission system should satisfy the following principles:

- Least privilege by default.
- Explicit ownership rules.
- Context-aware capabilities.
- Predictable behavior.
- No hidden permissions.

Users should always understand why an action is or is not available.

---

# 308. Permission Feedback

When an action is unavailable, the interface should provide clear feedback.

Preferred approaches:

- Disabled controls with explanatory tooltips.
- Inline guidance.
- Empty states with actionable suggestions.

Permission errors should never appear as unexpected failures after interaction when they can be communicated beforehand.

---

# 309. Ownership Transfer

Some resources may change ownership.

Examples:

- Session ownership transferred to another participant (future).
- Organization ownership changes (future).

The permission model should support ownership transfer without requiring structural changes.

---

# 310. API & Backend Considerations

The backend should expose capabilities rather than hardcoded role checks whenever practical.

For example, instead of returning only user roles, APIs may include the actions available for the current resource.

Example response:

```
{
  "sessionId": "123",
  "capabilities": [
    "invite",
    "start",
    "cancel"
  ]
}
```

This keeps frontend behavior aligned with backend authorization and reduces duplicated permission logic.

---

# 311. UX Principles

Permissions should guide rather than block.

Whenever possible:

- show available actions;
- explain unavailable actions;
- avoid surprising authorization failures;
- keep the interface consistent across modules.

The goal is to make permissions feel natural rather than restrictive.

---

# 312. Future Evolution

The capability model is intentionally designed to support future expansion without changing its core architecture.

Examples include:

- Organization workspaces
- Team ownership
- Panel interviews
- External observers
- Moderators
- Premium features
- Enterprise administration

These additions should extend existing capabilities instead of introducing parallel permission systems.

---

# 313. Developer Mapping

The permission architecture should map consistently across the application stack:

- **Backend** — authorization policies and guards evaluate capabilities.
- **Frontend** — UI uses capabilities to determine visibility and availability of actions.
- **Design** — every interactive element documents the capability required to use it.
- **QA** — test scenarios verify allowed and restricted actions for each context.

This shared model ensures that all disciplines use the same authorization language.

---

# 314. Product Principles

Authorization should feel invisible when everything is allowed and informative when something is restricted.

Users should never have to guess whether they are permitted to perform an action. The interface should communicate available capabilities clearly, consistently, and as early as possible.