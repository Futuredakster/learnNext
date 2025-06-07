import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(email: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);  // <-- usually you want just one user

  return user[0] ?? null;  // Return the first user or null if not found
}
