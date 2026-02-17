import Image from "next/image";
import { cn } from "@/lib/utils";

interface RntuLogoProps {
  className?: string;
  /** Height in px — width scales automatically. Default 40 */
  height?: number;
}

export function RntuLogo({ className, height = 40 }: RntuLogoProps) {
  return (
    <Image
      src="/rntu-logo.jpg"
      alt="Rabindranath Tagore University"
      height={height}
      width={height * 4.5} // ~4.5:1 aspect ratio from the source image
      className={cn(
        "object-contain rounded-md",
        // White background logo — invert in dark mode so it doesn't flash a white block
        "dark:invert",
        className,
      )}
      priority
    />
  );
}
