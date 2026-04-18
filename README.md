# Logistics Management System (Full Stack + AI Chatbot)

A production-style logistics platform with modular backend architecture, React frontend, and chatbot support.

## Tech Stack
- Backend: Node.js, Express, MySQL, JWT Auth, bcrypt
- Frontend: React, Vite, React Router, Axios
- AI Layer: Rule-based chatbot endpoint (`POST /api/chatbot`) extensible to OpenAI API

## Project Structure

```text
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  sql/
  utils/
frontend/
  src/
    assets/
    components/
    pages/
    services/
```

## Setup

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
# edit .env for MySQL + JWT
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

## Database
Run:
```bash
mysql -u root -p < backend/sql/schema.sql
```

## API Summary
- Auth: `/api/auth/register`, `/api/auth/login`
- Orders: CRUD `/api/orders`
- Drivers: `/api/drivers`, `/api/drivers/assign/:orderId`, `/api/drivers/status/:orderId`
- Tracking: `/api/tracking/:trackingId`
- Warehouse: `/api/warehouse`
- Chatbot: `/api/chatbot`

## Advanced Features Roadmap
- Google Maps live tracking integration
- OTP delivery verification via SMS provider
- Payment gateway integration
- B2B CSV bulk upload pipeline

## Deployment
- Backend: Render/Railway
- Frontend: Vercel/Netlify
- Database: Managed MySQL (PlanetScale/Aiven/RDS)


## Phase-by-Phase Delivery
Detailed phase walkthrough is documented in `PHASES.md`.
