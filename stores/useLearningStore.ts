import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tracks which material items have been viewed and which quizzes are completed
interface LearningState {
  // Set of material item IDs the user has visited
  viewedMaterials: Set<string>;
  // Set of quiz item IDs the user has passed (≥2 correct)
  completedQuizzes: Set<string>;

  markMaterialViewed: (itemId: string) => void;
  markQuizCompleted: (itemId: string) => void;
  isMaterialViewed: (itemId: string) => boolean;
  isQuizCompleted: (itemId: string) => boolean;
  // Returns 0, 50, or 100 for a given module
  getModuleProgress: (materialId: string, quizId: string) => number;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      viewedMaterials: new Set<string>(),
      completedQuizzes: new Set<string>(),

      markMaterialViewed: (itemId) =>
        set((state) => ({
          viewedMaterials: new Set([...state.viewedMaterials, itemId]),
        })),

      markQuizCompleted: (itemId) =>
        set((state) => ({
          completedQuizzes: new Set([...state.completedQuizzes, itemId]),
        })),

      isMaterialViewed: (itemId) => get().viewedMaterials.has(itemId),

      isQuizCompleted: (itemId) => get().completedQuizzes.has(itemId),

      getModuleProgress: (materialId, quizId) => {
        const { viewedMaterials, completedQuizzes } = get();
        if (completedQuizzes.has(quizId)) return 100;
        if (viewedMaterials.has(materialId)) return 50;
        return 0;
      },
    }),
    {
      name: "cimb-phishguard-learning",
      // Serialize/deserialize Set correctly
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            state: {
              viewedMaterials: new Set(parsed.state.viewedMaterials ?? []),
              completedQuizzes: new Set(parsed.state.completedQuizzes ?? []),
            },
          };
        },
        setItem: (name, value) => {
          const toStore = {
            state: {
              viewedMaterials: [...value.state.viewedMaterials],
              completedQuizzes: [...value.state.completedQuizzes],
            },
          };
          localStorage.setItem(name, JSON.stringify(toStore));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
