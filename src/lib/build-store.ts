import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Build = {
  id: string;
  imageUrl: string;
  createdAt: Date;
};

type BuildState = {
  builds: Build[];
  addBuild: (build: Build) => void;
};

export const useBuildStore = create<BuildState>()(
  persist(
    (set) => ({
      builds: [],
      addBuild: (build) =>
        set((state) => ({ builds: [build, ...state.builds].slice(0, 5) })), // Keep latest 5 builds
    }),
    {
      name: 'build-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
