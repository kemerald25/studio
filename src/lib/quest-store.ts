
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { quests, Quest } from './quests';

export type QuestStatus = 'available' | 'in_progress' | 'completed';

type QuestState = {
  questStates: Record<number, QuestStatus>;
  startQuest: (id: number) => void;
  completeQuest: (id: number) => void;
  getQuestStatus: (id: number) => QuestStatus;
};

const initialStates = quests.reduce((acc, q) => ({ ...acc, [q.id]: q.status }), {});

export const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      questStates: initialStates,
      startQuest: (id) =>
        set((state) => ({
          questStates: { ...state.questStates, [id]: 'in_progress' },
        })),
      completeQuest: (id) =>
        set((state) => ({
          questStates: { ...state.questStates, [id]: 'completed' },
        })),
      getQuestStatus: (id: number) => {
          return get().questStates[id];
      }
    }),
    {
      name: 'quest-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

    