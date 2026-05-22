import { useQuery } from "@tanstack/react-query";

export interface ModuleProgressItem {
  id: string;
  user_id: string;
  module_id: string;
  title: string;
  completed_percentage: number;
  created_at: string;
  updated_at: string;
}

interface ModuleProgressResponse {
  module_progresses: ModuleProgressItem[];
}

/**
 * Hook terpusat untuk mengambil semua module progress.
 * Digunakan di modules-page, material, dan quiz agar queryKey & queryFn tidak duplikat.
 *
 * @param staleTime - Override staleTime jika perlu data yang selalu fresh (default: 30_000ms).
 */
export function useModuleProgress(staleTime = 30_000) {
  return useQuery<ModuleProgressResponse>({
    queryKey: ["moduleProgress"],
    queryFn: async () => {
      const res = await fetch("/api/module-progress");
      if (!res.ok) return { module_progresses: [] };
      return res.json();
    },
    staleTime,
  });
}
