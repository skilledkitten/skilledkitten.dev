"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavBar } from "@/components/navbar";
import { ToolsGrid } from '../../components/tools/tools-grid';

export default function ToolsPage() {
  const [activeSection, setActiveSection] = useState("tools");
  const router = useRouter();

  function handleNavigate(section: string) {
    router.push(`/${section}`);
  }

  return (
    <>
      <NavBar activeSection={activeSection} onNavigate={handleNavigate} />
      <div className="min-h-screen pt-20">
        <ToolsGrid />
      </div>
    </>
  );
}
