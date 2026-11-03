# Front-end for Fatec Women App

This directory contains the web-based front-end for the Fatec Women application.

## Architecture
- **Framework**: React.js
- **State Management**: Context API or Redux Toolkit
- **Styling**: CSS for full control and minimal dependencies
- **API Integration**: Fetch API for lightweight network requests

## Project Structure
- `src/components`: Reusable UI components (Buttons, Inputs, Modals)
- `src/pages`: Main application views (Landing, ReportForm, ReportList, Auth)
- `src/services`: API service layer
- `src/hooks`: Custom React hooks for business logic
- `src/context`: Global state management (Auth, Theme)
- `src/assets`: Images, icons, and global styles

## Routes

- `/`: landing page and emergency guidance.
- `/login` and `/register`: local prototype authentication screens.
- `/report`: report submission form.
- `/reports`: report listing loaded from the API.
- `/dashboard`: compatibility redirect to `/reports`.
- `/profile`: local user profile.
- Any unknown path displays a not-found page.

## Integration with Back-end
The front-end will consume the endpoints provided by the Python API located in `src/api`.
- Health check: `/health`
- Reports: `/reports` (GET, POST)

The frontend uses `/api` by default. Vite proxies this path to `http://localhost:8000`
during local development. Set `VITE_API_URL` to the deployed API origin when building
for another environment.
