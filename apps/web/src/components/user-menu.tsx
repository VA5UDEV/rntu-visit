"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AtSign, LogOut, Mail, User } from "lucide-react";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  if (!session) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-10 w-10"
        asChild
      >
        <Link href="/login" aria-label="Sign in">
          <AtSign size={18} strokeWidth={1.5} />
        </Link>
      </Button>
    );
  }

  const initials =
    session.user.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-10 w-10 p-0 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="User menu"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user.image ?? undefined}
              alt={session.user.name ?? "User"}
            />
            <AvatarFallback className="text-xs font-semibold bg-muted text-muted-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="top"
        sideOffset={12}
        className="w-52 bg-card border-border/60 shadow-md mb-1"
      >
        <DropdownMenuLabel className="pb-1">
          <p className="text-sm font-semibold leading-none">
            {session.user.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {session.user.email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Theme toggle row */}
        <div className="flex items-center justify-between px-2 py-0">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ModeToggle />
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="gap-2 text-xs text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
          onClick={() => {
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => router.push("/"),
              },
            });
          }}
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
