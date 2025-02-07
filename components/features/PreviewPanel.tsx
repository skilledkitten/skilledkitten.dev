"use client";

import { useIconStore } from '@/store/iconStore';
import { Card } from '@/components/ui/card';
import { icons } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function PreviewPanel() {
  const { selectedIcon, customization } = useIconStore();
  const { toast } = useToast();

  const handleExport = async () => {
    if (!selectedIcon) return;

    try {
      const svg = document.querySelector('#preview-icon svg')?.cloneNode(true) as SVGElement;
      if (!svg) return;

      // Clean up SVG
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedIcon}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Icon exported',
        description: `Saved as ${selectedIcon}.svg`,
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'Failed to export icon. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const SelectedIcon = selectedIcon ? (icons as Record<string, React.ComponentType>)[selectedIcon] : null;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Preview</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={!selectedIcon}
        >
          <Download className="h-4 w-4 mr-2" />
          Export SVG
        </Button>
      </div>

      <div className="flex items-center justify-center h-[200px] bg-accent rounded-lg">
        <AnimatePresence mode="wait">
          {SelectedIcon ? (
            <motion.div
              key={selectedIcon}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <div id="preview-icon"> {/* Wrap the icon with a div and apply the ID here */}
                <SelectedIcon
                  size={customization.size}
                  strokeWidth={customization.strokeWidth}
                  color={customization.color}
                  style={{
                    transform: `rotate(${customization.rotation}deg) scale(${customization.scale})`,
                  }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="text-muted-foreground"
            >
              Select an icon to preview
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
