import { Swords } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ScamSwampPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Swords className="w-10 h-10 text-secondary" />
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Scam Swamp</h1>
          <p className="text-slate-400">The treacherous starting zone. Watch your step.</p>
        </div>
      </div>
      <Card className="glassmorphism aspect-video">
        <CardHeader>
          <CardTitle className="font-headline text-white">Realm Map</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-center text-slate-400 py-16">
            The mists of the Scam Swamp are too thick to navigate right now. The cartographers are hard at work.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
