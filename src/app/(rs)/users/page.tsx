

import { auth } from "@/auth"
import { getAllUsers } from "@/lib/queries/getAllUsers"
import { getUser } from "@/lib/queries/getUser"
import UserRow from "./UserRoleDropdown"
import { redirect } from "next/navigation";

export default async function Users() {
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser) {
    redirect("/api/auth/signout?callbackUrl=/login");
    return null;
  }

  const currentDbUser = await getUser(currentUser.email!);
  if (!currentDbUser) {
    redirect("/api/auth/signout?callbackUrl=/login");
    return null;
  }

  const users = await getAllUsers();
  if (!users || users.length === 0) {
    redirect("/api/auth/signout?callbackUrl=/login");
    return null;
  }

  // ✅ Now safe to access `.role` since we've guarded above
  const isManager = currentDbUser.role === "manager";
  const isAdmin = currentDbUser.role === "admin";
  const premission = isManager || isAdmin;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-yellow-700 mb-6 drop-shadow">
        👥 All Users
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <UserRow
            key={user.id}
            id={String(user.id)}
            name={user.name}
            email={user.email}
            role={user.role}
            isEditable={premission}
          />
        ))}
      </div>
    </div>
  );
}
