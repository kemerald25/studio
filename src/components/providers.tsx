'use client';

import { projectId, networks } from '@/config/reown';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit';
import { type ReactNode, useMemo } from 'react';
import { WagmiProvider, type Config } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import type { AppKitNetwork } from '@reown/appkit/networks';

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined');
}

const metadata = {
  name: 'ChainGuardian',
  description: 'The ultimate crypto adventure where your wallet powers your journey.',
  url: 'https://chain-guardian-one.vercel.app/',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

export function AppProviders({
  children,
}: {
  children: ReactNode;
}) {
  // Create wagmiAdapter and appKit only once using useMemo
  const wagmiAdapter = useMemo(() => {
    const adapter = new WagmiAdapter({
      networks,
      projectId,
      ssr: true,
    });

    // Get CAIP networks from the adapter
    const caipNetworks = adapter.networks as [AppKitNetwork, ...AppKitNetwork[]];

    createAppKit({
      adapters: [adapter],
      projectId,
      networks: caipNetworks,
      defaultNetwork: caipNetworks[0],
      metadata: metadata,
      enableEIP6963: true,
      features: {
        analytics: true,
        email: true,
        socials: ['google', 'x', 'discord', 'github', 'apple'],
      },
      allWallets: 'SHOW',
      themeMode: 'dark',
      themeVariables: {
        '--w3m-accent': 'hsl(var(--primary))',
        '--w3m-border-radius-master': 'var(--radius)',
      },
    });

    return adapter;
  }, []);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}