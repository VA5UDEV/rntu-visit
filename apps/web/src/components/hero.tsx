"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight } from "lucide-react";
import { MenuDemo } from "./menu";

export function LetsWorkTogether() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="relative flex flex-col items-center gap-12">
        {/* Availability */}
        <div
          className="flex items-center gap-3 transition-all duration-500"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(-20px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
            University GIS · Campus Navigation
          </span>
        </div>

        {/* Main CTA */}
        <Link
          href={"/locator" as Route}
          onClick={(e) => {
            e.preventDefault();
            setIsClicked(true);

            setTimeout(() => {
              window.location.assign("/locator");
            }, 600);
          }}
          className="group relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <h2
              className="relative text-center text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isClicked ? 0 : 1,
                transform: isClicked
                  ? "translateY(-40px) scale(0.95)"
                  : "translateY(0) scale(1)",
              }}
            >
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform:
                      isHovered && !isClicked
                        ? "translateY(-8%)"
                        : "translateY(0)",
                  }}
                >
                  RNTU
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                  style={{
                    transform:
                      isHovered && !isClicked
                        ? "translateY(-8%)"
                        : "translateY(0)",
                  }}
                >
                  <span className="text-muted-foreground/60">Campus</span>
                </span>
              </span>
            </h2>

            {/* Arrow button */}
            <div className="relative mt-4 flex size-16 items-center justify-center sm:size-20">
              <div
                className="pointer-events-none absolute inset-0 rounded-full border transition-all ease-out"
                style={{
                  borderColor: isHovered
                    ? "var(--foreground)"
                    : "var(--border)",
                  backgroundColor: isHovered
                    ? "var(--foreground)"
                    : "transparent",
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
              />
              <ArrowUpRight
                className="size-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-7"
                style={{
                  transform: isHovered
                    ? "translate(2px, -2px)"
                    : "translate(0, 0)",
                  color: isHovered ? "var(--background)" : "var(--foreground)",
                }}
              />
            </div>
          </div>
        </Link>

        {/* Footer text */}
        <div
          className="mt-8 flex flex-col items-center gap-4 text-center transition-all duration-500"
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(20px)" : "translateY(0)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Explore real-time geospatial data for buildings, facilities, and
            services across the RNTU campus.
          </p>
          <span className="text-xs tracking-widest uppercase text-muted-foreground/60">
            Powered by RNTU student innovation
          </span>
        </div>
      </div>
    </section>
  );
}
