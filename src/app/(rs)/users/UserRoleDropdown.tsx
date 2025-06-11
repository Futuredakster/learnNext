"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteUserAction } from "@/app/actions/deleteUserAction"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { updateUserRoleAction } from "@/app/actions/updateUserRoleAction"

export default function UserRow({
  id,
  name,
  email,
  role,
  isEditable,
}: {
  id: string
  name: string
  email: string
  role: string
  isEditable: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const [currentRole, setCurrentRole] = useState(role)
  const [editable, setEditable] = useState(isEditable)
  const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

  const handleRoleChange = (newRole: string) => {
    if (newRole === currentRole) return
    setCurrentRole(newRole) // Update UI immediately
    if (newRole === "user") setEditable(false)
    startTransition(() => {
      updateUserRoleAction(id, newRole)
    })
     router.refresh()
  }

  // New async delete handler without useAction
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteUserAction(email)
            router.refresh() // pass id to action if needed
      // optionally, do something after deletion, e.g. refresh list or notify parent
    } catch (error) {
      console.error("Delete failed:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="border rounded-xl p-4 flex justify-between items-center bg-yellow-50 shadow-sm hover:shadow-md transition">
      <div>
        <p className="text-lg font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Role:</span>
        <span className="text-sm text-gray-600 flex items-center gap-1">
          {currentRole}
          {editable && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0 h-auto w-auto"
                  disabled={isPending || isDeleting}
                  aria-label="Change role"
                >
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {["user", "manager", "admin"].map((r) => (
                  <DropdownMenuItem
                    key={r}
                    onClick={() => handleRoleChange(r)}
                  >
                    {r}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </span>
        {editable && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isPending || isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        )}
      </div>
    </div>
  )
}
