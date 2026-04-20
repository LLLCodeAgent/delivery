# Logistics Management System (Backend + Next.js Frontend + AI Chatbot)

Production-ready logistics platform with modular Node/Express backend and **Next.js frontend** optimized for Vercel deployment.

## Tech Stack
- Backend: Node.js, Express, MySQL, JWT, bcrypt
- Frontend: Next.js (App Router), React, Axios
- AI: Rule-based chatbot with optional OpenAI fallback

## Project Structure
```text
backend/
frontend/
  app/
  components/
  lib/
docs/
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

## API Modules
- Auth, Orders, Drivers, Tracking, Warehouse, Chatbot, Advanced

## Testing
```bash
cd backend
npm test
```

Postman collection: `docs/postman_collection.json`

## Vercel Deployment (Production)
- Deploy `frontend/` as one Vercel project (Next.js).
- Deploy `backend/` as second Vercel project using `backend/vercel.json`.
- Set `NEXT_PUBLIC_API_URL=https://<backend-domain>/api` in frontend.
- Set `CORS_ORIGINS=https://<frontend-domain>` in backend.
- Full guide: `docs/deployment_guide.md`
