// Vercel serverless entry point.
// Re-exports the Express app without calling app.listen() — Vercel manages
// the HTTP lifecycle and invokes this handler for every /api/* request.
export { default } from "../artifacts/api-server/src/app";
