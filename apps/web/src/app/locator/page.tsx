import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@rntu-visit/auth";
import { MapNavigation } from "@/components/map-navigation";

export default async function MapDemoPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex h-svh w-full overflow-hidden">
        <MapNavigation />
      </div>
    </div>
  );
}
