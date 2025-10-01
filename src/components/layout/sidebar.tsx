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
import Image from 'next/image';

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
        <Button variant="ghost" className="w-full justify-start gap-2 p-2">
            {avatar && (
              <Image
                src={avatar.imageUrl}
                alt="Player Avatar"
                width={32}
                height={32}
                className="rounded-full border-2 border-primary"
                data-ai-hint={avatar.imageHint}
              />
            )}
            <div className="text-left">
                <p className="font-bold text-sm text-white">CyberVoxel</p>
                <p className="text-xs text-slate-400">Level 5</p>
            </div>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
