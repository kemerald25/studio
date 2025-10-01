
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CrewState = {
  joinedCrewId: number | null;
  setJoinedCrew: (id: number | null) => void;
};

export const useCrewStore = create<CrewState>()(
  persist(
    (set) => ({
      joinedCrewId: null,
      setJoinedCrew: (id) => set({ joinedCrewId: id }),
    }),
    {
      name: 'crew-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

    