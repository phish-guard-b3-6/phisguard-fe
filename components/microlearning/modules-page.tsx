"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronRight, ChevronDown, HelpCircle, BookText, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useModuleProgress, ModuleProgressItem } from "@/hooks/useModuleProgress";

import { Module, ModuleItem, modules } from "./data";

// ─────────────────────────────────────────────
// Sub-component: Module List Item
// ─────────────────────────────────────────────
function ModuleListItem({
  module,
  progress,
  isActive,
  isExpanded,
  onClick,
}: {
  module: Module;
  progress: number;
  isActive: boolean;
  isExpanded?: boolean;
  onClick: () => void;
}) {
  const isCompleted = progress === 100;
  const progressColor = isCompleted ? "bg-green-500" : progress > 0 ? "bg-red-500" : "bg-gray-300";

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-4 cursor-pointer transition-all duration-200 select-none ${
        isActive ? "border-red-400 bg-white shadow-sm" : "border-gray-200 bg-white hover:shadow-sm hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-sm font-semibold text-gray-800 leading-snug">{module.title}</p>
        <div className="flex items-center gap-2 shrink-0">
          {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />}
          <ChevronDown
            className={`w-4 h-4 text-red-400 mt-0.5 transition-transform duration-300 lg:hidden ${isExpanded ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>

      {/* Progress bar — nilai dari API (completed_percentage) */}
      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden mb-2">
        <div className={`h-full rounded-full transition-all duration-500 ${progressColor}`} style={{ width: `${progress}%` }} />
      </div>
      <p className="text-xs font-medium">{progress}% Completed</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sub-component: Module Detail Panel
// ─────────────────────────────────────────────
function ModuleDetailPanel({ module, moduleProgress }: { module: Module; moduleProgress: number }) {
  // Hydration guard: useState lokal digunakan karena belum ada API per-item status.
  // isClient dibutuhkan agar status item tidak berbeda antara SSR dan client.
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  /**
   * Menentukan status tampilan setiap baris item berdasarkan completed_percentage dari API:
   * - material: "done" jika progress > 0 (artinya sudah dikunjungi), selain itu "pending"
   * - quiz: "done" jika progress = 100 (lulus), "locked" jika material belum selesai, selain itu "pending"
   */
  const getEffectiveStatus = (item: ModuleItem): "done" | "pending" | "locked" => {
    if (!isClient) return item.type === "quiz" ? "locked" : "pending";

    if (item.type === "material") {
      return moduleProgress > 0 ? "done" : "pending";
    }

    // Quiz: done jika sudah 100%, locked jika material belum dikerjakan (progress masih 0)
    if (moduleProgress === 100) return "done";
    if (moduleProgress === 0) return "locked";
    return "pending";
  };

  return (
    <Card className="rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm h-fit">
      <CardContent>
        <div className="pb-4 border-b border-red-300 text-left">
          <h2 className="hidden lg:text-2xl font-extrabold mb-1 tracking-tight">{module.title}</h2>
          <p className="text-sm lg:text-base font-light leading-relaxed">{module.description}</p>
        </div>

        <div className="flex flex-col">
          {module.items.map((item, index) => {
            const effectiveStatus = getEffectiveStatus(item);
            const targetHref = `/microlearning/${item.id}`;

            return (
              <Link
                href={effectiveStatus === "locked" ? "#" : targetHref}
                key={item.id}
                onClick={(e) => {
                  if (effectiveStatus === "locked") e.preventDefault();
                }}
                className={`flex items-center justify-between gap-4 py-4 md:py-6 transition-all duration-150 group ${
                  effectiveStatus === "locked" ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                } ${index !== module.items.length - 1 ? "border-b border-red-300" : ""}`}
              >
                <div className="flex items-center gap-4 md:gap-5 min-w-0 flex-1">
                  <div
                    className={`shrink-0 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full shadow-sm ${
                      item.type === "material" ? "bg-green-100/80" : "bg-red-100/80"
                    }`}
                  >
                    {item.type === "material" ? (
                      <BookText className="w-3 h-3 md:w-6 md:h-6 text-green-700" />
                    ) : (
                      <HelpCircle className="w-3 h-3 md:w-6 md:h-6 text-red-900" />
                    )}
                  </div>

                  <div className="space-y-2 md:space-y-3 min-w-0 flex-1">
                    <p className="text-sm lg:text-xl font-bold text-gray-900 transition-colors line-clamp-2">{item.title}</p>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2 md:gap-6">
                        <span className="text-xs lg:text-sm rounded-sm w-fit font-medium">
                          {item.type === "material" ? "Learning Materials" : "Quiz"}
                        </span>
                      </div>
                      {effectiveStatus === "done" && (
                        <span className="flex items-center gap-1.5 text-xs lg:text-sm text-green-600 font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          Done
                        </span>
                      )}
                      {effectiveStatus === "locked" && (
                        <span className="flex items-center gap-1.5 text-xs lg:text-sm text-gray-500 font-bold">
                          <Lock className="w-4 h-4" />
                          Locked
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 border border-gray-200 rounded-full flex items-center justify-center bg-gray-50/50 transition-all group-hover:bg-gray-100">
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-gray-600" />
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Main Component Content (Wrapped in Suspense)
// ─────────────────────────────────────────────
function ModulesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get("module");

  // Mengambil data progress seluruh modul untuk menghitung dan menampilkan progress bar masing-masing modul.
  const { data: progressData } = useModuleProgress();

  // Ubah array → Map untuk lookup O(1) berdasarkan module_id (UUID).
  // module_id pada respons API harus cocok dengan field id di data.ts.
  const progressMap = React.useMemo(() => {
    const map = new Map<string, number>();
    (progressData?.module_progresses ?? []).forEach((p) => {
      map.set(p.module_id, p.completed_percentage);
    });
    return map;
  }, [progressData]);

  const getProgress = (moduleId: string) => progressMap.get(moduleId) ?? 0;

  const [activeModuleId, setActiveModuleId] = useState<string>(
    // Dukung deep-link (?module=<uuid>) saat render pertama; fallback ke modul pertama.
    moduleParam && modules.some((m) => m.id === moduleParam) ? moduleParam : modules[0].id,
  );

  // sessionStorage menyimpan panel accordion yang terbuka agar tetap ada saat navigasi (misal: tombol Back).
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("mobileExpandedId") ?? null;
  });

  // Sinkronkan activeModuleId saat parameter URL ?module berubah dari luar.
  useEffect(() => {
    if (moduleParam && modules.some((m) => m.id === moduleParam)) {
      setActiveModuleId(moduleParam);
    }
  }, [moduleParam]);

  // Cerminkan mobileExpandedId ke sessionStorage agar tetap ada saat navigasi soft.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mobileExpandedId !== null) {
      sessionStorage.setItem("mobileExpandedId", mobileExpandedId);
    } else {
      sessionStorage.removeItem("mobileExpandedId");
    }
  }, [mobileExpandedId]);

  const handleModuleClick = (id: string) => {
    setActiveModuleId(id);

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileExpandedId((prev) => (prev === id ? null : id));
    } else {
      setMobileExpandedId(null);
    }

    router.push(`?module=${id}`, { scroll: false });
  };

  const activeModule = modules.find((m) => m.id === activeModuleId) ?? modules[0];

  return (
    <div className="w-full md:w-4/5 lg:w-2/3 mx-auto md:px-6 pb-20">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl lg:text-2xl font-extrabold text-gray-900 tracking-tight mb-2">Basic Phishing Detection Guide</h1>
        <p className="text-xs md:text-sm lg:text-base font-light w-full">
          Complete the modules and tasks below at your own pace to enhance your understanding of phishing threats.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="flex lg:gap-16 items-start">
        {/* Left: Module List — progress dari API */}
        <div className="flex-3 w-full lg:w-72 shrink-0 space-y-3">
          <h2 className="text-base font-bold text-gray-700 mb-4">Module List</h2>
          {modules.map((module) => {
            const isExpanded = module.id === mobileExpandedId;
            return (
              <React.Fragment key={module.id}>
                <ModuleListItem
                  module={module}
                  progress={getProgress(module.id)}
                  isActive={module.id === activeModuleId}
                  isExpanded={isExpanded}
                  onClick={() => handleModuleClick(module.id)}
                />
                {/* Inline detail panel — slide-down, hanya terlihat di bawah lg */}
                <div
                  className={`lg:hidden grid transition-all duration-300 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex gap-3 pt-1">
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-3 bg-red-300" />
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-0.5 flex-1 bg-red-300" />
                      </div>
                      <div className="flex-1 pb-1">
                        <ModuleDetailPanel module={activeModule} moduleProgress={getProgress(activeModule.id)} />
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: Module Detail */}
        <div className="hidden lg:flex flex-5">
          <ModuleDetailPanel module={activeModule} moduleProgress={getProgress(activeModule.id)} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Exported Component
// ─────────────────────────────────────────────
export default function ModulesPage() {
  return (
    <Suspense fallback={<div className="w-full text-center py-20 text-gray-400">Loading modules...</div>}>
      <ModulesPageContent />
    </Suspense>
  );
}
