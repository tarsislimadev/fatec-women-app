## Project Overview

Fatec Women is a full-stack prototype designed to support the Municipal Women's Secretariat in managing and tracking cases of violence against women and girls.

### High-Level Architecture

The project is modularized into four main layers:

- Android Client (`src/android`): Native mobile application for victims, featuring biometric (facial) authentication for security.

- API (`src/api`): TypeScript/Express backend serving as the business logic layer and gateway to the database.

- Web Frontend (`src/frontend`): Modern web interface for data visualization and reporting.

- Admin Panel (`src/admin`): Specialized module for administrative management of cases and users.

- Database (`src/database`): PostgreSQL schema definitions (deployed via Supabase in production).

### Build and Run Commands

#### Backend (API)

- Docker: `docker compose up -d --build` from root.

- Local Node: 
  - Install: `cd src/api && npm ci`
  - Build: `npm run build`
  - Start: `npm start`
  - Dev mode: `npm run dev`

- Health Check: `http://localhost:8000/health`

#### Android App

- IDE: Open `src/android` in Android Studio.

- CLI Build (Windows): `cd src/android && ./gradlew.bat assembleDebug`

#### Web Frontend & Admin

- Both are Vite-based projects. Navigate to the respective directory (`src/frontend` or `src/admin`), run `npm install`, and then `npm run dev`.

### Key Conventions

- Layer Isolation: Keep Android logic in `src/android`, API logic in `src/api`, and database schema changes in `src/database`. Do not leak database logic into the app or app-specific logic into the API.

- API Design: Keep endpoints simple and status-oriented. Refer to `src/api/swagger.yaml` for the API specification.

- Validation: There are currently no automated test suites. Validation is performed via smoke checks:
  - For API/DB: Verify the `/health` endpoint.
  - For Android: Perform a Gradle build or verify it loads in Android Studio.

- Environment: Production uses Vercel for the API and Supabase for PostgreSQL. Use `src/api/.env` for local database configurations.
