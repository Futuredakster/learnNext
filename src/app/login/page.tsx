"use client";
import { login } from "@/lib/auth";
import { Button } from "@/components/ui/button";
export default function Login(){
    return(
        <div className="h-dvh flex flex-col items-center gap-6 text-4xl p-4">
            <h1>Repair Shop</h1>
          <Button onClick={() => login()}> Sign In with Google</Button>        
        </div>
    )
}