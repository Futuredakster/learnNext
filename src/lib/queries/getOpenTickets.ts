import { db } from "@/db";
import { tickets,customers } from "@/db/schema";
import { eq, asc} from "drizzle-orm";

export async function getOpenTickets() {
    const results = await db.select({
     id: tickets.id,
     ticketDate: tickets.createdAt,
     title: tickets.title,
     firstName: customers.firstName,
     lastName: customers.lastName,
    email: customers.email,
    tech:tickets.tech,
    completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(tickets.completed, false))
    .orderBy(asc(tickets.createdAt));
    return results;

}

// This function retrieves all open tickets, joining with the customers table to get customer details.
// It returns an array of objects containing the ticket creation date, title, customer's first name, last name, email, and assigned technician.