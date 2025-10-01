import { cookieStorage, createStorage } from 'wagmi';
import { createConfig } from '@reown/appkit';
import { base } from '@reown/appkit/networks';

// Get projectId from https://dashboard.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks = [base];

//Set up the Wagmi Adapter (Config)
export const config = createConfig({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  chains: networks,
});
