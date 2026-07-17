# Product Design Specification

# Volume III — Screen Specifications

## Part I — Public Experience & Authentication

---

# 1. Public Experience

The public-facing part of the platform serves one primary purpose:

Convert visitors into registered users.

The landing page should communicate the platform's value within the first few seconds.

It should feel modern, premium, and focused, avoiding excessive marketing language or decorative elements.

---

# 2. Landing Page

## Purpose

Introduce the product.

Explain its value.

Encourage registration.

---

## Target Audience

- Developers
- Engineering Managers
- Companies
- Recruiters
- Students preparing for technical interviews

---

## Primary CTA

Create Free Account

---

## Secondary CTA

Explore Platform

---

## Layout Structure

```
────────────────────────────────

Header

Hero

How It Works

Core Features

Footer

────────────────────────────────
```

---

# 3. Header

Persistent transparent header.

Contains:

Logo

Navigation

Theme Switch

Login

Register Button

---

Navigation

- Features
- How It Works

Keep navigation intentionally minimal.

Avoid large marketing menus.

---

Desktop

Horizontal layout.

---

Mobile

Hamburger Menu.

---

# 4. Hero Section

This section defines the first impression.

It should communicate the product in under five seconds.

---

Headline

Large typography.

Example tone:

> Conduct Technical Interviews Without Leaving Your Browser.

---

Supporting Text

One concise paragraph.

Avoid marketing buzzwords.

Explain the practical value.

---

Primary CTA

Create Free Account

---

Secondary CTA

Watch Demo (future-ready)

---

Hero Visual

Instead of illustrations,

display a realistic preview of the Interview Room interface.

The hero preview should include:

- Code Editor
- Camera Tiles
- AI Sidebar

This immediately communicates the core product.

---

Background

Minimal.

Subtle gradient.

Very low saturation.

No abstract shapes.

---

# 5. How It Works

Three-step explanation.

---

Step 1

Create your profile.

---

Step 2

Schedule or start an interview.

---

Step 3

Receive structured feedback.

---

Each step should include:

- Lucide icon
- Title
- Short description

---

# 6. Core Features

Grid layout.

Feature Cards.

Suggested features:

- Real-Time Code Editor
- Video Interviews
- AI Hints
- Mock Interviews
- Company Interviews
- Interview History
- Feedback System
- Leaderboard

Cards should remain compact.

---

# 7. Footer

Contains:

Logo

GitHub

Documentation

Privacy Policy

Terms

Theme Switch

Version

Avoid large corporate footers.

---

# 8. Responsive Behavior

Desktop

Centered layout.

Maximum readability.

---

Tablet

Reduce spacing.

---

Mobile

Single-column layout.

Hero image moves below text.

Buttons become full width.

---

# 9. Empty States

Landing should never contain placeholders.

Avoid "Coming Soon."

Design should feel complete.

---

# 10. Authentication Philosophy

Authentication should feel frictionless.

Remove unnecessary fields.

Minimize cognitive load.

---

# 11. Login Page

Purpose:

Return users to their workspace as quickly as possible.

---

Layout

Centered authentication card.

Split layout on Desktop.

Single column on Mobile.

---

Fields

Email

Password

Remember Me

Forgot Password

---

Primary CTA

Sign In

---

Secondary CTA

Create Account

---

Optional

Continue with GitHub (future-ready)

---

States

Loading

Error

Invalid Credentials

Success

Disabled

---

# 12. Registration Page

Purpose

Create a new account.

---

Fields

Full Name

Email

Password

Confirm Password

---

Validation

Realtime validation.

Password strength indicator.

Email format validation.

Required field indicators.

---

CTA

Create Account

---

Secondary

Already have an account?

---

# 13. Forgot Password

Minimal interface.

Email field.

Submit.

Confirmation state.

Success message.

---

# 14. Onboarding Philosophy

Users should complete onboarding in under two minutes.

Never overwhelm first-time users.

---

# 15. Role Selection

Immediately after registration.

Question

Who are you?

---

Options

Developer

Company

---

Each option includes:

Icon

Title

Description

---

Selected card should clearly stand out.

---

# 16. Profile Setup

Fields

Avatar

Full Name

Headline

Experience Level

Technology Stack

Languages

Country

Timezone

Short Bio

---

The form should feel lightweight.

Optional fields clearly indicated.

---

# 17. Stack Selection

Searchable Multi Select.

Popular stacks first.

Suggested:

JavaScript

TypeScript

React

Vue

Angular

Node.js

Python

Go

Java

C#

Rust

PHP

---

Allow custom technologies.

---

# 18. Onboarding Completion

Success screen.

Message

Your profile is ready.

Primary CTA

Go to Dashboard.

---

# 19. Authentication States

Every authentication screen should include:

Loading

Validation Errors

Server Errors

Success

Offline Mode

Expired Session

---

# 20. Accessibility Requirements

Every form must support:

Keyboard navigation

Visible focus

ARIA labels

Autocomplete

Proper input types

Screen reader compatibility

---

# 21. Visual Hierarchy

Authentication screens should prioritize:

1. Form
2. CTA
3. Supporting links

Nothing else should compete for attention.

---

# 22. Motion Guidelines

Transitions:

150–200ms.

Subtle fade.

Small elevation.

No large page animations.

---

# 23. Security Communication

Users should always understand what happens.

Examples:

Password updated successfully.

Session expired.

Verification email sent.

Account created.

Avoid vague messages.

---

# 24. Theme Behavior

Light and Dark themes should preserve:

Spacing

Hierarchy

Component sizes

Contrast

No theme-specific layouts.

---

# 25. Design QA Checklist

Before approval, every public screen should satisfy:

✓ Built entirely with Auto Layout

✓ Uses only design system components

✓ Uses design tokens only

✓ Fully responsive

✓ Supports Light/Dark

✓ Keyboard accessible

✓ No layout breaks with longer localized text

✓ All interaction states designed

✓ Empty and error states covered

✓ Ready for developer handoff