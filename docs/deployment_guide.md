# Deployment Guide

## Recommended Production Topology
- **Frontend**: Vercel (`frontend/` project)
- **Backend API**: Vercel (`backend/` project) or Render/Railway
- **Database**: Cloud MySQL (PlanetScale, Aiven, RDS)

---

## Deploy Frontend on Vercel
1. Import repository in Vercel.
2. Set **Root Directory** to `frontend`.
3. Build command: `npm install && npm run build`.
4. Output directory: `dist`.
5. Add environment variable:
   - `VITE_API_URL=https://<your-backend-domain>/api`
6. Deploy.

`frontend/vercel.json` already handles SPA rewrites and basic security headers.

---

## Deploy Backend on Vercel
1. Create a second Vercel project using the same repo.
2. Set **Root Directory** to `backend`.
3. Keep default build (`@vercel/node`) via `backend/vercel.json`.
4. Add environment variables:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`
   - `JWT_SECRET`
   - `OPENAI_API_KEY` (optional)
   - `CORS_ORIGINS=https://<your-frontend-domain>`
5. Deploy and test `/api/health`.

`backend/vercel.json` routes all requests to the serverless entry `api/index.js`.

---

## Database Setup
1. Provision cloud MySQL.
2. Run schema:
   ```bash
   mysql -u <user> -p < backend/sql/schema.sql
   ```
3. Restrict network access to deployment egress where possible.
4. Enable backups and connection encryption.

---

## Production Readiness Checklist
- Rotate JWT/API keys regularly.
- Use strong CORS allowlist (no wildcard in production).
- Monitor 429 rate-limit responses and tune threshold.
- Add structured logs and centralized observability.
- Add worker queues for bulk upload and async notifications.
