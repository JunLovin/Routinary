# Routinary

**Routinary** is an AI-powered routine planner that lets you build and manage your daily habits and schedules through a conversational interface. Chat with an AI assistant to create routines, and export them as calendar events directly to Google Calendar or Outlook.

## Features

- 🤖 **AI Chat Interface** — Create and refine routines through natural conversation
- 🎙️ **Speech-to-Text** — Hands-free input using the Web Speech API
- 📅 **Calendar Export** — Generate ICS files to import into Google Calendar or Outlook
- 📚 **Help Center** — Searchable, categorized articles and how-to guides
- ⌨️ **Command Palette** — KBar-powered keyboard shortcuts for fast navigation
- ⚙️ **Account Settings** — Manage your profile and preferences

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite + SWC |
| Routing | React Router v7 |
| State Management | Zustand (with Immer) |
| Forms & Validation | React Hook Form + Zod |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Animations | GSAP |
| Command Palette | KBar |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- A running backend API (see environment variables below)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/JunLovin/routinary.git
cd routinary

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in your API URL

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment Variables

Create a `.env` file at the root of the project based on `.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

> **Note:** All client-side environment variables must be prefixed with `VITE_`.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint and auto-fix issues |

## Project Structure

```
src/
├── assets/             # Static assets (icons, images, favicons)
├── pods/               # Feature modules (domain-based organization)
│   ├── landing/        # Public landing page
│   ├── auth/           # Login, registration, and route guards
│   └── main/           # Authenticated app shell
│       ├── chat/       # AI chat interface (core feature)
│       ├── help/       # Help center and articles
│       └── settings/   # User account settings
├── shared/             # Reusable cross-feature code
│   ├── components/     # Shared UI components
│   ├── hooks/          # Custom React hooks
│   ├── models/         # TypeScript interfaces and types
│   ├── services/       # API communication layer
│   ├── stores/         # Zustand global state stores
│   ├── data/           # Static data (articles, etc.)
│   └── utils/          # Utility functions
├── routes.tsx          # Application route definitions
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Architecture Overview

Routinary follows a **pod/feature-based architecture**:

- **Pods** (`src/pods/`) group all code for a given feature (components, pages, schemas) in one place.
- **Shared** (`src/shared/`) contains reusable code that doesn't belong to a single feature.
- **Stores** (Zustand + Immer) manage global async state (routines, chat messages, user data).
- **Services** act as the API layer, keeping network logic separate from UI components.
- **Zod + React Hook Form** ensure type-safe, validated forms throughout the app.

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to get involved.

## License

This project is licensed under the MIT License.
