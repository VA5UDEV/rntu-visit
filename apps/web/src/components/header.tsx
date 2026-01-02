"use client";
import { MenuDemo } from "./menu";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-4 px-2 py-1">
        <div className="absolute top-0 right-0 gap-2">
          <MenuDemo />
        </div>
      </div>
    </div>
  );
}
