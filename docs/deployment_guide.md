# Deployment Guide

## Backend (Render or Railway)
1. Create a new service connected to `backend/`.
2. Set build command: `npm install`.
3. Set start command: `npm start`.
4. Configure environment variables (`DB_*`, `JWT_SECRET`, optional `OPENAI_API_KEY`).
5. Ensure cloud MySQL allows inbound access from deployment provider.

## Frontend (Vercel or Netlify)
1. Connect project root and set build directory to `frontend/`.
2. Build command: `npm install && npm run build`.
3. Output directory: `dist`.
4. Add `VITE_API_URL` pointing to deployed backend URL.

## Database (Cloud MySQL)
1. Provision managed MySQL (PlanetScale, Aiven, RDS, etc.).
2. Run `backend/sql/schema.sql`.
3. Use SSL connection options where provider requires.

## Production Readiness Checklist
- Rotate JWT secret and API keys.
- Enable HTTPS only.
- Add rate-limiting and audit logs.
- Use queue workers for bulk upload and notifications.
