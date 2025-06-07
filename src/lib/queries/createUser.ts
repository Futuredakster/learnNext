import {db} from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function createUser(email: string, name: string, role?: string) {

const normalizedEmail = email.toLowerCase();

const existingUser = await db.select()
  .from(users)
  .where(eq(users.email, normalizedEmail));

if (existingUser.length > 0) {
  return existingUser[0];
}
if(role){
  const newUser = {
  email: normalizedEmail,
  name,
  role,
  createdAt: new Date(),
}
const [createdUser] = await db.insert(users).values(newUser).returning();
return createdUser;
}
const newUser = {
  email: normalizedEmail,
  name,
  createdAt: new Date(),
};

const [createdUser] = await db.insert(users).values(newUser).returning();
return createdUser;
}
