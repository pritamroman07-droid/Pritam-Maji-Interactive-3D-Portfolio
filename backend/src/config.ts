import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || "",
  adminUser: process.env.ADMIN_USER || "pritam",
  adminPassword: process.env.ADMIN_PASSWORD || "admin",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  contactWebhook: process.env.CONTACT_WEBHOOK_URL || "",
};
