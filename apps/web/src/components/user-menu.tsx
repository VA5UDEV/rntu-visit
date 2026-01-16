import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AtSign } from "lucide-react";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="h-9 w-24" />;
  }

  if (!session) {
    return (
      <Button
        variant="ghost"
        className="rounded-full w-16 h-16 bg-transparent flex items-center justify-center"
        asChild
      >
        <Link href="/login">
          <AtSign size={24} strokeWidth={1.5} />
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
  <Button
    variant="ghost"
    className="rounded-full w-16 h-16 p-0 bg-transparent flex items-center justify-center"
  >
    {session.user.image ? (
      <img
        src={session.user.image}
        alt="Avatar"
        className="w-full h-full rounded-full object-cover"
      />
    ) : (
      session.user.name?.charAt(0).toUpperCase()
    )}
  </Button>
</DropdownMenuTrigger>

      <DropdownMenuContent className="bg-card">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{session.user.name}</DropdownMenuItem>
        <DropdownMenuItem>{session.user.email}</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/");
                  },
                },
              });
            }}
          >
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
