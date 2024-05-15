import { z } from "zod";

export const TaskSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3),
    description: z.string().min(10).optional(),
    completed: z.boolean().default(false)
})

export type Task = z.infer<typeof TaskSchema>
