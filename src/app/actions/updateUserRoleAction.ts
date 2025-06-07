"use server"

import { updateUserRole } from "@/lib/queries/updateUserRole"

export async function updateUserRoleAction(id: string, role: string) {
  return await updateUserRole(id, role)
}