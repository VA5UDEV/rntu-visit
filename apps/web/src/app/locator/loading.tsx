import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

// Mirrors the MapNavigation layout: left sidebar + full-screen map area.
// No dock on this page — matches the (locator) group layout.
export default function LocatorLoading() {
  return (
    <div className="flex h-svh w-full overflow-hidden">
      {/* Sidebar skeleton — hidden on mobile */}
      <div className="hidden md:flex flex-col w-80 flex-shrink-0 border-r border-border/60 bg-background">
        {/* Sidebar header */}
        <div className="px-4 py-3.5 border-b border-border/60 flex items-center gap-2.5">
          <Skeleton className="h-7 w-7 rounded-lg flex-shrink-0" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        {/* Search */}
        <div className="p-4 space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>

          <Separator className="opacity-40" />

          {/* Route planner */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-0.5 w-5 flex-shrink-0">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-6 w-px" />
              </div>
              <Skeleton className="h-9 flex-1 rounded-md" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full flex-shrink-0 ml-[3px]" />
              <Skeleton className="h-9 flex-1 rounded-md" />
            </div>
          </div>

          <Separator className="opacity-40" />

          {/* Building list */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-3 w-28" />
            </div>
            <div className="space-y-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2.5 px-2.5 py-2">
                  <Skeleton className="h-2.5 w-2.5 rounded-full flex-shrink-0" />
                  <Skeleton
                    className="h-4 rounded"
                    style={{ width: `${55 + (i % 4) * 10}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map area skeleton */}
      <div className="flex-1 relative bg-muted/30 animate-pulse">
        {/* Subtle grid to hint at a map */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Zoom controls placeholder */}
        <div className="absolute right-3 bottom-16 flex flex-col gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>

        {/* Mobile menu button placeholder */}
        <div className="absolute top-13 right-3 md:hidden">
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}
