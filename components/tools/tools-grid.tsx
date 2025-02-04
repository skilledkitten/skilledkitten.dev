'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ColorGenerator } from './color-generator';

interface Tool {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<{ isActive: boolean; onExpand: () => void }>;
}

interface ToolsGridProps {
  onToolClick: () => void;
}

const tools: Tool[] = [
  {
    id: 'pastel-generator',
    title: 'Pastel Color Generator',
    description: 'Generate beautiful pastel color palettes',
    component: ColorGenerator,
  },
  // Add more tools here as needed
];

export function ToolsGrid({ onToolClick }: ToolsGridProps) {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handleExpand = (toolId: string) => {
    setActiveTool(activeTool === toolId ? null : toolId);
    if (toolId === 'pastel-generator') {
      onToolClick();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const ToolComponent = tool.component;
          return (
            <div key={tool.id}>
              <motion.div
                className={`p-4 border border-border rounded-lg cursor-pointer
                  hover:bg-muted/50 transition-colors ${
                    activeTool === tool.id ? 'bg-muted' : ''
                  }`}
                onClick={() => handleExpand(tool.id)}
              >
                <h3 className="text-xl font-semibold">{tool.title}</h3>
                <p className="text-muted-foreground mt-2">{tool.description}</p>
              </motion.div>
              <ToolComponent
                isActive={activeTool === tool.id}
                onExpand={() => handleExpand(tool.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
