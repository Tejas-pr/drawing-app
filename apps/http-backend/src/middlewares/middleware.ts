import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}
export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decode = Jwt.verify(token, process.env.JWT_SECRET as JwtPayload);
        if (!decode) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.userId = decode.userId;
        next();
    } catch(e) {
        return res.status(401).json({ error: "Unauthorized" });
    }
}