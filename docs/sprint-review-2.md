# Sprint 2 Review: Core Feature Implementation

## Summary
Sprint 2 focused on transforming the basic API into a functional system by implementing user authentication and database persistence.

## Accomplishments
- [x] Implemented JWT (JSON Web Token) authentication for secure API access.
- [x] Developed Signup and Login endpoints with password hashing using bcrypt.
- [x] Integrated the Express API with PostgreSQL for persistent user storage.
- [x] Added request validation middleware to ensure data integrity.

## Challenges & Lessons Learned
- **Challenge**: Handling token expiration and refresh logic.
- **Solution**: Implemented a standard JWT expiration window and created a clear error response for expired tokens.
- **Lesson**: Validation should occur as early as possible in the request lifecycle to reduce unnecessary database load.

## Final Status
- **Status**: Completed
- **Approval**: Approved for transition to Sprint 3.
