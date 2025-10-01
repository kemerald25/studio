
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, Coins } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const itemPlaceholders = {
  sword: PlaceHolderImages.find((i) => i.id === 'itemSword'),
  shield: PlaceHolderImages.find((i) => i.id === 'itemShield'),
  potion: PlaceHolderImages.find((i) => i.id === 'itemPotion'),
  pet: PlaceHolderImages.find((i) => i.id === 'itemPet'),
  emote: PlaceHolderImages.find((i) => i.id === 'itemEmote'),
  avatarSkin: PlaceHolderImages.find((i) => i.id === 'itemAvatarSkin'),
};

const marketItems = [
  { id: 1, name: 'Basic Sword', price: 50, rarity: 1, image: itemPlaceholders.sword?.imageUrl, hint: itemPlaceholders.sword?.imageHint, category: 'weapon' },
  { id: 2, name: 'Rare Shield', price: 250, rarity: 3, image: itemPlaceholders.shield?.imageUrl, hint: itemPlaceholders.shield?.imageHint, category: 'weapon' },
  { id: 3, name: 'Health Potion', price: 20, rarity: 1, image: itemPlaceholders.potion?.imageUrl, hint: itemPlaceholders.potion?.imageHint, category: 'tool' },
  { id: 4, name: 'Epic Samurai Skin', price: 1000, rarity: 4, image: itemPlaceholders.avatarSkin?.imageUrl, hint: itemPlaceholders.avatarSkin?.imageHint, category: 'avatar' },
  { id: 5, name: 'GG Emote', price: 100, rarity: 2, image: itemPlaceholders.emote?.imageUrl, hint: itemPlaceholders.emote?.imageHint, category: 'emote' },
  { id: 6, name: 'Legendary Crypto-Dragon', price: 5000, rarity: 5, image: itemPlaceholders.pet?.imageUrl, hint: itemPlaceholders.pet?.imageHint, category: 'pet' },
];

const rarityConfig: { [key: number]: { color: string, shadow: string, name: string } } = {
  1: { color: 'border-slate-500', shadow: '', name: 'Common' },
  2: { color: 'border-green-500', shadow: 'hover:shadow-neon-green', name: 'Uncommon' },
  3: { color: 'border-blue-500', shadow: 'hover:shadow-neon-blue', name: 'Rare' },
  4: { color: 'border-purple-500', shadow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]', name: 'Epic' },
  5: { color: 'border-yellow-500', shadow: 'hover:shadow-neon-yellow', name: 'Legendary' },
};


export default function MarketplacePage() {
  const [balance] = useState(500); // Mock balance
  const { toast } = useToast();

  const handlePurchase = (itemName: string, price: number) => {
    toast({
      title: 'Purchase Successful!',
      description: `You bought ${itemName} for ${price} coins. It has been added to your inventory.`,
    });
    // Here you would typically deduct balance and add item to inventory
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Store className="w-10 h-10 text-secondary" />
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Marketplace</h1>
          <p className="text-slate-400">Trade NFTs and in-game items.</p>
        </div>
      </div>

      <div className="mb-8">
        <Card className="glassmorphism inline-block">
          <CardHeader>
            <CardTitle className="text-lg font-headline text-white flex items-center gap-2">
              <Coins className="text-yellow-400" />
              Your Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{balance.toLocaleString()} Coins</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {marketItems.map(item => (
          <ItemCard key={item.id} item={item} onPurchase={handlePurchase} />
        ))}
      </div>
    </div>
  );
}

function ItemCard({ item, onPurchase }: { item: any, onPurchase: (name: string, price: number) => void }) {
  const config = rarityConfig[item.rarity];
  return (
    <Card className={`glassmorphism border-2 ${config.color} ${config.shadow} p-0 transition-all duration-300`}>
        <div className="p-4">
            <div className="aspect-square bg-base-bg/50 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                {item.image && (
                <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    data-ai-hint={item.hint}
                    className="w-full h-full object-cover pixelated"
                />
                )}
            </div>
            <h3 className="font-headline text-base text-white truncate">{item.name}</h3>
            <p className={`text-xs font-bold`} style={{color: config.color.replace('border-', 'text-')}}>{config.name}</p>
        </div>
      <CardContent className="p-4 pt-0">
        <Button onClick={() => onPurchase(item.name, item.price)} className="w-full font-headline">
          <Coins className="mr-2 h-4 w-4" />
          Buy for {item.price}
        </Button>
      </CardContent>
    </Card>
  );
}

    