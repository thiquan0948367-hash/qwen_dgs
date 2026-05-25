import { create } from "zustand";

export interface FoodPlan { breakfast: string; lunch: string; dinner: string; }
export interface TravelPlan { items: { time: string; place: string; route: string; duration: string }[]; }
export interface CreationResult { type: "image" | "text" | "code"; prompt: string; result: string; }
export interface MemoryItem { time: string; scene: string; summary: string; detail: string; }

interface UserState {
  name: string; tags: string[]; mood: string;
  foodPlan: FoodPlan | null; travelPlan: TravelPlan | null;
  creationResult: CreationResult | null; memories: MemoryItem[];
  futureMessage: string;
  setName: (n: string) => void; setTags: (t: string[]) => void; setMood: (m: string) => void;
  setFoodPlan: (p: FoodPlan) => void; setTravelPlan: (p: TravelPlan) => void;
  setCreationResult: (r: CreationResult) => void; addMemory: (m: MemoryItem) => void;
  setMemories: (m: MemoryItem[]) => void; setFutureMessage: (m: string) => void;
  reset: () => void;
}

const init = { name: "", tags: [] as string[], mood: "", foodPlan: null, travelPlan: null, creationResult: null, memories: [] as MemoryItem[], futureMessage: "" };

export const useUserStore = create<UserState>((set) => ({
  ...init,
  setName: (name) => set({ name }), setTags: (tags) => set({ tags }), setMood: (mood) => set({ mood }),
  setFoodPlan: (foodPlan) => set({ foodPlan }), setTravelPlan: (travelPlan) => set({ travelPlan }),
  setCreationResult: (creationResult) => set({ creationResult }),
  addMemory: (item) => set((s) => ({ memories: [...s.memories, item] })),
  setMemories: (memories) => set({ memories }),
  setFutureMessage: (futureMessage) => set({ futureMessage }),
  reset: () => set(init),
}));
