'use client';

import {
  LayoutDashboard,
  Shield,
  Swords,
  Package,
  ScrollText,
  Users,
  FlaskConical,
  Book,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '../icons/logo';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { shortenAddress } from '@/lib/utils';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/realm/scam-swamp', icon: Swords, label: 'Scam Swamp' },
  { href: '/guardian', icon: Shield, label: 'AI Guardian' },
  { href: '/inventory', icon: Package, label: 'Inventory' },
  { href: '/quests', icon: ScrollText, label: 'Quests' },
  { href: '/build', icon: FlaskConical, label: 'Build Mode' },
  { href: '/crew', icon: Users, label: 'Crew' },
  { href: '/quiz', icon: Book, label: 'Security Quiz' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const avatar = PlaceHolderImages.find((img) => img.id === 'avatar1');
  const { address, isConnected } = useAccount();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-white">ChainGuardian</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="font-body"
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="my-2" />
      <SidebarFooter className="p-4">
        {isConnected && address ? (
          <div className="flex items-center gap-3 p-2">
            <Avatar className="h-8 w-8">
              {avatar && <AvatarImage src={avatar.imageUrl} alt="Player Avatar" />}
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm text-white truncate">{shortenAddress(address)}</p>
                <p className="text-xs text-slate-400">Level 1</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-xs text-slate-400 p-2">
             <ConnectButton.Custom>
              {({ openConnectModal, mounted }) => {
                if (!mounted) {
                  return null;
                }
                return (
                  <Button variant="link" onClick={openConnectModal} className="p-0 h-auto text-secondary">Connect your wallet</Button>
                );
              }}
            </ConnectButton.Custom>
            {' '}to begin your adventure.
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
