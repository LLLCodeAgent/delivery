# Deployment Guide

## Why `404: NOT_FOUND` happens on Vercel
This usually occurs when deploying a monorepo from root without routing/build config.

---

## Recommended: Single Vercel Project from Repo Root
This repository includes root-level `vercel.json` and `api/index.js`.

### Steps
1. Import repository into Vercel.
2. Keep **Root Directory = repo root**.
3. Deploy (Vercel uses root `vercel.json`).
4. Set environment variables:
   - `NEXT_PUBLIC_API_URL=/api`
   - `NODE_ENV=production`
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`
   - `JWT_SECRET`
   - `OPENAI_API_KEY` (optional)
   - `CORS_ORIGINS=https://<your-vercel-domain>`

### Verification
- `GET /api/health` should return `ok`.
- `GET /api/ready` should return `ready` after DB connection works.

---

## Alternative: Two Vercel Projects
- Frontend project with root `frontend/`
- Backend project with root `backend/`

---

## Database Setup
1. Provision cloud MySQL.
2. Run schema:
   ```bash
   mysql -u <user> -p < backend/sql/schema.sql
   ```
3. Restrict network access and enable encrypted connections.

---

## Production Readiness Checklist
- Rotate secrets and keys.
- Restrict CORS to known domains.
- Validate required env vars (`JWT_SECRET`, DB settings) in production.
- Monitor 429 rate-limit logs.
- Add centralized logs/metrics/traces.
- Move bulk/OTP/payment jobs to async workers.
