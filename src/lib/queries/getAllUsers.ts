import { db } from "@/db";
import { users } from "@/db/schema";

export async function getAllUsers() {
  const allUsers = await db.select().from(users);
  return allUsers;
}
