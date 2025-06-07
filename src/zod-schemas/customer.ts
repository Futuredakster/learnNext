import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { customers } from '@/db/schema'
import { z, ZodType } from "zod";

export const insertCustomerSchema = createInsertSchema(customers, {
    firstName: (schema) => schema.min(1, "First Name is required"),
    lastName: (schema) => schema.min(1, "Last Name is required"),
    address1: (schema) => schema.min(1,"Address is required"),
    city: (schema) => schema.min(1, "City is required"),
    state: (schema) => schema.length(2, "State must be exactly two charahcters"),
    email: (schema) => schema.email("Invalid email adress").min(1),
    zip: (schema) => schema.regex(/^\d{5}(-\d{4})?$/, "ZIP code must be valid"),
    phone: (schema) => schema.regex(/^\d{3}-\d{3}-\d{4}$/, "Phone format must be valid use xxx-xxx-xxxx"),
}) as unknown as ZodType<any, any, any>;

export const selectCustomerSchema = createSelectSchema(customers) as unknown as ZodType<any, any, any>;

export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;