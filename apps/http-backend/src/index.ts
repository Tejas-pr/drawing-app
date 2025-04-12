import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
const app = express();
app.listen(3001, () => {
    console.log("port is running on the port 3001")
})

app.post("/signup", (req, res) => {

});

app.post("/signin", (req, res) => {
    const userId = 1;
    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET as string);

    res.json({
        token
    });
})

app.post("/create", middleware,  (req, res) => {

})