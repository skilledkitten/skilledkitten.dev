"use client";

import { useState, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useIconStore } from '@/store/iconStore';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { icons } from 'lucide-react';
import { motion } from 'framer-motion';

export function IconBrowser() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const { setSelectedIcon, selectedIcon } = useIconStore();

  // Filter icons using the icons object from lucide-react
  const filteredIcons = Object.entries(icons).filter(([name]) =>
    name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleIconClick = useCallback((iconName: string) => {
    setSelectedIcon(iconName);
  }, [setSelectedIcon]);

  return (
    <Card className="p-4">
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {filteredIcons.map(([name, Icon]) => (
            <motion.button
              key={name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleIconClick(name)}
              className={`p-4 rounded-lg transition-colors ${
                selectedIcon === name
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6" />
                <span className="text-xs text-center truncate w-full">
                  {name}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
