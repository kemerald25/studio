import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dices, Palette, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-base-bg relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scanline pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div
          className="text-center animate-fade-in-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent">
            CHAINGUARDIAN
          </h1>
          <p className="font-body text-xl md:text-2xl text-slate-300 mb-4">
            Build. Battle. Trade. Learn.
          </p>
          <p className="font-body text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-12">
            The ultimate crypto adventure where your wallet powers your journey.
            Master blockchain security while having the time of your life.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="font-headline shadow-neon-blue hover:shadow-neon-cyan transition-all duration-300">
              <Link href="/dashboard">START ADVENTURE</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-headline border-secondary hover:border-primary transition-all duration-300">
              <Link href="#">WATCH TRAILER</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <FeatureCard
            icon={<Dices className="size-10 text-secondary" />}
            title="EPIC GAMEPLAY"
            description="Battle through realms, complete quests, and level up your character."
          />
          <FeatureCard
            icon={<ShieldCheck className="size-10 text-secondary" />}
            title="LEARN & EARN"
            description="Master web3 security with our AI Guardian and earn rewards."
          />
          <FeatureCard
            icon={<Palette className="size-10 text-secondary" />}
            title="CREATE & TRADE"
            description="Build voxel worlds, craft items, and trade on the marketplace."
          />
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatCard value="10K+" label="Players" />
          <StatCard value="50K+" label="Items Minted" />
          <StatCard value="500+" label="Active Crews" />
          <StatCard value="$2M+" label="Trading Volume" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="glassmorphism p-8 text-center hover:border-secondary transition-all duration-300 hover:-translate-y-2">
      <div className="inline-block mb-4 p-4 bg-primary/10 rounded-full">
        {icon}
      </div>
      <h3 className="font-headline text-xl mb-3 text-secondary">{title}</h3>
      <p className="font-body text-slate-400">{description}</p>
    </Card>
  );
}

function StatCard({ value, label }: { value: string, label: string }) {
  return (
    <div className="glassmorphism p-4 rounded-lg">
      <div className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2">{value}</div>
      <div className="font-body text-sm text-slate-400">{label}</div>
    </div>
  );
}
