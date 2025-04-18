import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateRoomSchema, CreateUserSchema, SignInUserSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

app.listen(3001, () => {
    console.log("port is running on the port 3001")
})

/*
TODO: add the bcrypt to password
*/

app.post("/signup", async (req: Request, res: Response) => {
    try {
        const parsedData = CreateUserSchema.safeParse(req.body);
        if(!parsedData.success) {
            res.status(400).json({
                message: "invalid credentials"
            })
            return;
        }
        const { email, username, password } = parsedData.data;

        const existingUser = await prismaClient.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {
            res.status(409).json({
                message: "User already exists with given email or username"
            });
            return;
        }

        const user = await prismaClient.user.create({
            data: {
                email,
                username,
                password
            }
        })

        if(user) {
            res.status(200).json({
                message: "User created successfully!"
            });
        } else {
            res.status(200).json({
                message: "Please try again!"
            });
        }
    } catch(error) {
        console.log("error from the signUp point: ", error);
        res.status(200).json({
            message: "Error in server!",
            error: error
        });
    }
});

app.post("/signin", async(req: Request, res: Response) => {
    try {
        const parsedData = SignInUserSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(400).json({
                message: "invalid credentials"
            })
            return;
        }

        const { email, password } = parsedData.data;

        const isUser = await prismaClient.user.findFirst({
            where: {
                email,
                password
            }
        })

        if(!isUser) {
            res.status(400).json({
                message: "invalid credentials"
            })
            return;
        }

        const token = jwt.sign({
            userId: isUser?.id
        }, JWT_SECRET);

        res.json({
            message: "success",
            token
        });

    } catch (error) {
        console.log("error from the signin point: ", error);
        res.status(200).json({
            message: "Error in server!",
            error: error
        });
    }
})

app.post("/create", middleware, async (req, res) => {
    try {
        const parsedData = CreateRoomSchema.safeParse(req.body);
        if(!parsedData.success) {
            res.status(400).json({
                message: "invalid credentials"
            })
            return;
        }
        // @ts-ignore
        const userId = req.userId;

        try {
            const room = await prismaClient.room.create({
                data: {
                    slug: parsedData.data.name,
                    adminId: userId
                }
            })
    
            res.status(200).json({
                roomId: room.id
            });
        } catch(e) {
            res.status(411).json({
                message: "Room already exists!"
            });
        }

    } catch (error) {
        console.log("error from the create point: ", error);
        res.status(200).json({
            message: "Error in server!",
            error: error
        });
    }
})

app.get("/chats/:roomId", async(req, res) => {
    const roomId = Number(req.params.roomId);
    try {
        const messages = await prismaClient.chat.findMany({
            where: {
                id: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        })

        res.status(200).json({
            messages
        })
    } catch(e) {
        res.status(411).json({
            error: e
        })
    }
});
