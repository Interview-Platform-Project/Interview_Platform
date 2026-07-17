# Product Design Specification

# Volume IV — Functional Modules

## Module IV — Session Creation & Invitation

---

# 153. Module Philosophy

The Session Creation module is the gateway into every interview.

Its purpose is to make starting an interview effortless while supporting both scheduled and instant collaboration.

The creation flow should feel lightweight, predictable, and require the minimum number of decisions.

Users should be able to create and join a session in less than one minute.

---

# 154. Module Objectives

The module enables users to:

- Create interview sessions.
- Configure session settings.
- Invite participants.
- Protect sessions with passwords.
- Generate shareable links.
- Manage invitations before the interview begins.

The experience should emphasize speed without sacrificing clarity.

---

# 155. Session Types

The platform supports three primary session types.

### Instant Session

Starts immediately after another participant joins.

Ideal for mock interviews.

---

### Scheduled Session

Created for a future date and time.

Participants receive reminders before the interview.

---

### Private Session

Protected by a password or invitation link.

Used for company interviews or private practice.

---

The session type should be selected during creation.

---

# 156. User Entry Points

Users may create a session from several locations.

Supported entry points:

- Dashboard ("Start Interview")
- Marketplace ("Request Interview")
- Candidate Profile ("Request Interview")
- Interview History ("Repeat Interview" — future-ready)
- Direct Invitation Link

Regardless of the entry point, users should always experience the same creation flow.

---

# 157. Session Creation Flow

```
Choose Session Type
        ↓
Configure Session
        ↓
Invite Participants
        ↓
Review Settings
        ↓
Create Session
        ↓
Waiting Room
        ↓
Interview Workspace
```

The flow should remain linear and easy to understand.

---

# 158. Configure Session

Required fields:

- Session Title
- Programming Language

Optional fields:

- Technology Stack
- Difficulty Level
- Description
- Password Protection
- Scheduled Start Time

Future-ready:

- Interview Template
- Time Limit
- AI Difficulty
- Recording Policy

---

# 159. Invitation Methods

Supported invitation methods:

- Username search
- Marketplace selection
- Shareable invitation link
- Telegram notification (after acceptance)
- Manual invitation code (future)

Invitation methods should be interchangeable.

---

# 160. Invitation Status

Every invitation should display one of the following states:

- Pending
- Accepted
- Declined
- Expired
- Cancelled

Status updates should occur in real time.

---

# 161. Waiting Room

After creating a session, users enter the Waiting Room.

Purpose:

Provide a calm space before the interview begins.

Displayed information:

- Session Title
- Scheduled Time (if applicable)
- Invited Participants
- Participant Status
- Session Password (if enabled)
- Share Invitation Link

Primary actions:

- Copy Link
- Invite More Participants
- Cancel Session
- Start Session (when allowed)

The interview should begin automatically once all required participants have joined, unless manual start is enabled in future versions.

---

# 162. Participant States

Participants may appear as:

- Invited
- Joining
- Connected
- Ready
- Disconnected

Each state should include both iconography and text.

---

# 163. Session Summary Card

Throughout the creation flow, display a compact summary card showing:

- Session Title
- Language
- Technologies
- Session Type
- Number of Participants
- Password Status

This card should update in real time as settings change.

---

# 164. Password Protection

When enabled:

- Password field becomes visible.
- Show password strength indicator.
- Allow password visibility toggle.
- Provide "Copy Password" action.

The password should never be displayed after the session has started.

---

# 165. Shareable Link

Every session generates a unique invitation link.

Users should be able to:

- Copy the link.
- Regenerate the link (future).
- View invitation status.

The interface should clearly indicate whether the link is public or private.

---

# 166. Empty States

Examples:

- No invited participants.
- No scheduled sessions.
- No available users.

Each empty state should guide the user toward the next action.

---

# 167. Loading States

Skeleton placeholders should be displayed for:

- Session Summary
- Participant List
- Invitation Results

The interface should remain interactive whenever possible.

---

# 168. Error Handling

Possible scenarios:

- Failed to create session.
- Invalid password.
- Invitation failed.
- User unavailable.
- Session limit reached.

Every error should provide:

- Clear explanation.
- Recovery action.
- Retry option.

---

# 169. Accessibility

The Session Creation flow must support:

- Keyboard navigation.
- Screen reader compatibility.
- Visible focus states.
- Accessible form controls.

---

# 170. Responsive Behaviour

Desktop:

Centered multi-step layout.

Tablet:

Reduced spacing with stacked sections.

Mobile:

Single-column flow.

Sticky primary action button.

Waiting Room elements collapse into expandable cards.

---

# 171. Data Model Preview

```
InterviewSession

id

title

type

status

language

technologyStack

difficulty

passwordProtected

scheduledAt

createdBy

createdAt

updatedAt
```

### Related Models

```
InterviewSession
├── Invitation
├── Participant
├── User
└── SessionSettings
```

---

# 172. API Preview

```
POST /sessions
```

Create a new session.

---

```
POST /sessions/{id}/invite
```

Invite a participant.

---

```
GET /sessions/{id}
```

Retrieve session details.

---

```
POST /sessions/{id}/join
```

Join a session.

---

```
DELETE /sessions/{id}
```

Cancel a session.

---

# 173. Event Flow

```
Session Created
        ↓
Invitations Sent
        ↓
Participant Joins
        ↓
Participant Ready
        ↓
All Participants Connected
        ↓
Interview Starts
```

---

# 174. Component Dependencies

```
SessionCreationModule
├── SessionTypeSelector
├── SessionConfigurationForm
├── SessionSummaryCard
├── InvitationPanel
├── ParticipantList
├── WaitingRoom
└── InvitationStatusBadge
```

---

# 175. Developer Notes

The session creation flow should be designed as a reusable wizard with independently testable steps.

Invitation updates should be driven by real-time events rather than polling.

The Waiting Room should reuse components from the Interview Workspace wherever possible to maintain visual consistency.

Session creation and participant management should remain decoupled to support future session types, such as multi-participant interviews or panel interviews.