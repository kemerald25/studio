
'use client';
import { Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useCrewStore } from '@/lib/crew-store';
import { crews } from '@/lib/crews';


export default function CrewPage() {
    const { joinedCrewId, setJoinedCrew } = useCrewStore();
    const { toast } = useToast();

    const handleJoin = (crewId: number, crewName: string) => {
        if (joinedCrewId === crewId) {
            setJoinedCrew(null);
            toast({ title: `You have left ${crewName}` });
        } else {
            if (joinedCrewId !== null) {
                const currentCrew = crews.find(c => c.id === joinedCrewId);
                toast({
                    variant: "destructive",
                    title: "Cannot Join Crew",
                    description: `You must first leave ${currentCrew?.name} before joining a new one.`,
                });
                return;
            }
            setJoinedCrew(crewId);
            toast({
                title: "Crew Joined!",
                description: `You are now a member of ${crewName}.`,
            });
        }
    };

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
          <CardDescription>Browse active crews and join the one that fits your style.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crews.map((crew) => (
                <Card key={crew.id} className="bg-card/80 border-secondary/20 hover:border-secondary transition-all">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            {crew.emblem && (
                                <Image 
                                    src={crew.emblem.imageUrl}
                                    alt={`${crew.name} emblem`}
                                    width={50}
                                    height={50}
                                    data-ai-hint={crew.emblem.imageHint}
                                    className="rounded-lg bg-primary/10 p-1"
                                />
                            )}
                            <div>
                                <CardTitle className="font-headline text-xl text-white">{crew.name}</CardTitle>
                                <CardDescription>{crew.motto}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400 flex items-center gap-2"><Users size={16} /> Members</span>
                            <span className="font-bold text-white">{crew.members}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400 flex items-center gap-2"><crew.icon size={16} /> Focus</span>
                            <span className="font-bold text-white">{crew.focus}</span>
                        </div>
                         <Button 
                            className="w-full font-headline mt-4" 
                            variant={joinedCrewId === crew.id ? 'destructive' : 'secondary'}
                            onClick={() => handleJoin(crew.id, crew.name)}
                        >
                            {joinedCrewId === crew.id ? 'Leave Crew' : 'Join Crew'}
                        </Button>
                    </CardContent>
                </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    