import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface DockItemConfig {
  icon?: LucideIcon;
  label?: string;
  onClick?: () => void;
  /** Render custom content instead of an icon button */
  slot?: React.ReactNode;
}

interface DockProps {
  className?: string;
  items: DockItemConfig[];
}

interface DockIconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
}

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, className }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.92 }}
        onClick={onClick}
        className={cn(
          "relative group p-2.5 rounded-xl",
          "hover:bg-accent transition-colors duration-150",
          className,
        )}
      >
        <Icon className="w-5 h-5 text-foreground" />
        {/* Tooltip */}
        <span
          className={cn(
            "absolute -top-9 left-1/2 -translate-x-1/2",
            "px-2 py-1 rounded-md text-xs font-medium",
            "bg-popover text-popover-foreground border border-border/60 shadow-sm",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-150 whitespace-nowrap pointer-events-none",
          )}
        >
          {label}
        </span>
      </motion.button>
    );
  },
);
DockIconButton.displayName = "DockIconButton";

/** Wrapper for custom slot items inside the Dock */
const DockSlot = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.92 }}
    className="flex items-center justify-center p-0.5"
  >
    {children}
  </motion.div>
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
          className,
        )}
      >
        <motion.div
          initial="initial"
          animate="animate"
        >
          <div
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-2xl",
              "backdrop-blur-xl border shadow-lg shadow-black/10",
              "bg-background/90 border-border/60",
              "transition-shadow duration-300 hover:shadow-xl hover:shadow-black/15",
            )}
          >
            {items.map((item, i) => {
              // Separator marker
              if (!item.icon && !item.slot) {
                return (
                  <div
                    key={`sep-${i}`}
                    className="w-px h-6 bg-border/60 mx-1 flex-shrink-0"
                  />
                );
              }
              // Custom slot (UserMenu, ModeToggle, etc.)
              if (item.slot) {
                return <DockSlot key={`slot-${i}`}>{item.slot}</DockSlot>;
              }
              // Standard icon button
              return (
                <DockIconButton
                  key={item.label}
                  icon={item.icon!}
                  label={item.label!}
                  onClick={item.onClick}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  },
);
Dock.displayName = "Dock";

export { Dock, DockIconButton, DockSlot };
export type { DockProps, DockItemConfig };
