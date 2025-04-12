import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateRoomSchema, CreateUserSchema, SignInUserSchema } from "@repo/common/types"

const app = express();
app.listen(3001, () => {
    console.log("port is running on the port 3001")
})

app.post("/signup", (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success) {
        res.status(400).json({
            message: "invalid credentials"
        })
        return;
    }
});

app.post("/signin", (req, res) => {
    const data = SignInUserSchema.safeParse(req.body);
    if(!data.success) {
        res.status(400).json({
            message: "invalid credentials"
        })
        return;
    }
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    });
})

app.post("/create", middleware,  (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success) {
        res.status(400).json({
            message: "invalid credentials"
        })
        return;
    }

})