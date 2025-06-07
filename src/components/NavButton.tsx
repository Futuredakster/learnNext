import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
    icon: LucideIcon,
    label: string,
    href?: string,
}

export function NavButton({
    icon: Icon,
    label,
    href,
}: Props){
    return (
// Using `asChild` lets the <Link> become the actual rendered element instead of <Button> wrapping it.
// This avoids invalid HTML like <button><a></a></button> and still applies the button styles to the <Link>.
        <Button
          variant="ghost"
          size="icon"
          aria-label={label}
          title={label}
          className="rounded-full"
          asChild
          >
            {href ? (
                <Link href={href}>
                    <Icon/>
                </Link>
            ): (
                <Icon/>
            )}
          </Button>
    )
}