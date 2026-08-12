import { Router } from "express";
import { deleteMessage, listMessages } from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, async (_req, res) => {
  const messages = await listMessages();
  return res.json({ ok: true, messages });
});

router.delete("/:id", requireAuth, async (req, res) => {
  await deleteMessage(req.params.id);
  return res.json({ ok: true });
});

export default router;
