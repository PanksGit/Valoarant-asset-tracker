import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import { createServer } from "http";
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  console.time('server:startup');
  log("Starting server initialization...");

  // Verify and create public directory if it doesn't exist
  const publicDir = path.join(__dirname, "..", "dist", "public");
  try {
    await fs.access(publicDir);
    log(`Public directory found at ${publicDir}`);
  } catch (error) {
    log(`Creating public directory at ${publicDir}`);
    await fs.mkdir(publicDir, { recursive: true });

    // Create a minimal index.html if it doesn't exist
    const indexPath = path.join(publicDir, 'index.html');
    try {
      await fs.access(indexPath);
    } catch (error) {
      const minimalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valorant Asset Calculator</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
      await fs.writeFile(indexPath, minimalHtml);
      log(`Created minimal index.html at ${indexPath}`);
    }
  }

  log("Initializing storage...");
  console.time('storage:load');
  await Promise.resolve();
  console.timeEnd('storage:load');
  log("Storage initialized");

  log("Registering routes...");
  console.time('routes:register');
  const server = createServer(app);
  await registerRoutes(app);
  console.timeEnd('routes:register');
  log("Routes registered");

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    log(`Error: ${err.message}`);
  });

  // Set up Vite middleware in development mode
  if (app.get("env") === "development") {
    log("Setting up Vite middleware...");
    await setupVite(app, server);
    log("Vite middleware setup complete");
  } else {
    log("Setting up static file serving...");
    serveStatic(app);
    log("Static file serving setup complete");
  }

  try {
    const PORT = process.env.PORT || 5000;
    log(`Attempting to start server on port ${PORT}...`);

    server.listen(PORT, () => {
      console.timeEnd('server:startup');
      log(`Server running at http://0.0.0.0:${PORT}`);
    });

    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        log(`Port ${PORT} is already in use`);
        process.exit(1);
      } else {
        log(`Server error: ${error.message}`);
        throw error;
      }
    });
  } catch (err) {
    log(`Failed to start server: ${err}`);
    process.exit(1);
  }
})();