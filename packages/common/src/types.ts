import { z } from "zod";

export const CreateUserSchema = z.object({
    usename: z.string().min(3).max(30),
    password: z.string().min(3).max(30),
    email: z.string().email()
})

export const SignInUserSchema = z.object({
    password: z.string().min(3).max(30),
    email: z.string().email()
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(50),
})
