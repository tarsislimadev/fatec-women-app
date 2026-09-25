# AGENTS.md

## Project overview
This repository contains a full-stack prototype for the Fatec Women app:

- Android client code lives under [src/android](src/android)
- Node.js API code lives under [src/api](src/api)
- Database schema and migrations live under [src/database](src/database)
- Local service orchestration is defined in [docker-compose.yaml](docker-compose.yaml)
- Project setup and usage are described in [README.md](README.md) and [docs/INSTALL.md](docs/INSTALL.md)

Keep changes scoped to the relevant layer: Android app code should stay in the Android project, API changes should stay in the Express service, and schema changes should be added under the database folder.

## Local development
Use the repo root for service startup:

```bash
docker compose up -d --build
```

This starts the API and Postgres services. The API exposes health checks at `http://localhost:3000/health` and the database is available on port `5432`.

For Android development, open the project folder [src/android](src/android) in Android Studio. On Windows, the repository includes a Gradle wrapper script at [src/android/gradlew.bat](src/android/gradlew.bat); for command-line builds use:

```powershell
cd src/android
./gradlew.bat assembleDebug
```

## Conventions
- Prefer small, targeted changes over broad refactors.
- Do not mix Android-specific logic into the API or database logic into the app layer.
- Keep API endpoints simple and status-oriented; the current API is a lightweight Express app, not a large framework-driven service.
- If a database change is needed, add or update the SQL script in [src/database](src/database) and keep the schema definition explicit.
- If a change affects setup or onboarding, update the relevant documentation instead of duplicating it elsewhere.

## Validation
There are no dedicated automated tests configured in this repo at the moment, so validation should be lightweight and practical:

- For API or database changes: start Docker services and verify the health endpoint responds.
- For Android changes: run the relevant Gradle build or verify the project still loads correctly in Android Studio.
- Prefer direct smoke checks over expensive rewrites.

## Key files to review first
- [README.md](README.md)
- [docker-compose.yaml](docker-compose.yaml)
- [src/api/index.js](src/api/index.js)
- [src/api/package.json](src/api/package.json)
- [src/database/001-create-tables.sql](src/database/001-create-tables.sql)
- [src/android/settings.gradle.kts](src/android/settings.gradle.kts)
