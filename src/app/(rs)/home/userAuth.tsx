"use server"

import { auth } from "@/auth"
import { createUser } from "@/lib/queries/createUser"
import { getUser } from "@/lib/queries/getUser"

export async function UserAuth(role: string) {
  const session = await auth()
    if(session?.user) {
            const results = await getUser(session.user.email!);
    if(!results) {
const isManager = role === 'manager';
const isUser = role === 'user';
  if (isUser) {
    const results = await createUser(session.user.email!, session.user.name!)
     return results
  } else if (isManager) {
    const results = await createUser(session.user.email!, session.user.name!, 'manager')
      return results
}
    }
    return results
    }

  }
 

