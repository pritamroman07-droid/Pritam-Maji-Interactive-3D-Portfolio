import { Router } from "express";
import { getVisitors, incrementVisitors } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  const visitors = await getVisitors();
  return res.json({ ok: true, visitors });
});

router.post("/", async (_req, res) => {
  const visitors = await incrementVisitors();
  return res.json({ ok: true, visitors });
});

export default router;
