import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  subCategory: z.string(),
  numView: z.number(),
  price: z.number(),
  updatedAt: z.date()
})

export type Task = z.infer<typeof taskSchema>
