'use client';

import { projectId, networks } from '@/config/reown';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit';
import { type ReactNode, useEffect, useState } from 'react';
import { WagmiProvider, createConfig, cookieStorage, createStorage, http } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

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

// Create wagmi config
const config = createConfig({
  chains: networks,
  transports: networks.reduce((acc, chain) => {
    acc[chain.id] = http(chain.rpcUrl);
    return acc;
  }, {} as Record<number, ReturnType<typeof http>>),
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});

export function AppProviders({
  children,
}: {
  children: ReactNode;
}) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      const wagmiAdapter = new WagmiAdapter(config);

      createAppKit({
        adapters: [wagmiAdapter],
        projectId,
        networks,
        defaultNetwork: networks[0],
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
      setInitialized(true);
    }
  }, [initialized]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
