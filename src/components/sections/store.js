import { create } from 'zustand';
import { projects } from './projects';
export const useProjectsStore = create((set, get) => ({
    iframeRef: null,
    setIframeRef: (ref) => set({ iframeRef: ref }),

    playerInstance: null,
    setPlayerInstance: (player) => set({ playerInstance: player }),

    clearAll: () => set({ iframeElem: null, playerInstance: null }),

    projects: projects,
    currentProjectIndex: 0,
    isPlaying: false,
    isReady: false,
    
    trigger: 0,
    updateTrigger: () => set((s) => ({ trigger: s.trigger + 1 })),

    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setIsReady: (ready) => set({ isReady: ready }),

    nextProject: () => {
        set((state) => ({
        currentProjectIndex: (state.currentProjectIndex + 1) % state.projects.length,
        }));
        setTimeout(() => { get().updateTrigger(); }, 100);
    },
    previousProject: () => {
        set((state) => ({
        currentProjectIndex:
            (state.currentProjectIndex - 1 + state.projects.length) % state.projects.length,
        }));
        setTimeout(() => { get().updateTrigger();}, 100);
    },
}));