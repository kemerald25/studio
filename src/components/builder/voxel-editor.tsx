'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eraser, Pen } from 'lucide-react';

const GRID_SIZE = 24;
const colors = [
  '#0A0E27', // Background
  '#0052FF', // Primary
  '#00D4FF', // Secondary
  '#00FF94', // Success
  '#FFB800', // Warning
  '#FF0080', // Destructive
  '#FFFFFF', // White
  '#94A3B8', // Muted
];

export function VoxelEditor() {
  const [grid, setGrid] = useState(() => Array(GRID_SIZE * GRID_SIZE).fill(colors[0]));
  const [selectedColor, setSelectedColor] = useState(colors[1]);
  const [isErasing, setIsErasing] = useState(false);

  const handleCellClick = (index: number) => {
    const newGrid = [...grid];
    newGrid[index] = isErasing ? colors[0] : selectedColor;
    setGrid(newGrid);
  };
  
  const handleClearGrid = () => {
    setGrid(Array(GRID_SIZE * GRID_SIZE).fill(colors[0]));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div 
        className="grid touch-none"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '100%',
          maxWidth: '500px',
          aspectRatio: '1/1',
        }}
      >
        {grid.map((color, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(index)}
            className="border border-primary/10"
            style={{ backgroundColor: color, aspectRatio: '1/1' }}
          />
        ))}
      </div>
      <div className="flex-1 space-y-4">
        <h3 className="font-headline text-lg text-white">Palette</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.slice(1).map(color => (
            <button
              key={color}
              onClick={() => {
                setSelectedColor(color);
                setIsErasing(false);
              }}
              className={cn(
                'w-full aspect-square rounded-md border-2 transition-all',
                selectedColor === color && !isErasing ? 'border-white scale-110' : 'border-transparent'
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-4">
            <Button 
                variant={isErasing ? "default" : "outline"}
                onClick={() => setIsErasing(true)}
            >
                <Eraser className="mr-2" /> Eraser
            </Button>
             <Button 
                variant={!isErasing ? "default" : "outline"}
                onClick={() => setIsErasing(false)}
            >
                <Pen className="mr-2" /> Brush
            </Button>
        </div>
        
        <Button variant="destructive" onClick={handleClearGrid} className="w-full">
          Clear Grid
        </Button>
        <Button className="w-full font-headline shadow-neon-blue">
          Save Build
        </Button>
      </div>
    </div>
  );
}
