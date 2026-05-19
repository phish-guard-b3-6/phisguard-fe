"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronRight, ChevronDown, HelpCircle, BookText, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Module, ModuleItem, modules } from "./data";
import { useLearningStore } from "@/stores/useLearningStore";

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
          {/* Chevron indicator — only visible below lg */}
          <ChevronDown
            className={`w-4 h-4 text-red-400 mt-0.5 transition-transform duration-300 lg:hidden ${isExpanded ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>

      {/* Custom progress bar */}
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
function ModuleDetailPanel({ module }: { module: Module }) {
  // Guard: only read localStorage-backed store after client has mounted
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const viewedMaterials = useLearningStore((s) => s.viewedMaterials);
  const completedQuizzes = useLearningStore((s) => s.completedQuizzes);

  const materialItem = module.items.find((i) => i.type === "material");
  const materialViewed = isClient && materialItem ? viewedMaterials.has(materialItem.id) : false;

  const getEffectiveStatus = (item: ModuleItem): "done" | "pending" | "locked" => {
    if (!isClient) return item.type === "quiz" ? "locked" : "pending";
    if (item.type === "material") {
      return viewedMaterials.has(item.id) ? "done" : "pending";
    }
    // quiz
    if (completedQuizzes.has(item.id)) return "done";
    if (!materialViewed) return "locked";
    return "pending";
  };

  return (
    <Card className="rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm h-fit">
      <CardContent>
        {/* Header */}
        <div className="pb-4 border-b border-red-300 text-left">
          <h2 className="hidden lg:text-2xl font-extrabold mb-1 tracking-tight">{module.title}</h2>
          <p className="text-sm lg:text-base font-light leading-relaxed">{module.description}</p>
        </div>

        {/* Item List */}
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
                  {/* Icon */}
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

                  {/* Title & Meta */}
                  <div className="space-y-2 md:space-y-3 min-w-0 flex-1 ">
                    <p className="text-sm lg:text-xl font-bold text-gray-900 transition-colors line-clamp-2">{item.title}</p>
                    <div className="flex justify-between ">
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

                {/* Arrow in Circle */}
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
  const { getModuleProgress } = useLearningStore();
  // Guard against SSR — only read store values client-side
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const getProgress = (materialId: string, quizId: string) => (isClient ? getModuleProgress(materialId, quizId) : 0);

  const [activeModuleId, setActiveModuleId] = useState<string>(
    moduleParam && modules.some((m) => m.id === moduleParam) ? moduleParam : modules[0].id,
  );
  // Separate state for mobile accordion — persisted in sessionStorage so
  // navigating back from a detail page restores the previously opened panel.
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("mobileExpandedId") ?? null;
  });

  // Sync state with URL parameter changes (e.g., when Back button is pressed)
  useEffect(() => {
    if (moduleParam && modules.some((m) => m.id === moduleParam)) {
      setActiveModuleId(moduleParam);
    }
  }, [moduleParam]);

  // Persist mobileExpandedId to sessionStorage whenever it changes
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

    // Toggle mobile panel only on screens smaller than 'lg' (1024px)
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileExpandedId((prev) => (prev === id ? null : id));
    } else {
      // Reset mobile state when clicking on desktop to avoid unintended behavior if resized later
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
        {/* Left: Module List */}
        <div className="flex-3 w-full lg:w-72 shrink-0 space-y-3">
          <h2 className="text-base font-bold text-gray-700 mb-4">Module List</h2>
          {modules.map((module) => {
            const isExpanded = module.id === mobileExpandedId;
            return (
              <React.Fragment key={module.id}>
                <ModuleListItem
                  module={module}
                  progress={getProgress(
                    module.items.find((i) => i.type === "material")?.id ?? "",
                    module.items.find((i) => i.type === "quiz")?.id ?? "",
                  )}
                  isActive={module.id === activeModuleId}
                  isExpanded={isExpanded}
                  onClick={() => handleModuleClick(module.id)}
                />
                {/* Inline detail panel — slide-down, visible only below lg */}
                <div
                  className={`lg:hidden grid transition-all duration-300 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Connector: vertical line from item to panel */}
                    <div className="flex gap-3 pt-1">
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-3 bg-red-300" />
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-0.5 flex-1 bg-red-300" />
                      </div>
                      <div className="flex-1 pb-1">
                        <ModuleDetailPanel module={activeModule} />
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
          <ModuleDetailPanel module={activeModule} />
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
