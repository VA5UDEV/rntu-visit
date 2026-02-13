"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const router = useRouter();
  const [exit, setExit] = useState(false);

  const handleClick = () => {
    setExit(true);
    setTimeout(() => router.push("/login/onboarding" as any), 600);
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="relative flex flex-col items-center gap-12">
        <AnimatePresence mode="wait">
          {!exit && (
            <>
              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                  University GIS · Campus Navigation
                </span>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover="hover"
                onClick={handleClick}
                className="group relative cursor-pointer flex flex-col items-center gap-6"
              >
                <motion.h2
                  variants={{ hover: { y: -8 } }}
                  className="text-center text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  <span>RNTU</span>{" "}
                  <span className="text-muted-foreground/60">Campus</span>
                </motion.h2>

                {/* Button */}
                <motion.button
                  type="button"
                  className="relative flex size-16 items-center justify-center sm:size-20 cursor-pointer"
                  initial="initial"
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  {/* Circle */}
                  <motion.div
                    className="absolute inset-0 rounded-full border"
                    variants={{
                      initial: {
                        backgroundColor: "transparent",
                        borderColor: "var(--border)",
                      },
                      hover: {
                        backgroundColor: "var(--foreground)",
                        borderColor: "var(--foreground)",
                      },
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Icon */}
                  <motion.div
                    variants={{
                      initial: {
                        x: 0,
                        y: 0,
                        color: "var(--foreground)",
                      },
                      hover: {
                        x: 2,
                        y: -2,
                        color: "var(--background)", // <- now works
                      },
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    <ArrowUpRight
                      className="size-6 sm:size-7"
                      stroke="currentColor"
                    />
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="mt-8 flex flex-col items-center gap-4 text-center"
              >
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  Explore real-time geospatial data for buildings, facilities,<br />
                  and services across the RNTU campus.
                </p>
                <span className="text-xs tracking-widest uppercase text-muted-foreground/60">
                  View Source on <a target="_blank" href ="https://github.com/VA5UDEV/rntu-visit"><div className="underline">GitHub</div></a>
                </span>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
