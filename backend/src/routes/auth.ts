import { Router } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = (req.body ?? {}) as { username?: string; password?: string };

  if (
    !username ||
    !password ||
    username !== config.adminUser ||
    password !== config.adminPassword
  ) {
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  }

  const token = jwt.sign({ sub: username }, config.jwtSecret, { expiresIn: "12h" });
  return res.json({ ok: true, token });
});

export default router;
