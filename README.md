# Coach de Ventas IA | Adium Demo

> **Built in ~7 minutes with Claude Code**
>
> From reading [adium.com.ec](https://adium.com.ec) to a working app:
> - Analyzed website to understand the business (pharma, commercial teams, LATAM)
> - Designed demo script tailored for 250 sales reps
> - Built full Next.js app with Claude API integration
> - Created 3 modes: objection handler, email writer, visit prep
>
> Total time: **~7 minutes** (including research, planning, and coding)

### Prompts Used to Build This

| # | Prompt | Type |
|---|--------|------|
| 1 | "I'm doing an AI crash-course to 250 people... from this company: adium.com.ec What could be a good quick experiment for them?" | Research |
| 2 | "prepare a script for the objection handler demo" | Script |
| 3 | "can you build a web app where I can put these inputs and follow the script you just created?" | Build |
| 4 | "add the amount of time it took you to create this in the floating badge" | Enhancement |
| 5 | "can you improve the markdown display in coach responses?" | Enhancement |

**Total: 5 prompts** — 1 research, 1 script, 1 build, 2 enhancements.

---

## What This Is

A live demo app for Adium Ecuador's AI crash course. Shows commercial teams how AI can help them handle doctor objections, write follow-up emails, and prepare for visits.

## Features

- **Objection Handler** — Input what the doctor said, get a professional response
- **Context Aware** — Select specialty (cardiologist, pediatrician, etc.) and setting (private hospital, rural clinic)
- **Email Writer** — Generate follow-up emails from meeting notes
- **Visit Prep** — Get questions, anticipated objections, and talking points
- **Preset Examples** — Common objections as quick-click buttons

## Setup

```bash
# Install dependencies
npm install

# Add your Anthropic API key
echo "ANTHROPIC_API_KEY=sk-ant-your-key" > .env.local

# Run locally
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

```bash
vercel
# Set ANTHROPIC_API_KEY in Vercel environment variables
```

## Demo Script

See [demo-script.md](./demo-script.md) for the full presenter script with timing, talking points, and backup prompts.

## Tech Stack

- Next.js 15 + TypeScript
- Tailwind CSS
- Claude API (Sonnet)
