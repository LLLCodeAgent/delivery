# Deployment Guide

## Why `404: NOT_FOUND` happens on Vercel
This usually occurs when deploying a monorepo from root without a routing/build config. The platform cannot find a framework entrypoint for `/`.

---

## Recommended: Single Vercel Project from Repo Root
This repository includes root-level `vercel.json` and `api/index.js` to prevent the 404 issue.

### Steps
1. Import repository into Vercel.
2. Keep **Root Directory = repo root**.
3. Deploy (Vercel will use root `vercel.json`).
4. Set environment variables:
   - `NEXT_PUBLIC_API_URL=/api`
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`
   - `JWT_SECRET`
   - `OPENAI_API_KEY` (optional)
   - `CORS_ORIGINS=https://<your-vercel-domain>`

### What root config does
- Builds Next.js frontend from `frontend/package.json`.
- Builds serverless backend API from `api/index.js` (which imports `backend/app.js`).
- Routes `/api/*` to backend function and all other paths to frontend.

---

## Alternative: Two Vercel Projects
- Frontend project with root `frontend/`
- Backend project with root `backend/`

Use this only if you prefer split deployments.

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
- Monitor 429 rate-limit logs.
- Add centralized logs/metrics/traces.
- Move bulk/OTP/payment jobs to async workers.
