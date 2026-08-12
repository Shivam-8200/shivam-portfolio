# Shivam's Portfolio — DevOS

A desktop-OS-styled portfolio: draggable windows, a working terminal, an AI
chat window grounded in real project data, and a system-monitor widget that
repurposes "CPU/RAM" style stats into job-search stats.

## Structure

```
portfolio/            # Next.js frontend (this folder)
portfolio-backend/     # Express contact-form API (sibling folder)
```

## 1. Edit your content

Everything you'll want to personalize lives in **`lib/data.ts`** — name,
bio, skills, projects, experience, resume link, social links. Start there.

Drop your resume PDF at `public/files/resume.pdf`.

## 2. Frontend setup

```bash
cd portfolio
npm install
cp .env.example .env.local
```

Fill in `.env.local`:
- `GEMINI_API_KEY` — free key from https://aistudio.google.com/apikey (for the "Ask AI about me" window)
- `NEXT_PUBLIC_API_URL` — where your backend runs (default `http://localhost:8787`)

```bash
npm run dev
```

Open http://localhost:3000

## 3. Backend setup (contact form)

```bash
cd ../portfolio-backend
npm install
cp .env.example .env
```

Fill in `.env` with your SMTP details (Gmail example: use an
[App Password](https://myaccount.google.com/apppasswords), not your real
password) and the email address you want messages delivered to.

```bash
npm run dev
```

Runs at http://localhost:8787 — health check at `/api/health`.

## 4. Deploy

- **Frontend**: Vercel (recommended for Next.js). Set `GEMINI_API_KEY` and
  `NEXT_PUBLIC_API_URL` as environment variables in the Vercel dashboard.
- **Backend**: Railway, Render, or Fly.io. Set the same env vars as your
  local `.env`. Update `ALLOWED_ORIGINS` to your deployed frontend URL.

## Shortcuts

| Shortcut | Action |
|---|---|
| Enter (on boot screen) | Skip boot animation |
| Click a desktop icon | Launch that window |
| Click "start" | Open the app launcher |

## Stack

Next.js 15 · React 19 · Tailwind CSS v4 · Framer Motion · react-draggable ·
Gemini API (chat) · Express + Nodemailer (contact form)
