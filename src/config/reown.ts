import { http } from 'wagmi';
import { base } from 'wagmi/chains';

// Get projectId from https://dashboard.reown.com
export const projectId = '00518e8a7327cbd81efb2663ffecfad3';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

const baseWithRpc = {
  ...base,
  rpcUrl: `https://mainnet.base.org`,
};

export const networks = [baseWithRpc];
