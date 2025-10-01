import { base } from 'wagmi/chains';

// Get projectId from https://dashboard.reown.com
export const projectId = '00518e8a7327cbd81efb2663ffecfad3';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

// Reown AppKit/Wagmi expects the RPC URL to be defined in the transports
// section of the wagmi config, not directly on the chain object.
const baseWithRpc = {
  ...base,
  rpcUrls: {
    ...base.rpcUrls,
    default: {
      http: [`https://mainnet.base.org`],
    },
  },
};


export const networks = [baseWithRpc];
