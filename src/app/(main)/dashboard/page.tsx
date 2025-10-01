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
import { ScrollText, Users, Store, FlaskConical, Swords, Package } from 'lucide-react';

const avatar = PlaceHolderImages.find((img) => img.id === 'avatar1');

export default function DashboardPage() {
  const player = {
    username: 'Adventurer',
    level: 1,
    xp: 0,
    trustScore: 0,
    isTestnet: true,
  };

  const xpForNextLevel = 100;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-white">
          Welcome back, <span className="text-secondary">{player.username}</span>
        </h1>
        <NetworkBadge isTestnet={player.isTestnet} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-8">
          <PlayerCard player={player} xpForNextLevel={xpForNextLevel} />
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

function CrewWidget() {
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

function QuestLog() {
    return (
        <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="font-headline text-white flex items-center gap-2">
                    <ScrollText className="text-secondary" />
                    Active Quests
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center text-slate-400 py-8">
                  <p>No active quests.</p>
                  <p className="text-sm">Visit the quest board to find new adventures!</p>
                </div>
                 <Button variant="secondary" className="w-full" asChild>
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
