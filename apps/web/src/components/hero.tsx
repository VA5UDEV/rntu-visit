"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Hero() {
  const router = useRouter();
  const [exit, setExit] = useState(false);

  const handleClick = () => {
    setExit(true);
    setTimeout(() => router.push("/onboarding" as any), 600);
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-6 bg-background">
      <div className="relative flex flex-col items-center gap-10">
        <AnimatePresence mode="wait">
          {!exit && (
            <>
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Badge
                  variant="outline"
                  className="gap-2 px-3 py-1.5 text-xs font-medium tracking-widest uppercase text-muted-foreground border-border/60"
                >
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  University GIS · Campus Navigation
                </Badge>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleClick}
                className="group relative cursor-pointer flex flex-col items-center gap-8"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center gap-1"
                >
                  <h1 className="text-center text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl select-none">
                    RNTU
                  </h1>
                  <h2 className="text-center text-5xl font-light tracking-tight text-muted-foreground/50 sm:text-6xl md:text-7xl lg:text-8xl select-none">
                    Campus
                  </h2>
                </motion.div>

                {/* Arrow button */}
                <div className="group relative flex size-16 items-center justify-center sm:size-20 cursor-pointer">
                  {/* Circle — CSS transition handles color, framer handles scale/y */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="absolute inset-0 rounded-full border border-border bg-transparent group-hover:bg-foreground group-hover:border-foreground transition-colors duration-200"
                  />
                  <motion.div
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ duration: 0.15 }}
                    className="relative text-foreground group-hover:text-background transition-colors duration-200"
                  >
                    <ArrowUpRight
                      className="size-6 sm:size-7"
                      stroke="currentColor"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col items-center gap-5 text-center"
              >
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Explore real-time geospatial data for buildings, facilities,
                  and services across the RNTU campus.
                </p>

                <Separator className="w-12 opacity-40" />

                <a
                  href="https://github.com/VA5UDEV/rntu-visit"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                >
                  <Code2 className="h-3 w-3" />
                  View Source on GitHub
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
