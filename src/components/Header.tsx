"use client"

import { HomeIcon, File, UsersRound,UserCircle } from "lucide-react"
import Link from "next/link"
import { logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { NavButton } from "@/components/NavButton"
import { ModeToggle } from "@/components/ModeToggle"
import { NavButtonMenu } from "./NavButtonMenu"

export function Header() {
  return (
    <header className="animate-slide h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/home" label="Home" icon={HomeIcon} />
          <Link
            href="/home"
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButton href="/users" label="Users" icon={UserCircle} />
          <NavButton href="/tickets" label="Tickets" icon={File} />
          <NavButtonMenu
            icon={UsersRound}
            label="Customers Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "New Customer", href: "/customers/form" },
            ]}
            />
          
          <ModeToggle />

          <Button
            onClick={() => logout()}
            variant="ghost"
            size="icon"
            aria-label="LogOut"
            className="rounded-full"
          >
            🚪 {/* Optional icon/text for clarity */}
          </Button>
        </div>
      </div>
    </header>
  )
}
