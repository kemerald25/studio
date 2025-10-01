import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CrewPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Users className="w-10 h-10 text-secondary" />
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Crews</h1>
          <p className="text-slate-400">Join forces with other adventurers.</p>
        </div>
      </div>
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="font-headline text-white">Find a Crew</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-slate-400 py-16">
            The crew barracks are under construction. Gather your allies and prepare for adventure!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
