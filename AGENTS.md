# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds all application code. Entry is `src/main.tsx`; routing lives under `src/app/` and page-level routes under `src/pages/`.
- Shared UI and utilities live in `src/common/` (notably `src/common/components/ui/` for shadcn/ui wrappers and `src/common/api/` for API helpers).
- Feature-specific code is grouped in `src/features/<feature-name>/` with local `components/` and `hooks/`.
- Static assets are in `public/`, and the production build outputs to `dist/`.

## Build, Test, and Development Commands
- `npm run dev`: Start Vite dev server (uses `--host` for LAN access).
- `npm run build`: Production build to `dist/`.
- `npm run build:dev`: Development-mode build for debugging.
- `npm run preview`: Serve the production build locally.
- `npm run lint`: Run ESLint with auto-fixes.
- `npm run format`: Run Prettier across the repo.

## Coding Style & Naming Conventions
- TypeScript + React; follow ESLint and Prettier output (run `npm run lint` / `npm run format`).
- Component files use `PascalCase.tsx` and hooks use `useXyz.ts`.
- Prefer feature-first organization under `src/features/` and keep shared primitives in `src/common/`.

## Testing Guidelines
- No test runner or test scripts are configured in this repository.
- If adding tests, align naming with common conventions like `*.test.ts(x)` or `*.spec.ts(x)` and document the new command in this file.

## Commit & Pull Request Guidelines
- Commit history uses Conventional Commits with scopes (e.g., `feat(quiz-feed): add solo session`). Keep this format.
- PRs should include a clear description, link related issues, and attach screenshots or short clips for UI changes.
- Note any new env vars or breaking changes in the PR description.

## Configuration Tips
- Node.js 18+ is required. Install deps with `npm install`.
- Tailwind and shadcn/ui are used; keep utility classes close to the component they style.
