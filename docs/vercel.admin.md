# Deploying the Admin Panel to Vercel

This guide provides the steps to deploy and manage the Fatec Women Admin Panel using Vercel.

## Prerequisites

- A [Vercel](https://vercel.com/) account.
- The project cloned locally.
- Vercel CLI installed (`npm i -g vercel`).

## Deployment Steps

### 1. Authentication
Log in to your Vercel account via the CLI:
```bash
npx vercel login
```

### 2. Project Initialization
Navigate to the admin directory and initialize the project:
```bash
cd src/admin
npx vercel
```
Follow the prompts to link the project to your Vercel account. When asked for the **Root Directory**, ensure it points to `src/admin`.

### 3. Environment Variables
The Admin Panel needs to communicate with the backend API. Add the following environment variable in the Vercel Dashboard:

- `VITE_API_URL`: The URL of the deployed API (e.g., `https://fatec-women-api.vercel.app`).

### 4. Build and Deploy
Vercel typically handles the build automatically on push, but you can trigger a manual build or preview:
```bash
npx vercel build
```

## Useful Commands

| Command | Description |
|---------|-------------|
| `npx vercel pull` | Pulls the latest remote environment variables and project settings. |
| `npx vercel deploy` | Deploys the current local state to Vercel. |
| `npx vercel logs` | Views the deployment logs. |
