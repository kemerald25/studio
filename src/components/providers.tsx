'use client';
import '@rainbow-me/rainbowkit/styles.css';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true, 
});

const queryClient = new QueryClient();

const customTheme = darkTheme({
  accentColor: '#0052FF',
  accentColorForeground: 'white',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});

customTheme.colors.modalBackground = '#0A0E27';
customTheme.colors.accentColor = '#0052FF';
customTheme.colors.accentColorForeground = 'white';
customTheme.colors.actionButtonBorder = 'transparent';
customTheme.colors.actionButtonBorderMobile = 'transparent';
customTheme.colors.actionButtonSecondaryBackground = '#1A1F3A';
customTheme.colors.closeButton = '#94A3B8';
customTheme.colors.closeButtonBackground = '#1A1F3A';
customTheme.colors.connectButtonBackground = '#0052FF';
customTheme.colors.connectButtonBackgroundError = '#FF0080';
customTheme.colors.connectButtonInnerBackground = '#1A1F3A';
customTheme.colors.connectButtonText = 'white';
customTheme.colors.connectButtonTextError = 'white';
custom-theme.colors.connectionIndicator = '#00FF94';
customTheme.colors.downloadBottomCardBackground = '#1A1F3A';
customTheme.colors.downloadTopCardBackground = '#1A1F3A';
customTheme.colors.error = '#FF0080';
customTheme.colors.generalBorder = '#2D3748';
customTheme.colors.generalBorderDim = '#1A1F3A';
customTheme.colors.menuItemBackground = '#1A1F3A';
customTheme.colors.modalBackdrop = 'rgba(0, 0, 0, 0.5)';
customTheme.colors.modalBorder = '#2D3748';
customTheme.colors.modalText = '#94A3B8';
customTheme.colors.modalTextDim = '#94A3B8';
customTheme.colors.modalTextSecondary = '#94A3B8';
customTheme.colors.profileAction = '#1A1F3A';
customTheme.colors.profileActionHover = '#2D3748';
customTheme.colors.profileForeground = '#1A1F3A';
customTheme.colors.selectedOptionBorder = '#0052FF';
customTheme.colors.standby = '#FFB800';

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
