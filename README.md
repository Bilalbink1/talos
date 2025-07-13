# Talos Credential Wallet

This is a monorepo containing both the **frontend** and **backend** of the Talos application.

## Project Structure

```
talos/
├── frontend/   # React.js application
└── backend/    # FastAPI application
```

---

## Getting Started

### Frontend (React.js)

#### Install dependencies

```bash
cd frontend
npm install
```

#### Run tests
```bash
npm run test
npm run test:ui
```

#### Start development server

```bash
npm run dev
```

---

### Backend (FastAPI with Docker)

#### Build Docker image

```bash
cd backend
docker build -t talos .
```

#### Run the container

```bash
docker run -it --name talos -p 80:80 talos
```
