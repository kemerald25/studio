
'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { ScrollText, Users, Store, FlaskConical, Swords, Package, Building } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useBuildStore } from '@/lib/build-store';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { quests } from '@/lib/quests';
import { useCrewStore } from '@/lib/crew-store';
import { crews } from '@/lib/crews';

const avatar = PlaceHolderImages.find((img) => img.id === 'avatar1');

export default function DashboardPage() {
  const { isConnected } = useAccount();

  const player = isConnected ? {
    username: 'Adventurer', // This could come from user profile later
    level: 1,
    xp: 0,
    trustScore: 0,
    isTestnet: true, // This could be derived from network state
  } : null;

  const xpForNextLevel = 100;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        {player ? (
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-white">
            Welcome back, <span className="text-secondary">{player.username}</span>
            </h1>
        ) : (
             <h1 className="font-headline text-3xl md:text-4xl font-bold text-white">
                Dashboard
             </h1>
        )}
        {player && <NetworkBadge isTestnet={player.isTestnet} />}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-8">
          {isConnected && player ? (
            <PlayerCard player={player} xpForNextLevel={xpForNextLevel} />
          ) : (
             <Card className="glassmorphism flex items-center justify-center p-8 text-center min-h-[240px]">
                <div>
                    <h3 className="font-headline text-xl text-white mb-2">Connect Your Wallet</h3>
                    <p className="text-slate-400">Connect your wallet to see your player stats and start your adventure.</p>
                </div>
            </Card>
          )}
          <MyBuildsWidget />
          <CrewWidget />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <QuestLog />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ActionCard title="Marketplace" icon={<Store />} href="/marketplace" description="Trade items" />
            <ActionCard title="Build Mode" icon={<FlaskConical />} href="/build" description="Create your world" />
            <ActionCard title="Scam Swamp" icon={<Swords />} href="/realm/scam-swamp" description="Your adventure starts here" />
            <ActionCard title="Inventory" icon={<Package />} href="/inventory" description="Manage your items" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayerCard({ player, xpForNextLevel }: { player: any, xpForNextLevel: number }) {
  return (
    <Card className="glassmorphism">
      <CardHeader className="flex-row items-center gap-4">
        {avatar && (
            <Image
                src={avatar.imageUrl}
                width={64}
                height={64}
                alt="Player Avatar"
                className="rounded-lg border-2 border-primary pixelated"
                data-ai-hint={avatar.imageHint}
            />
        )}
        <div>
          <CardTitle className="font-headline text-2xl text-white">{player.username}</CardTitle>
          <CardDescription>Level {player.level}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-slate-400 mb-1">
            <span>XP</span>
            <span>{player.xp} / {xpForNextLevel}</span>
          </div>
          <Progress value={(player.xp / xpForNextLevel) * 100} className="h-2 [&>div]:bg-secondary" />
        </div>
        <div>
          <div className="flex justify-between text-sm text-slate-400 mb-1">
            <span>Trust Score</span>
            <span>{player.trustScore} / 100</span>
          </div>
          <Progress value={player.trustScore} className="h-2 [&>div]:bg-success" />
        </div>
      </CardContent>
    </Card>
  );
}

function MyBuildsWidget() {
  const builds = useBuildStore((state) => state.builds);

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="font-headline text-white flex items-center gap-2">
          <Building className="text-secondary" />
          My Builds
        </CardTitle>
      </CardHeader>
      <CardContent>
        {builds.length > 0 ? (
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {builds.map((build) => (
                <CarouselItem key={build.id}>
                  <Image
                    src={build.imageUrl}
                    alt="User build"
                    width={500}
                    height={500}
                    className="rounded-lg border-2 border-secondary/50"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <>
            <p className="text-slate-300 mb-4 text-center">You have not saved any builds yet.</p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/build">Go to Build Mode</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}


function CrewWidget() {
    const { joinedCrewId } = useCrewStore();
    const joinedCrew = crews.find(c => c.id === joinedCrewId);

    if (!joinedCrew) {
        return (
            <Card className="glassmorphism">
                <CardHeader>
                    <CardTitle className="font-headline text-white flex items-center gap-2">
                    <Users className="text-secondary" />
                    Crew
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-300 mb-4">You are not part of a crew yet.</p>
                    <Button variant="outline" className="w-full" asChild>
                    <Link href="/crew">Find a Crew</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }
  
  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="font-headline text-white flex items-center gap-2">
          <Users className="text-secondary" />
          My Crew
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
            {joinedCrew.emblem && (
                <Image 
                    src={joinedCrew.emblem.imageUrl}
                    alt={`${joinedCrew.name} emblem`}
                    width={40}
                    height={40}
                    data-ai-hint={joinedCrew.emblem.imageHint}
                    className="rounded-lg bg-primary/10 p-1"
                />
            )}
            <div>
                <h3 className="font-headline text-lg text-white">{joinedCrew.name}</h3>
                <p className="text-sm text-slate-400">{joinedCrew.motto}</p>
            </div>
        </div>
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link href="/crew">View Crew</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function QuestLog() {
    const activeQuests = quests.slice(0, 2); // Show first 2 quests as active

    return (
        <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="font-headline text-white flex items-center gap-2">
                    <ScrollText className="text-secondary" />
                    Active Quests
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {activeQuests.length > 0 ? (
                    <div className="space-y-4">
                        {activeQuests.map(quest => (
                            <div key={quest.id} className="flex items-center justify-between p-3 rounded-lg bg-card/70">
                                <div>
                                    <h4 className="font-bold text-white">{quest.title}</h4>
                                    <p className="text-sm text-slate-400">{quest.description.split('.')[0]}.</p>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={quest.href}>View</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-slate-400 py-8">
                      <p>No active quests.</p>
                      <p className="text-sm">Visit the quest board to find new adventures!</p>
                    </div>
                )}
                 <Button variant="secondary" className="w-full font-headline" asChild>
                    <Link href="/quests">View All Quests</Link>
                 </Button>
            </CardContent>
        </Card>
    )
}

function NetworkBadge({ isTestnet }: { isTestnet: boolean }) {
  return (
    <div className={`px-4 py-2 rounded-full font-code text-xs sm:text-sm whitespace-nowrap ${
      isTestnet 
        ? 'bg-warning/20 text-warning border border-warning' 
        : 'bg-success/20 text-success border border-success'
    }`}>
      {isTestnet ? '🏝️ TESTNET ISLAND' : '🌐 MAINNET'}
    </div>
  )
}

function ActionCard({ title, icon, description, href }: { title: string, icon: React.ReactNode, description: string, href: string }) {
  return (
    <Link href={href} className="block group">
        <Card className="glassmorphism h-full p-4 sm:p-6 hover:border-secondary hover:shadow-neon-blue transition-all duration-300">
          <div className="text-secondary mb-3 group-hover:scale-110 transition-transform">{React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8"})}</div>
          <h3 className="font-headline text-md sm:text-lg mb-2 text-white">{title}</h3>
          <p className="font-body text-xs sm:text-sm text-slate-400">{description}</p>
        </Card>
    </Link>
  )
}

    