import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@rntu-visit/auth";
import { MapNavigation } from "@/components/map-navigation";
import { RntuLogo } from "@/components/rntu-logo";

import Link from "next/link";

export default async function MapDemoPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 border-b">
        <Link href="/" className="hover:opacity-80 transition">
          <RntuLogo />
        </Link>
      </header>

      {/* Main */}
      <div className="h-[84%] w-[97%] mt-6 mx-auto">
        <MapNavigation />
      </div>
    </div>
  );
}
