# Contributing to Routinary

Thank you for your interest in contributing! This document covers everything you need to know to get up and running and submit quality contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Conventions](#coding-conventions)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

Be respectful and constructive. We're all here to build something great together.

---

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/JunLovin/routinary.git
cd routinary
```

### 2. Install Dependencies

```bash
npm install
```

This also installs the Husky git hooks that automatically lint your staged files before every commit.

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your local API URL
```

### 4. Start the Dev Server

```bash
npm run dev
```

The app runs at `http://localhost:5173` with hot module replacement enabled.

---

## Development Workflow

### Branching Strategy

Create a new branch off `main` for every contribution:

```bash
git checkout -b feat/my-new-feature   # new feature
git checkout -b fix/some-bug          # bug fix
git checkout -b chore/update-deps     # maintenance
```

Use these prefixes: `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`.

### Pre-Commit Checks

Husky runs ESLint automatically on staged files via `lint-staged`. If the lint check fails, the commit will be rejected. Fix the reported issues and try again.

You can also run checks manually:

```bash
npm run lint        # check for issues
npm run lint:fix    # auto-fix what's possible
npm run build       # verify TypeScript and bundle
```

---

## Project Structure

Routinary uses a **pod/feature-based architecture**. Before contributing, familiarize yourself with it:

```
src/
├── pods/           # Feature modules — one folder per domain
│   ├── landing/
│   ├── auth/
│   └── main/
│       ├── chat/
│       ├── help/
│       └── settings/
└── shared/         # Cross-feature reusable code
    ├── components/ # Shared UI components
    ├── hooks/      # Custom React hooks
    ├── models/     # TypeScript interfaces
    ├── services/   # API layer (one file per resource)
    ├── stores/     # Zustand global state
    ├── data/       # Static/hardcoded data
    └── utils/      # Pure utility functions
```

**Rules of thumb:**
- If code belongs to a single feature, it lives inside that pod.
- If code is used by two or more features, it moves to `shared/`.
- Never import from one pod into another — use `shared/` as the bridge.

---

## Coding Conventions

### TypeScript

- All code must be fully typed. Avoid `any`.
- Define data shapes in `shared/models/` as TypeScript interfaces.
- Use Zod schemas for runtime validation of user inputs (forms, API responses).

```ts
// Good
interface User {
  id: string;
  email: string;
  name: string;
}

// Avoid
const user: any = fetchUser();
```

### React Components

- One component per file.
- Use functional components and hooks only (no class components).
- File name matches the component name (PascalCase).

```tsx
// src/pods/main/chat/components/MessageBubble.tsx
export function MessageBubble({ content }: { content: string }) {
  return <div className="...">{content}</div>;
}
```

### State Management

- Use **Zustand + Immer** for global async state (user data, routines, messages).
- Use **React Context** for auth state (`useAuth` hook).
- Use **React Hook Form** for all form state — do not manage form inputs with `useState`.

```ts
// Zustand store pattern
const useRoutineStore = create<State & Actions>()(
  immer((set) => ({
    routines: [],
    fetchRoutines: async () => {
      const data = await routineService.getAll();
      set((state) => { state.routines = data; });
    },
  }))
);
```

### Services (API Layer)

- Each resource has its own service file (e.g., `routine.services.ts`).
- Services only handle HTTP — no state updates, no UI logic.
- Use `VITE_API_URL` from the environment for base URLs.

```ts
// shared/services/routine.services.ts
const BASE_URL = import.meta.env.VITE_API_URL;

export async function getRoutines(userId: string): Promise<Routine[]> {
  const res = await fetch(`${BASE_URL}/api/routines/${userId}`);
  return res.json();
}
```

### Naming

| Thing | Convention | Example |
|---|---|---|
| Components | PascalCase | `ChatInput.tsx` |
| Hooks | camelCase with `use` prefix | `useSpeechToText.ts` |
| Stores | camelCase with `use` prefix | `useRoutineStore.ts` |
| Services | camelCase with `.services` suffix | `routine.services.ts` |
| Models | camelCase with `.model` suffix | `routine.model.ts` |
| Schemas | camelCase with `.schema` suffix | `login.schema.ts` |
| Utilities | camelCase | `utils.ts` |

### Code Style

ESLint enforces these automatically:

- 2-space indentation
- Single quotes
- Semicolons required
- No trailing whitespace
- `react-hooks/exhaustive-deps` — always declare hook dependencies

---

## Submitting Changes

### Pull Request Checklist

Before opening a PR, make sure:

- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` completes successfully
- [ ] Your code follows the conventions described above
- [ ] New components/hooks are properly typed
- [ ] The PR description explains *what* changed and *why*

### Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR.
- Reference any related issue in the PR description (e.g., `Closes #42`).
- Add screenshots or screen recordings for UI changes.
- Request a review from a maintainer when ready.

---

## Reporting Bugs

Open a GitHub Issue and include:

1. A clear, descriptive title
2. Steps to reproduce the bug
3. Expected vs. actual behavior
4. Browser and OS version
5. Any relevant console errors or screenshots

---

## Suggesting Features

Open a GitHub Issue with the `enhancement` label. Describe:

1. The problem you're trying to solve
2. Your proposed solution
3. Any alternatives you considered

---

Thank you for contributing to Routinary! 🎉
