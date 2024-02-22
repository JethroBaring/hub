import { z } from "zod";

export const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
    repeatPassword: z.string().min(8).max(32)
})

export type FormSchema = typeof formSchema