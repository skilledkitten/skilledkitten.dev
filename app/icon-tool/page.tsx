"use client";

import React, { useState, useRef } from "react";
import * as LucideIcons from "lucide-react";

// Only include keys that start with an uppercase letter to filter out non-icon exports.
const iconNames = Object.keys(LucideIcons).filter(
  (name) =>
    name[0] === name[0].toUpperCase() &&
    typeof (LucideIcons as any)[name] === "function"
);

export default function IconToolPage() {
  const [selectedIcon, setSelectedIcon] = useState<string>(iconNames[0]);
  const [color, setColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [size, setSize] = useState(48);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgOpacity, setBgOpacity] = useState(1);
  const [borderRadius, setBorderRadius] = useState(8);
  const [iconOpacity, setIconOpacity] = useState(1);
  const previewRef = useRef<HTMLDivElement>(null);

  const SelectedIcon = (LucideIcons as any)[selectedIcon];

  const exportSVG = () => {
    const svgElement = previewRef.current?.querySelector("svg");
    if (!svgElement) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    downloadFile(url, `${selectedIcon}.svg`);
  };

  const exportPNG = async () => {
    const svgElement = previewRef.current?.querySelector("svg");
    if (!svgElement) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, size, size);
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            downloadFile(pngUrl, `${selectedIcon}.png`);
          }
        });
      }
    };
    img.src = url;
  };

  const downloadFile = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar with icon list */}
      <aside className="w-64 border-r overflow-y-auto p-4">
        <h2 className="mb-4 text-lg font-semibold">Icons</h2>
        <div className="grid grid-cols-4 gap-2">
          {iconNames.map((name) => (
            <button
              key={name}
              onClick={() => setSelectedIcon(name)}
              className={`p-2 border rounded ${
                selectedIcon === name ? "bg-accent" : ""
              }`}
            >
              {React.createElement((LucideIcons as any)[name], {
                size: 24,
              })}
            </button>
          ))}
        </div>
      </aside>
      {/* Main preview and controls */}
      <main className="flex-1 p-4 overflow-y-auto">
        <h1 className="mb-4 text-2xl font-bold">Icon Maker Tool</h1>
        <div className="flex flex-col gap-6">
          {/* Preview area */}
          <div
            ref={previewRef}
            className="flex items-center justify-center border p-4"
            style={{
              backgroundColor: bgColor,
              opacity: bgOpacity,
              borderRadius: borderRadius,
              width: size + 40,
              height: size + 40,
            }}
          >
            {SelectedIcon && (
              <SelectedIcon
                size={size}
                color={color}
                strokeWidth={strokeWidth}
                style={{ opacity: iconOpacity }}
              />
            )}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block">
                Color:
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="ml-2"
                />
              </label>
              <label className="block">
                Stroke Width:
                <input
                  type="number"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  min={1}
                  className="ml-2 w-16"
                />
              </label>
              <label className="block">
                Size:
                <input
                  type="number"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  min={16}
                  className="ml-2 w-16"
                />
              </label>
              <label className="block">
                Icon Transparency:
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={iconOpacity}
                  onChange={(e) => setIconOpacity(Number(e.target.value))}
                  className="ml-2 w-full"
                />
              </label>
            </div>
            <div className="space-y-2">
              <label className="block">
                Background Color:
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="ml-2"
                />
              </label>
              <label className="block">
                Background Opacity:
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={bgOpacity}
                  onChange={(e) => setBgOpacity(Number(e.target.value))}
                  className="ml-2 w-full"
                />
              </label>
              <label className="block">
                Border Radius:
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className="ml-2 w-full"
                />
              </label>
            </div>
          </div>
          {/* Export buttons */}
          <div className="flex gap-4">
            <button
              onClick={exportSVG}
              className="rounded bg-primary px-4 py-2 text-white"
            >
              Export SVG
            </button>
            <button
              onClick={exportPNG}
              className="rounded bg-secondary px-4 py-2 text-white"
            >
              Export PNG
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
