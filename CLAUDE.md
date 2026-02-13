# Project Context

## What This Is
Demo app for Adium Ecuador's AI crash course (250 non-technical sales reps). Shows how AI can help pharmaceutical commercial teams handle doctor objections, write follow-up emails, and prepare visits.

## Tech Stack
- Next.js 15 + TypeScript
- Tailwind CSS
- Claude API (Sonnet) via @anthropic-ai/sdk

## Key Files
- `src/app/page.tsx` — Main UI with 3 modes (objection, email, preparation)
- `src/app/api/chat/route.ts` — Claude API integration
- `demo-script.md` — Presenter script for live demo

## Architecture Decisions
- Single page app, no routing needed
- API route calls Claude directly (no middleware)
- Markdown formatting done client-side via `formatMarkdown()` function
- Context selectors (specialty, setting) only show in objection mode

## Environment
- `ANTHROPIC_API_KEY` required in `.env.local` (local) or Vercel env vars (prod)

## Deployment
- GitHub: https://github.com/chuycepeda/adium-demo
- Vercel: https://adium-demo.vercel.app
- Deploy: `npx vercel --prod --yes`

## Branding
- Colors: Red accent (#dc2626), white/gray backgrounds
- Clean pharmaceutical look matching adium.com.ec
- Logo "adium" in header with red styling

## Build History
Built with 6 prompts:
1. Research — analyze adium.com.ec
2. Script — create presenter demo script
3. Build — create the web app
4. Enhancement — add build time to badge
5. Enhancement — improve markdown rendering
6. Branding — apply Adium brand colors and style
