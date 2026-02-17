import { AppDock } from "@/components/app-dock";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-svh">
      <main>{children}</main>
      <AppDock />
    </div>
  );
}
