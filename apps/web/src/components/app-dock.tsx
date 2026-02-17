"use client";

import { useRouter } from "next/navigation";
import { Home, Map } from "lucide-react";
import { Dock } from "@/components/ui/dock";
import UserMenu from "@/components/user-menu";

export function AppDock() {
  const router = useRouter();

  return (
    <Dock
      items={[
        {
          icon: Home,
          label: "Home",
          onClick: () => router.push("/"),
        },
        // Separator
        {},
        // User menu (theme toggle lives inside)
        {
          slot: <UserMenu />,
        },
      ]}
    />
  );
}
