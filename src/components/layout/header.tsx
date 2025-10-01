'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

export default function AppHeader() {
  const handleConnect = () => {
    // Wallet connection logic will be re-added later
    alert('Wallet connection functionality is temporarily disabled.');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        {/* We can add a page title here later */}
      </div>

      <Button onClick={handleConnect} className="font-headline shadow-neon-blue hover:shadow-neon-cyan transition-shadow">
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    </header>
  );
}
