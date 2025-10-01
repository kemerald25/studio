
import { Shield, Zap, Swords, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const crewIcon1 = PlaceHolderImages.find((img) => img.id === 'crewIcon1');
const crewIcon2 = PlaceHolderImages.find((img) => img.id === 'crewIcon2');
const crewIcon3 = PlaceHolderImages.find((img) => img.id === 'crewIcon3');
const crewIcon4 = PlaceHolderImages.find((img) => img.id === 'crewIcon4');

export const crews = [
  {
    id: 1,
    name: 'The Diamond Hands',
    motto: 'HODL the line!',
    members: 128,
    focus: 'DeFi & Trading',
    icon: Shield,
    emblem: crewIcon1,
  },
  {
    id: 2,
    name: 'Pixel Pioneers',
    motto: 'Building the metaverse, one block at a time.',
    members: 72,
    focus: 'NFTs & Creation',
    icon: Swords,
    emblem: crewIcon2,
  },
  {
    id: 3,
    name: 'Layer 2 Legends',
    motto: 'Fast, cheap, and secure.',
    members: 215,
    focus: 'Scaling Solutions',
    icon: Zap,
    emblem: crewIcon3,
  },
  {
    id: 4,
    name: 'Code Crusaders',
    motto: 'Secure the chain.',
    members: 45,
    focus: 'Smart Contract Auditing',
    icon: Shield,
    emblem: crewIcon4,
  },
];

    