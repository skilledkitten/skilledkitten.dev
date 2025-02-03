"use client";

import { DivideIcon as LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export function IconButton({ icon: Icon, label, isActive, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center w-12 h-12 rounded-lg transition-all",
        "hover:bg-accent group",
        isActive && "bg-accent"
      )}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </button>
  );
}
