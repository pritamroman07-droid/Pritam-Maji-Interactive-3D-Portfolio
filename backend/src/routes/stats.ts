import { Router } from "express";
import { getVisitors, listMessages } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  const [visitors, messages] = await Promise.all([getVisitors(), listMessages()]);
  return res.json({ ok: true, visitors, messages: messages.length, started: new Date().getFullYear() });
});

export default router;
