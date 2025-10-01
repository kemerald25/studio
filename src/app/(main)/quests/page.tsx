import { ScrollText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuestsPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <ScrollText className="w-10 h-10 text-secondary" />
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Quests</h1>
          <p className="text-slate-400">Embark on adventures and earn rewards.</p>
        </div>
      </div>
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="font-headline text-white">Quest Board</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-slate-400 py-16">
            The quest board is currently being assembled by the masters of the realm. Check back soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
