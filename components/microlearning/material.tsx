"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BookText, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModuleItem, modules } from "./data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModuleProgress } from "@/hooks/useModuleProgress";

// Bertahan selama sesi browser — mencegah double POST meski Strict Mode remount.
const postedModuleIds = new Set<string>();

export default function MaterialPageSection({ item }: { item: ModuleItem }) {
  const parentModule = modules.find((m) => m.items.some((i) => i.id === item.id));
  const quizItem = parentModule?.items.find((i) => i.type === "quiz");
  const goBackHref = parentModule ? `/microlearning?module=${parentModule.id}` : "/microlearning";

  const queryClient = useQueryClient();

  // Mengambil data progress modul secara real-time (staleTime 0) untuk mendeteksi apakah material sudah pernah dibuka.
  const { data: progressData } = useModuleProgress(0);

  const moduleProgress = progressData?.module_progresses?.find(
    (p) => p.module_id === parentModule?.id,
  );
  const alreadyViewed = (moduleProgress?.completed_percentage ?? 0) > 0;

  const { mutate: recordProgress } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/module-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module_id: parentModule?.id, completed_items: 1 }),
      });
      const body = await res.json().catch(() => ({}));
      console.log("[DEBUG] POST /module-progress →", res.status, body);
      if (!res.ok) {
        // Duplicate key = record sudah ada (pre-created oleh backend saat user daftar).
        // Backend menggunakan INSERT biasa (bukan UPSERT), sehingga tidak bisa update record yang sudah ada.
        if ((body?.message as string)?.includes("duplicate key")) {
          console.log("[DEBUG] Duplicate key → treated as success (optimistic update)");
          return { __isDuplicate: true, ...body };
        }
        throw new Error("Gagal menyimpan progress");
      }
      return body;
    },
    onSuccess: (data) => {
      const isDuplicate = !!(data as any).__isDuplicate;
      const moduleId = parentModule?.id;
      console.log("[DEBUG] onSuccess, isDuplicate:", isDuplicate, "moduleId:", moduleId);

      if (isDuplicate && moduleId) {
        // Backend tidak mengupdate DB (INSERT-only, bukan UPSERT).
        // Lakukan optimistic update langsung di cache agar progress bar terupdate di UI.
        // Angka 25 = persentase setelah material dibuka (sesuai contoh response API).
        queryClient.setQueryData(
          ["moduleProgress"],
          (old: { module_progresses: { module_id: string; completed_percentage: number }[] } | undefined) => {
            if (!old?.module_progresses) return old;
            return {
              ...old,
              module_progresses: old.module_progresses.map((p) =>
                p.module_id === moduleId ? { ...p, completed_percentage: Math.max(p.completed_percentage, 25) } : p,
              ),
            };
          },
        );
      } else {
        // POST 201 sukses → invalidate agar data dari backend yang dipakai.
        queryClient.invalidateQueries({ queryKey: ["moduleProgress"] });
      }
    },
    onError: (err) => console.error("[DEBUG] onError:", err),
  });


  useEffect(() => {
    const moduleId = parentModule?.id;
    console.log("[DEBUG] useEffect mount — moduleId:", moduleId, "| already posted:", postedModuleIds.has(moduleId ?? ""));
    if (moduleId && !postedModuleIds.has(moduleId)) {
      postedModuleIds.add(moduleId);
      recordProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto md:px-6 py-10">
      <Link
        href={goBackHref}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-red-700 transition-colors mb-6 group select-none"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        Go back
      </Link>

      <Card className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm h-fit">
        <CardContent className="px-6 md:p-10">
          <div className="flex items-center gap-5 mb-8">
            <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full shadow-sm bg-green-100/80 shrink-0">
              <BookText className="w-3 h-3 md:w-6 md:h-6 text-green-700" />
            </div>
            <div className="w-full space-y-2">
              <h2 className="text-sm md:text-xl font-bold text-gray-900 leading-tight">{item.title}</h2>
              <div className="flex items-center justify-between gap-6">
                <span className="text-xs md:text-sm font-light w-32 shrink-0">Learning Materials</span>
                {alreadyViewed ? (
                  <span className="flex items-center gap-1.5 text-sm text-green-600 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Done
                  </span>
                ) : (
                  <span className="text-sm text-gray-400 font-bold">Pending</span>
                )}
              </div>
            </div>
          </div>

          <div className="mb-10 text-gray-800">
            <h3 className="text-base md:text-xl font-bold mb-4">{item.content?.heading || "Section Heading"}</h3>
            <p className="text-xs md:text-sm leading-relaxed text-gray-700 text-justify">
              {item.content?.text || "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
            </p>
          </div>

          {quizItem && (
            <div className="flex justify-start">
              <Link href={`/microlearning/${quizItem.id}`}>
                <Button className="bg-[#4ade80] hover:bg-green-500 text-white px-8 md:py-6 rounded-lg text-sm md:text-base lg:text-lg">
                  Next to Quiz
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
