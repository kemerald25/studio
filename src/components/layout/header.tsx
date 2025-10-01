'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { ConnectWalletButton } from '../connect-wallet-button';
import { useAccount } from 'wagmi';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { shortenAddress } from '@/lib/utils';
import { Button } from '../ui/button';

export default function AppHeader() {
  const { isConnected, address } = useAccount();
  const avatar = PlaceHolderImages.find((img) => img.id === 'avatar1');

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        {/* We can add a page title here later */}
      </div>

      {isConnected && address ? (
        <div className="flex items-center gap-3 p-2 rounded-lg glassmorphism">
            <Avatar className="h-8 w-8">
              {avatar && <AvatarImage src={avatar.imageUrl} alt="Player Avatar" />}
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden hidden sm:block">
                <p className="font-bold text-sm text-white truncate">{shortenAddress(address)}</p>
            </div>
            <ConnectWalletButton />
        </div>
      ) : (
          <ConnectWalletButton />
      )}
    </header>
  );
}
