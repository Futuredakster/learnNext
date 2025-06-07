import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export  async function updateUserRole(id: string, role: string) {
    const user = await db
        .update(users)
        .set({ role })
        .where(eq(users.id, Number(id)))
        .returning();
    return user;
}