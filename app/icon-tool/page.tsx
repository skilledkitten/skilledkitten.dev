'use client';

import dynamic from 'next/dynamic';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useState } from "react";
import { IconButton } from "@/components/icon-button";
import { useIconTool } from "@/hooks/useIconTool";
import { Plus, Minus } from "lucide-react";

// Dynamically import components to reduce initial bundle size
const IconBrowser = dynamic(() => import('@/components/features/IconBrowser').then(mod => mod.IconBrowser), {
  ssr: false
});
const CustomizationPanel = dynamic(() => import('@/components/features/CustomizationPanel').then(mod => mod.CustomizationPanel));
const PreviewPanel = dynamic(() => import('@/components/features/PreviewPanel').then(mod => mod.PreviewPanel));

export default function Home() {
  useKeyboardShortcuts();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Icon Customizer
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <IconBrowser />
          </div>

          <div className="lg:col-span-4 space-y-8">
            <CustomizationPanel />
            <PreviewPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
