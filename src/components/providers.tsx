'use client';

import '@rainbow-me/rainbowkit/styles.css';
import type { ReactNode } from 'react';
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {merge} from 'lodash';

const config = getDefaultConfig({
  appName: 'ChainGuardian',
  projectId: 'YOUR_PROJECT_ID', // Replace with your actual Project ID from WalletConnect Cloud
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true, 
});

const queryClient = new QueryClient();

const customTheme = merge(darkTheme(), {
  colors: {
    accentColor: 'hsl(var(--primary))',
    accentColorForeground: 'hsl(var(--primary-foreground))',
    modalBackground: 'hsl(var(--background))',
    modalText: 'hsl(var(--foreground))',
  },
  radii: {
    actionButton: 'var(--radius)',
    connectButton: 'var(--radius)',
    menuButton: 'var(--radius)',
    modal: 'var(--radius)',
    modalMobile: 'var(--radius)',
  },
  fonts: {
    body: 'var(--font-inter)',
  }
});


export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={customTheme}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
