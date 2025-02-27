import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint - responds immediately without loading data
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/api/items", async (_req, res) => {
    const items = await storage.getAllItems();
    res.json(items);
  });

  app.get("/api/items/:type", async (req, res) => {
    const items = await storage.getItemsByType(req.params.type);
    res.json(items);
  });

  // Debug endpoint to verify data loading
  app.get("/api/debug/items", async (_req, res) => {
    try {
      console.time('debug:getAllItems');
      const items = await storage.getAllItems();
      console.timeEnd('debug:getAllItems');

      const stats = {
        totalItems: items.length,
        byType: items.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      };

      res.json({ stats, success: true });
    } catch (error) {
      console.error('Debug endpoint error:', error);
      res.status(500).json({ 
        error: 'Failed to load items', 
        message: error instanceof Error ? error.message : 'Unknown error',
        success: false 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}