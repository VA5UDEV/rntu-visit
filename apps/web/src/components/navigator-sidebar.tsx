"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Navigation,
  Search,
  X,
  MapPin,
  Route,
  Ruler,
  Menu,
  Locate,
  CheckCircle2,
  Building2,
  Footprints,
  ChevronRight,
} from "lucide-react";
import UserMenu from "@/components/user-menu";
import { cn } from "@/lib/utils";
import { RntuLogo } from "./rntu-logo";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface Building {
  id: number;
  name: string;
  lat: number;
  lng: number;
  image: string;
  type: string;
  color: string;
}

export interface RouteInfo {
  distance: number;
  time: number;
}

interface NavigatorSidebarProps {
  buildings: Building[];
  startId: string;
  endId: string;
  onStartChange: (id: string) => void;
  onEndChange: (id: string) => void;
  routeInfo: RouteInfo | null;
  startBuilding: Building | undefined;
  endBuilding: Building | undefined;
  navActive: boolean;
  onNavStart: () => void;
  onClearRoute: () => void;
  onFlyTo: (building: Building) => void;
  drawerOpen: boolean;
  onDrawerOpenChange: (open: boolean) => void;
}

// ─── Type config ───────────────────────────────────────────────────────────────
export const TYPE_CONFIG: Record<string, { badge: string; label: string }> = {
  entrance: {
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    label: "Entrance",
  },
  academic: {
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    label: "Academic",
  },
  admin: {
    badge:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    label: "Admin",
  },
  hostel: {
    badge:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    label: "Hostel",
  },
  sports: {
    badge:
      "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
    label: "Sports",
  },
  facility: {
    badge:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400 border-violet-200 dark:border-violet-800",
    label: "Facility",
  },
  library: {
    badge:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    label: "Library",
  },
  parking: {
    badge:
      "bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-400 border-slate-200 dark:border-slate-700",
    label: "Parking",
  },
};

// ─── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex items-center justify-center w-5 h-5 rounded bg-muted">
        <Icon className="h-3 w-3 text-muted-foreground" />
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

// ─── Sidebar Header ────────────────────────────────────────────────────────────
function SidebarHeader({
  buildingCount,
  navActive,
}: {
  buildingCount: number;
  navActive: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary/10 flex-shrink-0">
        <Navigation className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="font-semibold text-sm leading-none">Campus Navigator</h2>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {buildingCount} locations mapped
        </p>
      </div>
      {navActive && (
        <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-[10px] font-semibold px-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
          Live
        </Badge>
      )}
    </div>
  );
}

// ─── Sidebar Footer ────────────────────────────────────────────────────────────
function SidebarFooter() {
  return (
    <div className="flex-shrink-0 border-t border-border/60 px-3 py-2.5 flex items-center justify-between">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        <Link href="/" className="hover:opacity-80 transition">
          <RntuLogo />
        </Link>
      </span>
      <UserMenu />
    </div>
  );
}

