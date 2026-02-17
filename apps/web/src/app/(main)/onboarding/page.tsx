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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RntuLogo } from "@/components/rntu-logo";
import { ClipboardList } from "lucide-react";
import Link from "next/link";

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border/60 px-6 py-4">
        <Link href="/" className="hover:opacity-70 transition-opacity">
          <RntuLogo />
        </Link>
        <Badge
          variant="outline"
          className="gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground border-border/60"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          Registration
        </Badge>
      </header>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 flex-shrink-0">
                <ClipboardList className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-xl font-semibold">
                Visitor Registration
              </CardTitle>
            </div>
            <CardDescription className="text-sm text-muted-foreground leading-relaxed pl-11">
              Provide your details to complete your visit registration and
              access the campus navigator.
            </CardDescription>
          </CardHeader>

          <Separator className="opacity-50 mb-1" />

          <CardContent className="pt-5">
            <OnboardingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
