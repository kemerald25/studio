
import { Book, Shield, Swords } from 'lucide-react';

export type Quest = {
  id: number;
  title: string;
  description: string;
  type: string;
  reward: { xp: number; trust: number };
  icon: React.ElementType;
  status: 'available' | 'in_progress' | 'completed';
  progress?: number;
  href?: string;
};

export const quests: Quest[] = [
  {
    id: 1,
    title: "The Phishing Menace",
    description: "A suspicious character has sent you a link promising free tokens. Use the AI Guardian to analyze the message and determine if it's a scam. Safety first!",
    type: "Security Quest",
    reward: { xp: 50, trust: 10 },
    icon: Shield,
    status: 'available',
    href: '/guardian'
  },
  {
    id: 2,
    title: "First Steps into Security",
    description: "Knowledge is your best defense. Complete the Security Quiz to prove your understanding of basic web3 safety principles and earn a Trust Score boost.",
    type: "Knowledge Quest",
    reward: { xp: 25, trust: 15 },
    icon: Book,
    status: 'available',
    progress: 0,
    href: '/quiz'
  },
  {
    id: 3,
    title: "Swamp Skirmish",
    description: "The Scam Swamp is teeming with low-level threats. Successfully navigate three simulated scam scenarios to clear a path for other adventurers.",
    type: "Combat Quest",
    reward: { xp: 75, trust: 5 },
    icon: Swords,
    status: 'available',
    progress: 33,
    href: '/realm/scam-swamp'
  },
  {
    id: 4,
    title: "The Collector",
    description: "A local merchant is looking for rare items. Acquire a 'Legendary' tier item either through quests or the marketplace to complete this objective.",
    type: "Collection Quest",
    reward: { xp: 100, trust: 0 },
    icon: Shield,
    status: 'available',
    href: '/marketplace'
  },
];

    