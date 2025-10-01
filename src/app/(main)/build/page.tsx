import { FlaskConical } from 'lucide-react';
import { VoxelEditor } from '@/components/builder/voxel-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BuildPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <FlaskConical className="w-10 h-10 text-secondary" />
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Build Mode</h1>
          <p className="text-slate-400">Unleash your creativity. Build your personal hideout.</p>
        </div>
      </div>

      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="font-headline text-white">Voxel Editor</CardTitle>
          <CardDescription>Click on the grid to place blocks. Select colors from the palette.</CardDescription>
        </CardHeader>
        <CardContent>
            <VoxelEditor />
        </CardContent>
      </Card>
    </div>
  );
}
