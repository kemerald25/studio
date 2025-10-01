
import { Swords, Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GuardianCheckForm from "@/components/guardian-check-form";

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
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="glassmorphism aspect-video flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline text-white">Realm Map</CardTitle>
                     <CardDescription>You are at the entrance to the Scam Swamp.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center h-full bg-cover bg-center rounded-b-lg" style={{backgroundImage: "url('/img/scam-swamp-bg.jpeg')"}}>
                    <div className="text-center text-white bg-black/50 p-6 rounded-lg backdrop-blur-sm">
                        <h3 className="font-headline text-2xl text-destructive mb-2 animate-pulse">DANGER AHEAD</h3>
                        <p className="max-w-md">
                            The air is thick with the sweet smell of "guaranteed returns" and the whisper of "urgent, free mints." Malicious actors lurk in the murky waters. Use your AI Guardian to analyze any suspicious messages before you proceed.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-8">
            <Card className="glassmorphism">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Bot className="w-8 h-8 text-secondary" />
                        <div>
                            <CardTitle className="font-headline text-white">AI Guardian Console</CardTitle>
                            <CardDescription>Analyze suspicious activity.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <GuardianCheckForm />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
