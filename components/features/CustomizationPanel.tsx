"use client";

import { useIconStore } from '@/store/iconStore';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Undo2, Redo2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

export function CustomizationPanel() {
  const { customization, updateCustomization, undo, redo, savePreset, selectedIconId, setSelectedIconId } = useIconStore();
  const { toast } = useToast();

  const handleSavePreset = () => {
    const name = prompt('Enter preset name:');
    if (name) {
      savePreset(name);
      toast({
        title: 'Preset saved',
        description: `Saved preset: ${name}`,
      });
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Customization</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={undo}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={redo}
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleSavePreset}
            title="Save Preset"
          >
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Size</Label>
          <Slider
            value={[customization.size]}
            onValueChange={([value]) => updateCustomization({ size: value })}
            min={12}
            max={96}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <Label>Stroke Width</Label>
          <Slider
            value={[customization.strokeWidth]}
            onValueChange={([value]) => updateCustomization({ strokeWidth: value })}
            min={0.5}
            max={4}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <Label>Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={customization.color}
              onChange={(e) => updateCustomization({ color: e.target.value })}
              className="w-12 h-12 p-1"
            />
            <Input
              type="text"
              value={customization.color}
              onChange={(e) => updateCustomization({ color: e.target.value })}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Rotation</Label>
          <Slider
            value={[customization.rotation]}
            onValueChange={([value]) => updateCustomization({ rotation: value })}
            min={0}
            max={360}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <Label>Scale</Label>
          <Slider
            value={[customization.scale]}
            onValueChange={([value]) => updateCustomization({ scale: value })}
            min={0.5}
            max={2}
            step={0.1}
          />
        </div>
      </div>

      <div>
        <h2>Customization Panel</h2>
        <p>Customize Icon: {selectedIconId}</p>
        <button onClick={() => setSelectedIconId(null)}>Reset</button>
      </div>
    </Card>
  );
}
