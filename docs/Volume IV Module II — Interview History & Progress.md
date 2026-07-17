# Product Design Specification

# Volume IV — Functional Modules

## Module II — Interview History & Progress

---

# 104. Module Philosophy

The Interview History module is the user's personal archive of completed interview sessions.

Its purpose is not only to store historical records but also to visualize long-term learning progress and encourage continuous improvement.

Rather than functioning as a static list, the module should provide meaningful context for every completed interview.

The experience should help users answer questions such as:

- What have I practiced recently?
- How am I improving over time?
- What technologies do I use most often?
- What feedback patterns keep repeating?

---

# 105. Module Objectives

The module enables users to:

- Browse completed interviews.
- Review previous feedback.
- Track personal improvement.
- Search historical sessions.
- Filter interviews.
- Analyze interview statistics.
- Revisit interview details.

---

# 106. Information Hierarchy

The module should prioritize information in the following order:

1. Personal Progress Summary
2. Search & Filters
3. Interview Timeline
4. Interview Details
5. Historical Feedback

The goal is to surface insights before raw data.

---

# 107. Layout Structure

Desktop

```
┌──────────────────────────────────────────────────────────────┐
│ Sidebar │ History Header                                    │
│         ├────────────────────────────────────────────────────┤
│         │ Progress Summary                                  │
│         ├────────────────────────────────────────────────────┤
│         │ Search + Filters                                  │
│         ├────────────────────────────────────────────────────┤
│         │ Interview Timeline                                │
│         ├────────────────────────────────────────────────────┤
│         │ Interview List                                    │
└──────────────────────────────────────────────────────────────┘
```

---

# 108. Progress Summary

Positioned at the top of the page.

Displays high-level metrics.

Suggested widgets:

- Total Interviews
- Average Rating
- Total Interview Hours
- Most Practiced Technology
- Current Improvement Streak

Each widget should reuse the existing Statistic Widget component.

---

# 109. Search Experience

Users should be able to instantly search interviews by:

- Participant name
- Technology
- Programming language
- Session title

Search results update in real time.

---

# 110. Filtering System

Supported filters:

- Date Range
- Technology Stack
- Programming Language
- Rating
- Role (Candidate / Interviewer)
- Company Interviews / Mock Interviews

Filters should remain lightweight and easy to reset.

---

# 111. Interview Timeline

The timeline provides chronological navigation.

Grouped by:

- Month
- Year

Each group displays:

- Number of interviews
- Average rating
- Primary technologies

The timeline should improve orientation rather than replace the interview list.

---

# 112. Interview List

Every completed interview appears as an Interview Card.

Each card includes:

- Interview Title
- Date
- Duration
- Participants
- Technology Stack
- Programming Language
- Overall Rating
- Interview Type
- Primary Action ("View Details")

Cards should remain compact and easy to scan.

---

# 113. Interview Details

Selecting an interview opens a dedicated detail page.

Sections:

### Session Information

- Date
- Duration
- Participants
- Language
- Technologies

---

### Feedback

Display all submitted feedback.

Respect visibility rules defined in the Feedback module.

---

### Personal Reflection

Visible only to the owner.

---

### Session Statistics

Display:

- AI Hints Used
- Session Duration
- Code Lines Edited (future-ready)
- Connection Stability (future-ready)

---

### Primary Actions

- Return to History
- Copy Session Link (future)
- Export Report (future)

---

# 114. Interview Card States

Every card supports:

- Default
- Hover
- Selected
- Loading
- Empty
- Error

Interaction should remain subtle.

---

# 115. Empty States

Examples:

No completed interviews.

No matching search results.

No interviews within selected filters.

Each state should encourage the next interview rather than simply informing the user.

---

# 116. Loading States

Skeletons should represent:

- Statistic Widgets
- Timeline
- Interview Cards

Avoid blocking page interaction.

---

# 117. Error Handling

Examples:

Failed to load history.

Session unavailable.

Feedback missing.

Every error includes:

- Explanation
- Retry Action
- Navigation option

---

# 118. Responsive Behaviour

Desktop:

Full layout with statistics and timeline.

Tablet:

Timeline collapses into a compact section.

Mobile:

Statistics stack vertically.

Timeline becomes a simple chronological list.

Cards become more compact while preserving readability.

---

# 119. Accessibility

Requirements:

- Keyboard navigation.
- Screen reader support.
- Focus indicators.
- Accessible search and filtering.

---

# 120. Performance Considerations

History may eventually contain thousands of interviews.

Recommendations:

- Cursor-based pagination.
- Lazy loading.
- Virtualized lists.
- Debounced search.
- Progressive loading of statistics.

---

# 121. Data Model Preview

```
InterviewSession

id

title

participants

startedAt

endedAt

duration

language

technologyStack

rating

feedbackId

type

status
```

---

### Related Models

```
InterviewSession
        │
        ├── Feedback
        ├── User
        ├── SessionStatistics
        └── AIHintHistory
```

---

# 122. API Preview

Examples:

```
GET /interviews
```

Retrieve paginated interview history.

---

```
GET /interviews/{id}
```

Retrieve interview details.

---

```
GET /interviews/{id}/feedback
```

Retrieve associated feedback.

---

```
GET /statistics/history
```

Retrieve progress summary.

---

# 123. Event Flow

```
Interview Completed
        ↓
Feedback Submitted
        ↓
History Updated
        ↓
Statistics Recalculated
        ↓
Dashboard Refreshed
        ↓
Leaderboard Updated
```

---

# 124. Component Dependencies

```
HistoryModule
├── ProgressSummary
├── SearchBar
├── FilterPanel
├── Timeline
├── InterviewList
│   └── InterviewCard
├── InterviewDetails
└── StatisticWidget
```

---

# 125. Developer Notes

The module should reuse existing components wherever possible.

Timeline groups should be generated server-side to reduce client-side processing.

Search and filtering should be composable and independently extensible.

Statistics should be loaded independently of interview records.

---

# 126. Product Principles

History should emphasize learning over record-keeping.

Users should leave the page with a clear understanding of their development over time.

Historical information should support reflection rather than comparison.