import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = "your_jwt_secret";

const router:Router = Router();

// @ts-ignore
router.post("/signin", (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const userId = 1;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  res.json({ token });
});

router.post("/signup", (req, res) => {
  res.json({ msg: "Hello from http-backend" });
});

router.post("/create-room", (req, res) => {
  res.json({ msg: "Hello from http-backend" });
});

export default router;