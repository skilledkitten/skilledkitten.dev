"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavBar } from "@/components/navbar";
import { ToolsGrid } from '../../components/tools/tools-grid';

export default function ToolsPage() {
  const [activeSection, setActiveSection] = useState("tools");
  const [isPastelGenOpen, setIsPastelGenOpen] = useState(false);
  const router = useRouter();

  function handleNavigate(section: string) {
    router.push(`/${section}`);
  }

  function openPastelGen() {
    setIsPastelGenOpen(true);
  }

  function closePastelGen() {
    setIsPastelGenOpen(false);
  }

  return (
    <>
      <NavBar activeSection={activeSection} onNavigate={handleNavigate} />
      <div className={`min-h-screen pt-20 ${isPastelGenOpen ? "filter blur-sm" : ""}`}>
        <ToolsGrid />
      </div>
      {isPastelGenOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-filter backdrop-blur-md flex items-center justify-center">
          <div className="relative bg-white rounded p-4 w-96">
            <button onClick={closePastelGen} className="absolute top-2 right-2">
              X
            </button>
            {/* Pastel color generator content goes here */}
          </div>
        </div>
      )}
    </>
  );
}
