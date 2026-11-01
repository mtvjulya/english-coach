# AGENTS

## Environment
- Windows, PowerShell only (bash/WSL unavailable — use `shell_flavor: "powershell"`)
- Node 18, npm 10

## Commands
- `npm run dev` — dev server (Vite 5), port 5173
- `npm run build` — `tsc -b && vite build` (typecheck + prod bundle + PWA)
- `npm run icons` — regenerate PNG icons (scripts/gen-icons.mjs, no deps)

## Conventions
- UI language: Russian; content being taught: English
- All AI logic goes through `AIProvider` (src/engine/ai/) — never call remote APIs directly from screens
- Progress persists via zustand `persist` → localStorage key `english-coach-v1`
- Free tech only: Web Speech API for TTS/STT, local checker for translations
