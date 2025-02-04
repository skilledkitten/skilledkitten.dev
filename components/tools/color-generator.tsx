'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';

interface ColorGeneratorProps {
  isActive: boolean;
  onExpand: (content: { title: string; content: React.ReactNode }) => void;
  onGenerateColors?: (fn: () => void) => void;
}

interface ColorInfo {
  hex: string;
  hsl: string;
  rgb: string;
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hslToRgb(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
  return `rgb(${Math.round(f(0) * 255)}, ${Math.round(
    f(8) * 255
  )}, ${Math.round(f(4) * 255)})`;
}

function generatePastelColor(seed: number): ColorInfo {
  const h = (seed * 137.508) % 360;
  const s = 35;
  const l = 85;
  return {
    hex: hslToHex(h, s, l),
    hsl: `hsl(${Math.round(h)}, ${s}%, ${l}%)`,
    rgb: hslToRgb(h, s, l),
  };
}

// Generate colors using a random seed based on the current timestamp.
function generateRandomColors(): ColorInfo[] {
  const timestamp = Date.now();
  return Array.from({ length: 5 }, (_, i) =>
    generatePastelColor((timestamp + i) % 1000000)
  );
}

// Use a fixed seed for initial render
function generateInitialColors(): ColorInfo[] {
  const fixedSeed = 12345; // Any constant number
  return Array.from({ length: 5 }, (_, i) =>
    generatePastelColor((fixedSeed + i) % 1000000)
  );
}

export function ColorGenerator({ isActive, onExpand, onGenerateColors }: ColorGeneratorProps) {
  const [colors, setColors] = useState<ColorInfo[]>(generateInitialColors());
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  // Generate random colors after initial mount
  useEffect(() => {
    setColors(generateRandomColors());
  }, []);

  const generateNewColors = () => {
    const timestamp = Date.now();
    setColors(
      Array.from({ length: 5 }, (_, i) =>
        generatePastelColor((timestamp + i) % 1000000)
      )
    );
  };

  // Update the effect to properly expose generateNewColors
  useEffect(() => {
    if (onGenerateColors) {
      onGenerateColors(generateNewColors);
    }
  }, [onGenerateColors]);

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(null), 1000);
    } catch (err) {
      console.error('Failed to copy value:', err);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div
      className={`${
        isActive ? 'pointer-events-auto z-10' : 'pointer-events-none opacity-0'
      } relative`}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="grid gap-4">
            {colors.map((color, index) => (
              <motion.div
                key={index}
                layout
                className="overflow-hidden rounded-lg border border-border"
                style={{ backgroundColor: color.hex }}
                initial={false}
              >
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex-1">
                    <span className="font-mono">{color.hex}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(color.hex);
                    }}
                    className="p-2 hover:bg-background/20 rounded-lg transition-colors"
                    aria-label="Copy color code"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                    >
                      <div className="px-4 pb-4 space-y-2 text-sm font-mono">
                        <div className="flex items-center justify-between">
                          <span>RGB: {color.rgb}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(color.rgb);
                            }}
                            className="p-1 hover:bg-background/20 rounded-lg transition-colors"
                            aria-label="Copy RGB value"
                          >
                            {copiedValue === color.rgb ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>HSL: {color.hsl}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(color.hsl);
                            }}
                            className="p-1 hover:bg-background/20 rounded-lg transition-colors"
                            aria-label="Copy HSL value"
                          >
                            {copiedValue === color.hsl ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
