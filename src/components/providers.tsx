'use client';

import { config, projectId } from '@/config/reown';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit';
import { base } from '@reown/appkit/networks';
import type { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import {type State} from 'wagmi/ssr'


const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined');
}

const metadata = {
  name: 'ChainGuardian',
  description: 'The ultimate crypto adventure where your wallet powers your journey.',
  url: 'https://chainguardian.app',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

createAppKit({
  config: config,
  projectId,
  networks: [base],
  defaultNetwork: base,
  metadata: metadata,
  features: {
    analytics: true,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': 'hsl(var(--primary))',
    '--w3m-border-radius-master': 'var(--radius)',
    '--w3m-font-family': 'var(--font-body)',
  },
});

export function AppProviders({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
