'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { ConnectWalletButton } from '../connect-wallet-button';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        {/* We can add a page title here later */}
      </div>

      <ConnectWalletButton />
    </header>
  );
}
