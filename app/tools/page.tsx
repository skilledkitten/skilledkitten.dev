"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavBar } from "@/components/navbar";
import { ToolsGrid } from '../../components/tools/tools-grid';
import { ColorGenerator } from '../../components/tools/color-generator';

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
      <div className={`min-h-screen pt-20 ${isPastelGenOpen ? "blur-sm" : ""}`}>
        <ToolsGrid onToolClick={openPastelGen} />
      </div>
      {isPastelGenOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl p-6 w-96">
            <button
              onClick={closePastelGen}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Pastel Color Generator</h2>
            <ColorGenerator isActive={true} onExpand={() => {}} />
          </div>
        </div>
      )}
    </>
  );
}
