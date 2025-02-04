"use client";

import { UserCircle2, Briefcase, PocketKnife } from "lucide-react";
import { IconButton } from "./icon-button";

interface NavBarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function NavBar({ activeSection, onNavigate }: NavBarProps) {
  const navItems = [
    { id: "about", icon: UserCircle2, label: "About" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "tools", icon: PocketKnife, label: "Tools" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-lg rounded-xl border border-border p-2 z-[100] shadow-lg">
      <div className="flex items-center gap-2">
        {navItems.map((item) => (
          <IconButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeSection === item.id}
            onClick={() => onNavigate(item.id === "tools" ? "tools" : item.id)}
          />
        ))}
      </div>
    </nav>
  );
}
