import { Router } from "express";
import { Jwt } from "jsonwebtoken";

const router:Router = Router();

router.get("/signin", (req, res) => {
  const { username, password } = req.body;

  if(!username || !password) {
    return res.status(400).json({ msg: "Missing username or password" });
  }
});

router.get("/signup", (req, res) => {
  res.json({ msg: "Hello from http-backend" });
});

router.get("/create-room", (req, res) => {
  res.json({ msg: "Hello from http-backend" });
});

export default router;