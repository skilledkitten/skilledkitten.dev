"use client";

import { UserCircle2, Briefcase, PocketKnife } from "lucide-react";
import { IconButton } from "./icon-button";

interface NavBarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function NavBar({ activeSection, onNavigate }: NavBarProps) {
  const navItems = [
    { id: "/", icon: UserCircle2, label: "About" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "tools", icon: PocketKnife, label: "Tools" },
  ];

  return (
    <nav className="h-14 flex items-center px-4 lg:px-6 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        {navItems.map((item) => (
          <IconButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeSection === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </div>
    </nav>
  );
}
