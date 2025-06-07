"use server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@/auth";



export async function deleteUserAction(){
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  console.log("Deleting user with email:", session.user.email);

  await db.delete(users).where(eq(users.email, session.user.email!));
  return { message: "User deleted successfully" };
};
