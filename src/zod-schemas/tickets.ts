import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema";
import { z, ZodType } from "zod";

export const insertTicketSchema = createInsertSchema(tickets, {
    //id: z.union([z.number(), z.literal("(New)")]),
    title: (schema) => schema.min(1, "Title is required"),
    description: (schema) => schema.min(1, "Description is required"),
    tech: (schema) => schema.email("Invalid email address"),
})as unknown as ZodType<any, any, any>;

export const selectTicketSchema = createSelectSchema(tickets)as unknown as ZodType<any, any, any>;

export type insertTicketSchemaType = z.infer<typeof insertTicketSchema>;
export type selectTicketSchemaType = z.infer<typeof selectTicketSchema>;
