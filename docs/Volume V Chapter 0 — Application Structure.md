# Product Design Specification

# Volume V — Product Architecture

## Chapter 0 — Application Structure

---

# 280. Architecture Philosophy

The application is organized as a hierarchy of independent building blocks.

Each level has a clearly defined responsibility and should not assume the responsibilities of the levels above or below it.

This layered structure improves consistency, scalability, maintainability, and collaboration across design and engineering teams.

The architecture should remain understandable even as new features and modules are introduced.

---

# 281. Architectural Hierarchy

The platform is composed of five architectural layers.

```
Interview Platform
        ↓
Layouts
        ↓
Modules
        ↓
Regions
        ↓
Components
```

Each layer provides structure for the layer below while remaining independent from implementation details.

---

# 282. Layer 1 — Product

The highest level represents the product as a whole.

```
Interview Platform
```

The product defines:

- Product vision
- Design philosophy
- Navigation principles
- Overall user experience
- Cross-module behavior

There is only one Product layer.

---

# 283. Layer 2 — Layouts

Layouts define the overall application shell.

They establish the major structural regions of the interface but do not contain business logic.

The platform currently consists of three layouts.

```
Application

├── Public Layout
├── Navigation Layout
└── Workspace Layout
```

Each layout represents a distinct mode of user interaction.

---

# 284. Public Layout

The Public Layout is used before authentication.

Included screens:

- Landing
- Login
- Registration
- Password Recovery

Characteristics:

- Marketing-focused
- Lightweight navigation
- Authentication flows
- No persistent workspace elements

---

# 285. Navigation Layout

The Navigation Layout represents the primary authenticated experience.

Included modules:

- Dashboard
- Marketplace
- History
- Leaderboard
- Profile
- Settings

Persistent interface elements:

- Sidebar
- Header
- Notification Center
- User Menu

This layout prioritizes exploration, discovery, and account management.

---

# 286. Workspace Layout

The Workspace Layout is optimized for focused work.

Included modules:

- Waiting Room
- Interview Workspace
- Interview Summary (optional future)

Characteristics:

- Distraction-free
- Full-screen experience
- Workspace Header
- Dedicated functional regions
- Interview-specific controls

Global navigation is intentionally hidden while this layout is active.

---

# 287. Workspace Mode

Entering an interview automatically activates **Workspace Mode**.

Workspace Mode modifies the application behavior globally.

Changes include:

- Hide primary sidebar.
- Hide global header.
- Hide non-critical notifications.
- Disable unnecessary distractions.
- Maximize available workspace.
- Preserve interview context until completion.

After leaving the interview, the application returns to Navigation Layout automatically.

Workspace Mode is a fundamental architectural concept rather than a visual variation.

---

# 288. Layer 3 — Modules

Modules represent complete product features.

Examples:

```
Dashboard

Marketplace

Interview Workspace

History

Leaderboard

Profile

Settings
```

Each module:

- owns its business logic;
- owns its routes;
- exposes reusable regions;
- may reuse shared components.

Modules should remain independent whenever possible.

---

# 289. Layer 4 — Regions

Regions divide modules into functional interface areas.

Regions organize the layout but do not define presentation details.

Example:

```
Interview Workspace

Workspace Header

Camera Region

Editor Region

AI Region

Bottom Toolbar
```

Another example:

```
Dashboard

Overview Region

Upcoming Interviews Region

Statistics Region

Recent Activity Region
```

Regions should represent logical responsibilities rather than purely visual sections.

---

# 290. Region Principles

Every region should satisfy the following requirements:

- Single responsibility.
- Independent layout behavior.
- Clear ownership.
- Reusable where appropriate.
- Responsive by design.

A region may contain many components but should represent one functional area.

---

# 291. Layer 5 — Components

Components are the smallest reusable building blocks.

Examples:

```
Button

Input

Card

Avatar

Participant Tile

Statistic Card

Hint Card

Code Editor

Notification Badge
```

Components should never depend on page-specific layouts.

Shared components belong to the design system whenever possible.

---

# 292. Composition Model

The interface is assembled hierarchically.

```
Application

└── Layout

    └── Module

        └── Region

            └── Component
```

Each level should communicate only with adjacent levels through well-defined interfaces.

---

# 293. Ownership Rules

Responsibilities are distributed as follows:

|Layer|Responsibility|
|---|---|
|Product|Vision, principles, experience|
|Layout|Global structure|
|Module|Business capability|
|Region|Functional organization|
|Component|User interaction|

Responsibilities should never overlap.

---

# 294. Design Principles

Every architectural layer should be:

- Modular
- Predictable
- Replaceable
- Extensible
- Independently testable

This minimizes coupling and improves long-term maintainability.

---

# 295. Developer Mapping

The architectural hierarchy maps naturally to the frontend architecture.

Example:

```
app/

layouts/

features/

widgets/

shared/ui/
```

This alignment reduces the gap between design artifacts and implementation.

> **Примечание:** Здесь я бы не стал жестко привязываться к FSD-папкам (`features`, `widgets` и т.д.) как к обязательной структуре. Лучше показать концептуальное соответствие, чтобы документ оставался независимым от конкретной реализации. Если через несколько лет архитектура изменится, Product Blueprint не придется переписывать.

---

# 296. Design Deliverables

Each module delivered in Figma should include:

- Layout reference
- Module specification
- Region boundaries
- Component hierarchy
- Responsive behavior
- Interaction states

This ensures consistency between design and implementation.

---

# 297. Product Principles

The application should be understandable from its structure alone.

A designer, developer, or QA engineer should be able to identify the purpose and responsibility of any screen by tracing its position within the architectural hierarchy.

The structure should scale naturally as the platform evolves, without requiring fundamental changes to the existing organization.