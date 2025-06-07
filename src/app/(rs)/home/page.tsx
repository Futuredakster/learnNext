"use client"

import { useEffect, useState, useTransition } from "react"
import { UserAuth } from "./userAuth"

export default function Home() {
  const [isPending, startTransition] = useTransition()
  const [role, setRole] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<any>(null)

  useEffect(() => {
    // on page load, check if user already exists (no role needed)
    startTransition(async () => {
      const existingUser = await UserAuth("")
      if (existingUser) {
        setUserInfo(existingUser)
        setRole(existingUser.role) // assuming your user row has a `role` column
      }
    })
  }, [])

  const handleRoleSelection = (selectedRole: string) => {
    setRole(selectedRole)
    startTransition(async () => {
      const user = await UserAuth(selectedRole)
      setUserInfo(user)
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl mb-6">
          Welcome to the Computer Repair Shop 🛠️ (Demo version, in the real site you would default to user status) 
        </h1>

        {isPending && <p className="text-white">Loading...</p>}

        {!userInfo && !isPending && (
          <p className="text-white text-lg">
            Would you like to continue as a{" "}
            <button
              onClick={() => handleRoleSelection("user")}
              className="text-blue-700 underline mx-2"
            >
              User
            </button>{" "}
            or{" "}
            <button
              onClick={() => handleRoleSelection("manager")}
              className="text-blue-700 underline mx-2"
            >
              Manager
            </button>
            ?
          </p>
        )}

        {userInfo && (
          <p className="text-white text-lg">
            Hello <strong>{userInfo.name}</strong>! You’re signed in as{" "}
            <strong>{role}</strong> ✅
          </p>
        )}
      </div>
    </div>
  )
}

/*
"use server"

import { auth } from "@/auth"
import { createUser } from "@/lib/queries/createUser"

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    await createUser(session.user.email!, session.user.name!)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl text-center">
        Welcome to the Computer Repair Shop 🛠️
        Would You like to continue as a 
        
      </h1>
    </div>
  )
}



*/
