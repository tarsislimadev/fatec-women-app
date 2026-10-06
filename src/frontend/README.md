# Front-end for Fatec Women App

This directory contains the web-based front-end for the Fatec Women application.

## Planned Architecture
- **Framework**: React.js
- **State Management**: Context API or Redux Toolkit
- **Styling**: CSS for full control and minimal dependencies
- **API Integration**: Fetch API for lightweight network requests

## Project Structure (Planned)
- `src/components`: Reusable UI components (Buttons, Inputs, Modals)
- `src/pages`: Main application views (Landing, ReportForm, ReportList, Auth)
- `src/services`: API service layer
- `src/hooks`: Custom React hooks for business logic
- `src/context`: Global state management (Auth, Theme)
- `src/assets`: Images, icons, and global styles

## Key Features to Implement
1. **User Authentication**: Login and Registration screens.
2. **Report Submission**: A secure form to submit reports (occurrences).
3. **Report Listing**: A view to list submitted reports with appropriate access control.
4. **User Profile**: Management of user data and preferences.
5. **Admin Dashboard**: (If applicable) To manage reports and users.

## Integration with Back-end
The front-end will consume the endpoints provided by the Python API located in `src/api`.
- Health check: `/health`
- Auth: `/auth/login`, `/auth/register`
- Reports: `/reports` (GET, POST)

## Development Steps
- [ ] Initialize project with Vite (React.js + TS)
- [ ] Setup global Core CSS styles
- [ ] Implement basic routing with React Router
- [ ] Create core UI components
- [ ] Integrate with the Python API using Fetch
- [ ] Implement Form validation
- [ ] Final UI/UX polishing
