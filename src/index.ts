import { Elysia } from "elysia";
import { env } from "./config/env";
import { userRoutes } from "./routes/users";

const app = new Elysia()
  // Health check endpoint
  .get("/", () => ({
    status: "ok",
    message: "ElysiaJS server is running 🚀",
    timestamp: new Date().toISOString(),
  }))

  .get("/health", () => ({
    status: "healthy",
    uptime: process.uptime(),
  }))

  // Register routes
  .use(userRoutes)

  // Start server
  .listen(env.PORT);

console.log(
  `🦊 ElysiaJS server is running at http://${app.server?.hostname}:${app.server?.port}`
);
