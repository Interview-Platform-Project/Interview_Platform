# Product Design Specification

# Volume IV — Functional Modules

## Module V — AI Assistant

---

# 176. Module Philosophy

The AI Assistant is designed to support learning without replacing problem-solving.

Its purpose is to provide guidance, encourage independent thinking, and reduce frustration during interviews while preserving the integrity of the assessment.

The assistant should never solve the interview task directly.

Instead, it should help participants move forward by offering contextual hints that stimulate reasoning.

---

# 177. Module Objectives

The AI Assistant enables users to:

- Request contextual hints.
- Reduce deadlock situations during interviews.
- Learn through guided assistance.
- Keep the interview collaborative and transparent.

The assistant is a learning aid, not an answer generator.

---

# 178. Core Principles

The AI Assistant must always follow these principles:

- Encourage learning rather than solving.
- Never reveal the complete solution.
- Never generate production-ready code for the interview task.
- Be transparent — every participant sees when AI is used.
- Treat all participants equally.

The AI should be perceived as a neutral facilitator.

---

# 179. Hint Lifecycle

```
User Requests Hint
        ↓
Hint Request Sent
        ↓
AI Processing
        ↓
Hint Generated
        ↓
Broadcast to All Participants
        ↓
Hint Stored in Session History
```

Hints become part of the interview session and remain visible until the interview ends.

---

# 180. Hint Limits

Each interview session includes a limited number of AI hints.

Default configuration:

- Maximum hints: **3**
- Shared across all participants.
- Remaining hint count always visible.

Example:

```
AI Assistant

Hints Remaining

● ● ○

2 / 3
```

When no hints remain, the action is disabled with a clear explanation.

---

# 181. Hint Interface

The AI sidebar contains:

- Header
- Remaining Hint Counter
- Hint Timeline
- "Request Hint" button
- Loading indicator

Hints are displayed chronologically.

The newest hint appears at the bottom of the timeline.

---

# 182. Hint Card

Each generated hint is presented as a reusable Hint Card.

Contents:

- Hint Number
- Timestamp
- AI Badge
- Hint Content

Optional future additions:

- Expand / Collapse
- Copy Hint
- Helpful / Not Helpful feedback

Hint Cards should visually distinguish AI-generated content from system notifications.

---

# 183. AI Request States

The assistant supports the following states:

- Ready
- Generating
- Success
- Failed
- Rate Limited
- No Hints Remaining

Transitions should be smooth and clearly communicated.

---

# 184. Error Handling

Possible scenarios:

- AI service unavailable.
- Request timeout.
- Daily quota exceeded (future).
- Invalid response.
- Network error.

The user should always receive a human-readable explanation and a retry option when appropriate.

---

# 185. Transparency

Every participant must immediately see:

- Who requested the hint.
- When it was requested.
- The generated hint.

This maintains fairness and avoids hidden assistance.

---

# 186. Prompt Strategy (UX Perspective)

The user interface should communicate what the AI **will** and **will not** do.

Examples:

✔ Explain concepts.

✔ Suggest approaches.

✔ Point out potential mistakes.

✔ Recommend areas to investigate.

✘ Write the complete solution.

✘ Finish the coding task.

✘ Reveal the final answer.

This expectation-setting should reduce frustration and encourage proper use.

---

# 187. Session History

All generated hints become part of the interview record.

Each hint stores:

- Author
- Timestamp
- Content
- Session ID

Hints are visible when reviewing completed sessions.

---

# 188. Accessibility

The AI Assistant must support:

- Keyboard navigation.
- Screen reader announcements for newly generated hints.
- Focus management after generation.
- Accessible loading indicators.

---

# 189. Responsive Behaviour

Desktop:

Persistent right sidebar.

Tablet:

Collapsible sidebar.

Mobile:

Bottom sheet or dedicated panel.

The current hint count should remain visible regardless of layout.

---

# 190. Data Model Preview

```
AIHint

id

sessionId

requestedBy

content

createdAt

sequenceNumber
```

### Related Models

```
InterviewSession
├── AIHint
├── User
└── SessionEvent
```

---

# 191. API Preview

```
POST /sessions/{id}/ai-hints
```

Request a new hint.

---

```
GET /sessions/{id}/ai-hints
```

Retrieve hint history.

---

# 192. Event Flow

```
User Clicks "Request Hint"
        ↓
Permission Check
        ↓
Remaining Hints Validation
        ↓
AI Request
        ↓
Hint Generated
        ↓
Broadcast via WebSocket
        ↓
Hint Timeline Updated
        ↓
Remaining Counter Updated
```

---

# 193. Component Dependencies

```
AIAssistantModule
├── AIHeader
├── HintCounter
├── HintTimeline
│   └── HintCard
├── RequestHintButton
├── LoadingState
└── ErrorBanner
```

---

# 194. Developer Notes

The AI Assistant should be completely decoupled from the code editor.

Hints are contextual to the interview but should not require tight coupling with editor state in the MVP.

All hint updates should be delivered via real-time events to ensure synchronization between participants.

The interface should gracefully handle temporary AI service interruptions without affecting the interview session.

---

# 195. Product Principles

The AI Assistant should increase confidence, reduce frustration, and promote learning.

Its success should be measured by how effectively it helps users continue thinking independently—not by how often it is used.

The AI should always feel like a knowledgeable interviewer offering guidance rather than an automated solution engine.