---
applyTo: "src/android/**"
description: "Use when working on the Android client for the Fatec Women app."
---

# Android guidance

- Keep UI, business logic, and API integration separated by layer; avoid mixing Android code with server-side behavior.
- For local validation, use the Gradle wrapper from the Android project folder: `cd src/android` then `./gradlew.bat assembleDebug` on Windows.
- Prefer incremental, targeted edits over large project-wide refactors.
- When changing screen flows or dependencies, check the existing app structure before introducing new architecture patterns.
- If a flow depends on the backend, keep the contract clear and align with the current Express API responses.
- Do not move API/database concerns into the app module.
