# Product Design Specification

# Volume IV — Functional Modules

## Module VII — Notification System

---

# 216. Module Philosophy

The Notification System keeps users informed without overwhelming them.

Notifications should be timely, relevant, and actionable.

Every notification must help the user complete the next meaningful step rather than simply report an event.

The system should minimize interruptions while ensuring that important interview-related events are never missed.

---

# 217. Module Objectives

The Notification System enables users to:

- Stay informed about interview activity.
- Receive timely reminders.
- Track invitation status.
- Be notified about session updates.
- Control notification preferences.

Notifications should support the interview workflow rather than distract from it.

---

# 218. Notification Channels

The platform should support multiple delivery channels.

### MVP

- In-App Notifications
- Telegram Bot

### Future-ready

- Email
- Browser Push Notifications
- Mobile Push Notifications
- Slack / Microsoft Teams integrations

All notification events should be channel-agnostic, allowing new delivery methods without changing business logic.

---

# 219. Notification Categories

Supported categories include:

### Session

- Session created
- Session cancelled
- Session updated
- Session starting soon
- Waiting room ready

### Invitations

- Invitation received
- Invitation accepted
- Invitation declined
- Invitation expired

### Interview

- Participant joined
- Participant disconnected
- Interview completed

### Feedback

- Feedback received
- Feedback updated

### System

- Maintenance
- Security alerts
- Account changes

Each category should have a consistent visual treatment.

---

# 220. In-App Notification Center

The application should include a dedicated notification center.

Contents:

- Notification list
- Unread indicator
- Timestamp
- Category icon
- Short description
- Primary action (e.g., "Join Session")

Users should be able to mark notifications as read individually or all at once.

---

# 221. Telegram Integration

Telegram notifications should focus on high-value events.

Examples:

- New interview invitation
- Invitation accepted
- Session starts in 10 minutes
- Waiting room is ready

Messages should include a clear call to action and a deep link back to the application.

---

# 222. Notification Lifecycle

```
Event Occurs
        ↓
Notification Created
        ↓
Delivery Channels Selected
        ↓
Notification Delivered
        ↓
User Interaction (optional)
        ↓
Notification Archived
```

The lifecycle should be consistent regardless of the delivery channel.

---

# 223. Notification States

Each notification supports the following states:

- Unread
- Read
- Archived
- Failed Delivery (internal)

Users should only interact with the first three states.

---

# 224. Notification Preferences

Users can configure:

- Enable/disable Telegram notifications
- Enable/disable In-App notifications
- Reminder timing (e.g., 10, 30, 60 minutes before a session)
- Mute non-essential notifications

Preference changes should take effect immediately.

---

# 225. Notification Design

Each notification item includes:

- Category icon
- Title
- Short description
- Relative timestamp (e.g., "5 minutes ago")
- Optional action button

Avoid long paragraphs.

Notifications should be concise and scannable.

---

# 226. Empty States

Examples:

- No notifications yet.
- You're all caught up!

Empty states should feel positive rather than empty.

---

# 227. Loading States

Skeleton placeholders should represent notification items.

Loading should not block interaction with already available notifications.

---

# 228. Error Handling

Possible scenarios:

- Failed to load notifications.
- Telegram account not linked.
- Delivery failure.

Provide:

- Explanation
- Retry option
- Link to notification settings (when relevant)

---

# 229. Accessibility

The Notification System must support:

- Keyboard navigation.
- Screen reader announcements for new notifications.
- Accessible icons.
- Visible focus indicators.

---

# 230. Responsive Behaviour

Desktop:

Notification center opens as a panel or dropdown.

Tablet:

Slide-over panel.

Mobile:

Dedicated full-screen notification page.

---

# 231. Data Model Preview

```
Notification

id

userId

type

title

message

channel

status

actionUrl

createdAt

readAt
```

### Related Models

```
Notification
├── User
├── InterviewSession
└── Invitation
```

---

# 232. API Preview

```
GET /notifications
```

Retrieve notifications.

---

```
PATCH /notifications/{id}/read
```

Mark a notification as read.

---

```
PATCH /notifications/read-all
```

Mark all notifications as read.

---

# 233. Event Flow

```
Invitation Accepted
        ↓
Notification Created
        ↓
Telegram Sent
        ↓
In-App Notification Created
        ↓
User Clicks Notification
        ↓
Waiting Room Opens
```

---

# 234. Component Dependencies

```
NotificationModule
├── NotificationCenter
├── NotificationList
│   └── NotificationItem
├── NotificationBadge
├── NotificationPreferences
└── EmptyState
```

---

# 235. Developer Notes

Notification generation should be event-driven.

Delivery channels should subscribe to notification events rather than being called directly by business logic.

Deep links should always navigate users to the relevant screen, preserving context where possible.

The system should support retry mechanisms for transient delivery failures without creating duplicate user-facing notifications.

---

# 236. Product Principles

Notifications should reduce uncertainty, not increase it.

Every notification should answer at least one of these questions:

- **What happened?**
- **Why does it matter?**
- **What should I do next?**

Avoid informational noise that does not lead to user action.