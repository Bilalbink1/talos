# Talos Credential Wallet

This is a monorepo containing both the **frontend** and **backend** of the Talos application.

## Project Structure

```
talos/
├── frontend/   # React.js application
└── backend/    # FastAPI application
```

---


## Project Report (Google Doc)

https://docs.google.com/document/d/1y_AB4Z1TjnwBiu8yf-PKo6DUZSPiVbe-O6CZxPfBzr4/edit?usp=sharing

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
docker build -t talos -f Dockerfile.dev .
```

#### Run the container
#### Windows
```bash
docker run -it --name talos -p 80:80 -v ${pwd}/app:/code/app talos
```

#### Max/Linux
```bash
docker run -it --name talos -p 80:80 -v "$(pwd)/app:/code/app" talos
```
