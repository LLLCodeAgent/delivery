# Logistics Management System (Backend + Next.js Frontend + AI Chatbot)

Production-grade logistics platform with modular Node/Express backend and Next.js frontend.

## Tech Stack
- Backend: Node.js, Express, MySQL, JWT, bcrypt
- Frontend: Next.js (App Router), React, Axios
- AI: Rule-based chatbot with optional OpenAI fallback

## Project Structure
```text
api/                      # Root Vercel serverless entry
backend/
frontend/
  app/
  components/
  lib/
vercel.json               # Root monorepo deployment config
docs/
.github/workflows/        # CI pipeline
```

## Local Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## Database
```bash
mysql -u root -p < backend/sql/schema.sql
```

## Health / Readiness
- Liveness: `GET /api/health`
- Readiness: `GET /api/ready` (checks DB connectivity)

## Testing
```bash
cd backend
npm test
```

Postman collection: `docs/postman_collection.json`

## Vercel Deployment (Production)
### Option A — Recommended (single Vercel project from repo root)
1. Import repository in Vercel.
2. Keep **Root Directory = repository root**.
3. Vercel uses root `vercel.json`:
   - `frontend/package.json` builds Next.js app
   - `api/index.js` serves backend Express API
4. Configure environment variables:
   - Frontend: `NEXT_PUBLIC_API_URL=/api`
   - Backend: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`, `JWT_SECRET`, `CORS_ORIGINS`

### Option B — Two projects
- Deploy `frontend/` and `backend/` separately as two Vercel projects.

Full guide: `docs/deployment_guide.md`

## CI
- GitHub Actions workflow runs backend tests on pushes/PRs touching backend files.
