
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Package } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const itemPlaceholders = {
  sword: PlaceHolderImages.find((i) => i.id === 'itemSword'),
  shield: PlaceHolderImages.find((i) => i.id === 'itemShield'),
  potion: PlaceHolderImages.find((i) => i.id === 'itemPotion'),
  pet: PlaceHolderImages.find((i) => i.id === 'itemPet'),
  emote: PlaceHolderImages.find((i) => i.id === 'itemEmote'),
  avatarSkin: PlaceHolderImages.find((i) => i.id === 'itemAvatarSkin'),
};

const items = [
  {
    id: 1,
    name: 'Sword of Truth',
    category: 'weapon',
    rarity: 4,
    equipped: true,
    image: itemPlaceholders.sword?.imageUrl,
    hint: itemPlaceholders.sword?.imageHint,
  },
  {
    id: 2,
    name: 'Guardian Shield',
    category: 'weapon',
    rarity: 5,
    equipped: false,
    image: itemPlaceholders.shield?.imageUrl,
    hint: itemPlaceholders.shield?.imageHint,
  },
  {
    id: 3,
    name: 'Potion of Clarity',
    category: 'tool',
    rarity: 2,
    equipped: false,
    image: itemPlaceholders.potion?.imageUrl,
    hint: itemPlaceholders.potion?.imageHint,
  },
  {
    id: 4,
    name: 'Crypto-Kitty Companion',
    category: 'pet',
    rarity: 3,
    equipped: true,
    image: itemPlaceholders.pet?.imageUrl,
    hint: itemPlaceholders.pet?.imageHint,
  },
  {
    id: 5,
    name: 'HODL Emote',
    category: 'emote',
    rarity: 1,
    equipped: false,
    image: itemPlaceholders.emote?.imageUrl,
    hint: itemPlaceholders.emote?.imageHint,
  },
  {
    id: 6,
    name: 'Cyberspace Samurai',
    category: 'avatar',
    rarity: 5,
    equipped: true,
    image: itemPlaceholders.avatarSkin?.imageUrl,
    hint: itemPlaceholders.avatarSkin?.imageHint,
  },
];

const rarityConfig: { [key: number]: { color: string, shadow: string, name: string } } = {
  1: { color: 'border-slate-500', shadow: '', name: 'Common' },
  2: { color: 'border-green-500', shadow: 'hover:shadow-neon-green', name: 'Uncommon' },
  3: { color: 'border-blue-500', shadow: 'hover:shadow-neon-blue', name: 'Rare' },
  4: { color: 'border-purple-500', shadow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]', name: 'Epic' },
  5: { color: 'border-yellow-500', shadow: 'hover:shadow-neon-yellow', name: 'Legendary' },
};

export default function InventoryPage() {
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter);

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Package className="w-10 h-10 text-secondary" />
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Inventory</h1>
          <p className="text-slate-400">Manage your collection of NFT items.</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'avatar', 'weapon', 'pet', 'tool', 'emote'].map(category => (
          <Button
            key={category}
            onClick={() => setFilter(category)}
            variant={filter === category ? 'default' : 'outline'}
            className={`font-headline capitalize ${filter === category ? 'shadow-neon-blue' : ''}`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 col-span-full">
          <div className="text-6xl mb-4">📦</div>
          <p className="font-body text-slate-400">No items in this category yet.</p>
          <p className="font-body text-sm text-slate-500 mt-2">
            Complete quests or visit the marketplace to get items.
          </p>
        </div>
      )}
    </div>
  );
}

function ItemCard({ item }: { item: any }) {
  const config = rarityConfig[item.rarity];
  return (
    <Card
      className={`glassmorphism border-2 ${config.color} ${config.shadow} p-4 cursor-pointer hover:-translate-y-1 transition-all relative group`}
    >
      {item.equipped && (
        <div className="absolute top-2 right-2 bg-success text-black text-xs px-2 py-0.5 rounded-full font-bold z-10">
          ✓
        </div>
      )}
      <div className="aspect-square bg-base-bg/50 rounded-md mb-3 flex items-center justify-center overflow-hidden">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            width={200}
            height={200}
            data-ai-hint={item.hint}
            className="w-full h-full object-cover pixelated group-hover:scale-110 transition-transform duration-300"
          />
        )}
      </div>
      <h3 className="font-headline text-base text-white truncate">{item.name}</h3>
      <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
        <span>{config.name}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < item.rarity ? 'text-yellow-400' : 'text-slate-600'}>★</span>
          ))}
        </div>
      </div>
    </Card>
  );
}