function SidebarContent({
  buildings,
  startId,
  endId,
  onStartChange,
  onEndChange,
  routeInfo,
  startBuilding,
  endBuilding,
  navActive,
  onNavStart,
  onClearRoute,
  onFlyTo,
}: Omit<NavigatorSidebarProps, "drawerOpen" | "onDrawerOpenChange">) {
  const [search, setSearch] = useState("");
  const filtered = buildings.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col gap-5 p-4">
        {/* ── Search ── */}
        <div>
          <SectionLabel icon={Search}>Search</SectionLabel>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              className="pl-9 pr-9 h-9 text-sm bg-muted/40 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary/40 placeholder:text-muted-foreground/60"
              placeholder="Search buildings…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {search && (
            <div className="mt-2 rounded-lg border bg-background shadow-sm overflow-hidden">
              <ScrollArea className="max-h-44">
                {filtered.length === 0 ? (
                  <div className="py-6 text-center">
                    <Building2 className="h-6 w-6 mx-auto mb-1.5 text-muted-foreground/40" />
                    <p className="text-xs text-muted-foreground">
                      No results found
                    </p>
                  </div>
                ) : (
                  filtered.map((b, i) => (
                    <button
                      key={b.id}
                      className={cn(
                        "w-full text-left px-3 py-2.5 flex items-center gap-2.5 text-sm hover:bg-accent transition-colors",
                        i !== filtered.length - 1 &&
                          "border-b border-border/50",
                      )}
                      onClick={() => {
                        onFlyTo(b);
                        setSearch("");
                      }}
                    >
                      <span
                        className="h-2 w-2 rounded-full flex-shrink-0 ring-2 ring-white dark:ring-background"
                        style={{ backgroundColor: b.color }}
                      />
                      <span className="font-medium flex-1 truncate">
                        {b.name}
                      </span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground/50 flex-shrink-0" />
                    </button>
                  ))
                )}
              </ScrollArea>
            </div>
          )}
        </div>

        <Separator className="opacity-50" />

        {/* ── Route Planner ── */}
        <div>
          <SectionLabel icon={Route}>Route Planner</SectionLabel>
          <div className="space-y-1.5">
            {/* Start */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center flex-shrink-0 w-5">
                <div className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-900" />
              </div>
              <Select value={startId} onValueChange={onStartChange}>
                <SelectTrigger className="h-9 text-sm flex-1 bg-muted/30 border-muted-foreground/20">
                  <SelectValue placeholder="Choose start…" />
                </SelectTrigger>
                <SelectContent
                  className="z-[2000]"
                  position="popper"
                  sideOffset={4}
                >
                  {buildings.map((b) => (
                    <SelectItem key={b.id} value={String(b.id)}>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: b.color }}
                        />
                        {b.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Destination */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center flex-shrink-0 w-5">
                <div className="h-2 w-2 rounded-full bg-rose-500 ring-2 ring-rose-200 dark:ring-rose-900" />
              </div>
              <Select value={endId} onValueChange={onEndChange}>
                <SelectTrigger className="h-9 text-sm flex-1 bg-muted/30 border-muted-foreground/20">
                  <SelectValue placeholder="Choose destination…" />
                </SelectTrigger>
                <SelectContent
                  className="z-[2000]"
                  position="popper"
                  sideOffset={4}
                >
                  {buildings.map((b) => (
                    <SelectItem
                      key={b.id}
                      value={String(b.id)}
                      disabled={b.id === parseInt(startId)}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: b.color }}
                        />
                        {b.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* ── Route Info Card ── */}
        {routeInfo && startBuilding && endBuilding && (
          <div className="rounded-xl border border-emerald-200/70 dark:border-emerald-800/50 bg-gradient-to-b from-emerald-50/80 to-emerald-50/20 dark:from-emerald-950/30 dark:to-transparent overflow-hidden">
            <div className="px-3.5 pt-3 pb-2 flex items-center gap-2 border-b border-emerald-100 dark:border-emerald-900/50">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Route Found
              </span>
            </div>

            <div className="px-3.5 py-3 space-y-0.5">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <p className="text-xs font-medium leading-snug truncate">
                  {startBuilding.name}
                </p>
              </div>
              <div className="ml-[4px] h-4 w-px border-l-2 border-dashed border-muted-foreground/30" />
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-rose-500 flex-shrink-0" />
                <p className="text-xs font-medium leading-snug truncate">
                  {endBuilding.name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 px-3.5 pb-3">
              <div className="rounded-lg bg-white/70 dark:bg-background/50 border border-border/60 px-3 py-2 text-center">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Ruler className="h-3 w-3 text-muted-foreground" />
                  <span className="text-base font-bold tabular-nums">
                    {routeInfo.distance}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                  Meters
                </p>
              </div>
              <div className="rounded-lg bg-white/70 dark:bg-background/50 border border-border/60 px-3 py-2 text-center">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Footprints className="h-3 w-3 text-muted-foreground" />
                  <span className="text-base font-bold tabular-nums">
                    {routeInfo.time}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                  Min walk
                </p>
              </div>
            </div>

            <div className="flex gap-2 px-3.5 pb-3.5">
              {!navActive ? (
                <Button
                  size="sm"
                  className="flex-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  onClick={onNavStart}
                >
                  <Navigation className="h-3.5 w-3.5 mr-1.5" />
                  Start Navigation
                </Button>
              ) : (
                <div className="flex-1 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold h-8 flex items-center justify-center gap-1.5">
                  <Navigation className="h-3.5 w-3.5" />
                  Navigation Active
                </div>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 flex-shrink-0"
                    onClick={onClearRoute}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  Clear route
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}

        {startId && endId && !routeInfo && (
          <div className="rounded-lg border border-dashed border-muted-foreground/30 py-4 text-center">
            <MapPin className="h-5 w-5 mx-auto mb-1.5 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">
              No route found between these locations
            </p>
          </div>
        )}

        <Separator className="opacity-50" />

        {/* ── All Locations ── */}
        <div>
          <SectionLabel icon={Building2}>All Locations</SectionLabel>
          <ScrollArea className="h-64">
            <div className="space-y-0.5 pr-2">
              {buildings.map((b) => {
                const cfg = TYPE_CONFIG[b.type];
                return (
                  <button
                    key={b.id}
                    className="w-full text-left rounded-lg px-2.5 py-2 text-sm hover:bg-accent transition-colors flex items-center gap-2.5 group"
                    onClick={() => onFlyTo(b)}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                      style={{ backgroundColor: b.color }}
                    />
                    <span className="flex-1 truncate font-medium text-[13px]">
                      {b.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "ml-auto text-[9px] px-1.5 py-0 h-4 font-medium capitalize flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
                        cfg?.badge,
                      )}
                    >
                      {cfg?.label ?? b.type}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  );
}

// ─── Main exported component ───────────────────────────────────────────────────
export function NavigatorSidebar(props: NavigatorSidebarProps) {
  const {
    buildings,
    navActive,
    drawerOpen,
    onDrawerOpenChange,
    onFlyTo,
    onNavStart,
    ...contentProps
  } = props;

  const headerProps = { buildingCount: buildings.length, navActive };

  const sharedContentProps = {
    buildings,
    navActive,
    onFlyTo: (b: Building) => {
      onFlyTo(b);
      onDrawerOpenChange(false);
    },
    onNavStart: () => {
      onNavStart();
      onDrawerOpenChange(false);
    },
    ...contentProps,
  };

  return (
    <>
      {/* ── Desktop: persistent sidebar ──────────────────────────────────────── */}
      <aside className="absolute top-0 left-0 h-full w-80 z-[1000] hidden md:flex flex-col bg-background/97 backdrop-blur-sm border-r shadow-sm">
        <div className="px-4 py-3.5 border-b flex-shrink-0">
          <SidebarHeader {...headerProps} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <SidebarContent {...sharedContentProps} />
        </div>
        <SidebarFooter />
      </aside>

      {/* ── Mobile: Drawer triggered by floating button ───────────────────────── */}
      <div className="absolute top-13 right-3 z-[1001] md:hidden">
        <Drawer
          direction="left"
          open={drawerOpen}
          onOpenChange={onDrawerOpenChange}
        >
          <DrawerTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="shadow-md border h-9 w-9"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </DrawerTrigger>

          <DrawerContent
            className="h-full w-80 max-w-[85vw] flex flex-col rounded-none rounded-r-2xl border-r"
            style={{ left: 0, right: "auto", top: 0, bottom: 0 }}
          >
            <div className="hidden" />

            <DrawerHeader className="px-4 py-3 border-b flex-shrink-0">
              <DrawerTitle asChild>
                <div>
                  <SidebarHeader {...headerProps} />
                </div>
              </DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 min-h-0 overflow-y-auto">
              <SidebarContent {...sharedContentProps} />
            </div>

            <SidebarFooter />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
