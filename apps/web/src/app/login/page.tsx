import SignIn from "@/components/register";
import { RntuLogo } from "@/components/rntu-logo";

export default function SignInPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-4 p-6 md:p-10">
      <a href="/" className="flex items-center self-center">
        <RntuLogo />
      </a>
      <div className="w-full max-w-sm">
        <SignIn />
      </div>
    </div>
  );
}
