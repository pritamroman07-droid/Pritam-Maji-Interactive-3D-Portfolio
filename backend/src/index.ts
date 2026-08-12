import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import { config } from "./config";
import authRoutes from "./routes/auth";
import contactRoutes from "./routes/contact";
import messagesRoutes from "./routes/messages";
import resumeRoutes from "./routes/resume";
import statsRoutes from "./routes/stats";
import visitorRoutes from "./routes/visitor";

const app = express();
app.disable("x-powered-by");

app.use(
  cors({
    origin: config.corsOrigin === "*" ? "*" : config.corsOrigin.split(","),
    exposedHeaders: ["Content-Disposition"],
  }),
);
app.use(express.json({ limit: "32kb" }));

// Health check (used by Render/Railway to verify the service)
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, uptime: Math.round(process.uptime()), mongo: Boolean(config.mongoUri) });
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/resume", resumeRoutes);

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "Not found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[api] unhandled error:", err);
  res.status(500).json({ ok: false, error: "Internal server error" });
});

app.listen(config.port, () => {
  console.log(`🚀 Pritam portfolio API listening on http://localhost:${config.port}`);
  console.log(`   storage: ${config.mongoUri ? "MongoDB" : "JSON file (data/db.json)"}`);
});
