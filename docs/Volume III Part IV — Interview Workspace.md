# Product Design Specification

# Volume III — Screen Specifications

## Part IV — Interview Workspace

---

# 64. Workspace Philosophy

The Interview Workspace is the core experience of the entire platform.

It should feel less like a traditional web page and more like a lightweight development environment.

The interface should maximize focus and minimize distraction.

Every element within the workspace should directly support the interview process.

Users should feel as though they have entered a dedicated technical interview environment rather than a generic video conferencing application.

---

# 65. Workspace Objectives

The Interview Workspace must enable participants to:

- Collaboratively write and edit code.
- Communicate using live video and audio.
- Receive AI-assisted hints.
- Observe real-time changes.
- Complete the interview without leaving the application.

No external tools should be required during the interview.

---

# 66. Overall Layout

Desktop Layout

```
┌──────────────┬─────────────────────────────────────────────┬──────────────────┐
│              │                                             │                  │
│              │                                             │                  │
│              │                                             │                  │
│              │                                             │                  │
│  Camera Pane │              Code Editor                    │   AI Sidebar     │
│              │                                             │                  │
│              │                                             │                  │
│              │                                             │                  │
│              │                                             │                  │
├──────────────┴─────────────────────────────────────────────┴──────────────────┤
│ Status Bar │ Connection │ Language │ Participants │ Session Timer │ Controls   │
└───────────────────────────────────────────────────────────────────────────────┘
```

The editor must remain visually dominant.

Camera tiles and AI should support, not compete with, the coding experience.

---

# 67. Layout Ratios

Recommended proportions:

Camera Panel — 20%

Code Editor — 60%

AI Sidebar — 20%

Panels should be resizable in future versions.

For MVP, fixed proportions are acceptable.

---

# 68. Camera Panel

The left panel displays all participants.

Each participant is represented by a Camera Tile.

Each tile contains:

- Live Video
- Avatar fallback
- Display Name
- Role Badge
- Camera Status
- Microphone Status
- Speaking Indicator
- Connection Status

The active speaker should be subtly highlighted.

Avoid aggressive borders or animations.

---

# 69. Code Editor

The editor is the primary focus of the workspace.

It should resemble a simplified VS Code experience.

Requirements:

- Single active file.
- Syntax highlighting.
- Line numbers.
- Language selection.
- Collaborative editing.
- Real-time cursor synchronization.
- Auto-completion support.
- Automatic indentation.
- Bracket matching.
- Undo / Redo.

The surrounding interface should remain visually quiet.

---

# 70. Editor Toolbar

Displayed above the editor.

Contains:

- File Name
- Programming Language Selector
- Session Status
- Copy Session Link
- Fullscreen Toggle

Future-ready:

- Run Code
- Reset Code
- Download Solution

Toolbar should remain minimal.

---

# 71. AI Sidebar

Positioned on the right side of the workspace.

Purpose:

Provide AI-generated hints without disrupting the interview flow.

Structure:

Header

- AI Assistant
- Remaining Hints (e.g. 2 / 3)

Hint Feed

Chronological list of generated hints.

Primary Action

Get Hint

Status

Generating...

Requirements:

- Maximum three hints per session.
- All participants see the same hints.
- Hints appear in real time.
- Hint generation should never block editing.

---

# 72. Company Notes Panel

For users with the Company role, the AI Sidebar transforms into a tabbed panel.

Tabs:

- AI Assistant
- Interview Notes

Interview Notes include:

- Free-form notes.
- Quick rating (0–10).
- Strengths.
- Weaknesses.

Notes are private and invisible to the candidate.

---

# 73. Bottom Status Bar

Persistent across the session.

Displays:

- Connection Status
- Synchronization Status
- Selected Language
- Participant Count
- Session Duration
- Keyboard Shortcut Hint

Inspired by VS Code.

Low visual prominence.

---

# 74. Session Controls

Primary controls:

- Toggle Camera
- Toggle Microphone
- Leave Session

Secondary:

- Settings
- Report Issue (future)

The Leave Session button should be visually distinct to avoid accidental clicks.

---

# 75. Session States

The workspace should support the following states:

- Waiting for Participant
- Active Interview
- Reconnecting
- Session Paused (future)
- Session Finished

Transitions between states should be smooth and informative.

---

# 76. Real-Time Indicators

Users should always understand what is happening.

Examples:

- "Alex is typing..."
- "Connection unstable"
- "AI is generating a hint..."
- "John joined the session"
- "Maria left the session"

Indicators should be subtle and disappear automatically when no longer relevant.

---

# 77. Responsive Behaviour

Desktop:

Three-panel layout.

Tablet:

Camera panel collapses into a horizontal strip above the editor.

AI Sidebar becomes collapsible.

Mobile:

Interview participation only.

Editing capabilities may be reduced depending on feasibility.

The editor should remain usable but simplified.

---

# 78. Accessibility

Requirements:

- Full keyboard navigation.
- High contrast focus indicators.
- Screen reader support for controls.
- Keyboard shortcuts for common actions.
- All icon buttons require accessible labels.

---

# 79. Performance Considerations

The workspace should prioritize responsiveness.

Recommendations:

- Lazy-load non-critical panels.
- Virtualize long hint histories if needed.
- Avoid unnecessary re-renders.
- Synchronize editor updates efficiently.
- Display optimistic UI where appropriate.

---

# 80. Error Handling

Possible errors include:

- Lost network connection.
- Camera access denied.
- Microphone access denied.
- Failed AI request.
- Synchronization failure.

Each error should:

- Explain the issue.
- Suggest a recovery action.
- Avoid blocking the entire workspace unless absolutely necessary.

---

# 81. Developer Handoff Notes

Suggested component hierarchy:

```
InterviewWorkspace
├── WorkspaceHeader
├── CameraPanel
│   └── CameraTile
├── CodeEditor
│   ├── EditorToolbar
│   └── MonacoEditor
├── AISidebar
│   ├── HintHistory
│   ├── HintCard
│   └── HintButton
├── CompanyNotesPanel
├── StatusBar
└── SessionControls
```

Each major section should own its own loading, empty, and error states.

Real-time functionality should be isolated from presentational components to keep the UI predictable and maintainable.