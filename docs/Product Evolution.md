# Product Evolution

## PE-002 — Interview Templates

**Status:** Research  
**Priority:** Future (v2+)

### Vision

Allow users and organizations to create reusable interview templates that standardize interview sessions and significantly reduce setup time.

Templates should encapsulate interview configuration, coding environment, evaluation criteria, and recommended workflow while remaining customizable before the session starts.

---

### Motivation

Creating every interview from scratch introduces unnecessary friction and inconsistency.

Templates provide:

- Faster session creation.
- Consistent interview standards.
- Better onboarding for new interviewers.
- Standardized evaluation across teams.
- Reusable interview scenarios for education and companies.

---

### Template Categories

#### Community Templates

Created by the platform.

Examples:

- JavaScript Fundamentals
- React Basics
- React Advanced
- TypeScript
- Node.js
- NestJS
- Algorithms
- Data Structures
- SQL
- System Design

---

#### Personal Templates

Created by individual users.

Examples:

- My React Interview
- Frontend Live Coding
- Weekly Practice Session

---

#### Organization Templates

Available only to company accounts.

Examples:

- Frontend Junior Interview
- React Middle Assessment
- Senior Fullstack Interview
- Backend Architecture Review

---

### Template Configuration

Each template may define:

**General**

- Title
- Description
- Difficulty
- Estimated Duration
- Category

**Editor**

- Default programming language
- Starter code
- Read-only sections (future)
- Multiple files (future)

**Interview Settings**

- Private/Public
- Password enabled
- AI enabled
- Maximum hints
- Time limit

**Evaluation**

- Suggested scoring categories
- Feedback form configuration
- Required evaluation fields

**Resources**

- Problem statement
- Helpful links
- Attached files (future)

---

### Session Creation Flow

```
Choose Template
        ↓
Preview Template
        ↓
Customize Settings
        ↓
Invite Participants
        ↓
Waiting Room
        ↓
Interview
```

Templates should reduce configuration effort, not remove flexibility.

Users can override template settings before creating a session.

---

### Future Extensions

- Favorite Templates
- Recently Used Templates
- Clone Existing Template
- Import / Export Templates
- Share Template with Community
- Company Template Library
- Template Versioning
- Recommended Templates based on interview history
- AI-generated interview templates
- Template analytics (usage, success rate, completion rate)

---

### Technical Notes

Templates should reference configuration rather than duplicate session logic.

A session is created **from** a template, after which it becomes an independent entity. Changes to a template must never affect sessions that have already been created.