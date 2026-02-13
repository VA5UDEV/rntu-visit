import OnboardingForm from "@/components/onboarding-form";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@rntu-visit/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RntuLogo } from "@/components/rntu-logo";
import Link from "next/link";

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-6 py-6">
        <Link href="/" className="hover:opacity-80 transition">
          <RntuLogo />
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-10">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Visitor Registration</CardTitle>
            <CardDescription>
              Please provide your details to complete your visit registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OnboardingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
