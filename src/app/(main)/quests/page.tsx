
'use client';

import { ScrollText, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useQuestStore } from '@/lib/quest-store';
import { quests } from '@/lib/quests';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function QuestsPage() {
  const { questStates, startQuest, completeQuest } = useQuestStore();
  const { toast } = useToast();
  const router = useRouter();

  const handleQuestAction = (questId: number) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;

    const currentStatus = questStates[questId];
    if (currentStatus === 'available') {
        startQuest(questId);
        toast({ title: "Quest Started!", description: "You've accepted the quest." });
        if(quest.href) {
            router.push(quest.href);
        }
    }
  }

  const getButtonInfo = (questId: number, href?: string): { text: string; disabled: boolean; variant: "default" | "secondary" | "outline" | "ghost" | "link"; asChild: boolean; } => {
      const status = questStates[questId];
      switch(status) {
          case 'available':
              return { text: 'Accept Quest', disabled: false, variant: 'secondary', asChild: false };
          case 'in_progress':
               if (href) {
                 return { text: 'Continue Quest', disabled: false, variant: 'default', asChild: true };
               }
               return { text: 'In Progress', disabled: true, variant: 'outline', asChild: false };
          case 'completed':
              return { text: 'Completed', disabled: true, variant: 'ghost', asChild: false };
          default:
              return { text: 'Accept Quest', disabled: true, variant: 'ghost', asChild: false };
      }
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <ScrollText className="w-10 h-10 text-secondary" />
        <div>
          <h1 className="text-4xl font-headline font-bold text-white">Quests</h1>
          <p className="text-slate-400">Embark on adventures and earn rewards.</p>
        </div>
      </div>
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="font-headline text-white">Quest Board</CardTitle>
          <CardDescription>Accept quests to gain XP, items, and improve your Trust Score.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" defaultValue='item-1'>
            {quests.map((quest) => {
              const status = questStates[quest.id];
              const buttonInfo = getButtonInfo(quest.id, quest.href);

              const ActionButton = () => {
                const button = (
                    <Button 
                        onClick={() => handleQuestAction(quest.id)}
                        disabled={buttonInfo.disabled}
                        variant={buttonInfo.variant}
                        className="w-full font-headline"
                    >
                        {buttonInfo.text}
                    </Button>
                )
                if(buttonInfo.asChild && quest.href){
                    return <Link href={quest.href} passHref legacyBehavior>{button}</Link>
                }
                return button;
              }


              return (
                <AccordionItem value={`item-${quest.id}`} key={quest.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-4">
                            {status === 'completed' 
                                ? <CheckCircle className="text-success" />
                                : status === 'in_progress' 
                                ? <Clock className="text-warning animate-pulse" />
                                : <quest.icon className="text-secondary" />
                            }
                            <div className="text-left">
                                <h4 className="font-headline text-lg text-white">{quest.title}</h4>
                                <p className="text-sm text-slate-400">{quest.type}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-white">{quest.reward.xp} XP</p>
                            {quest.reward.trust > 0 && <p className="text-xs text-success/80">+{quest.reward.trust} Trust</p>}
                        </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-2 pt-2 pb-4 space-y-4">
                        <p className="text-slate-300">{quest.description}</p>
                        
                        {status === 'in_progress' && quest.progress !== undefined && (
                            <div>
                                <div className="flex justify-between text-sm mb-1 text-slate-400">
                                    <span>Progress</span>
                                    <span>{quest.progress}%</span>
                                </div>
                                <Progress value={quest.progress} className="h-2" />
                            </div>
                        )}

                        <ActionButton />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

    