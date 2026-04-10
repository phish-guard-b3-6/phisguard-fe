"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronRight, HelpCircle, BookText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Module, modules } from "./data";

// ─────────────────────────────────────────────
// Sub-component: Module List Item
// ─────────────────────────────────────────────
function ModuleListItem({ module, isActive, onClick }: { module: Module; isActive: boolean; onClick: () => void }) {
  const isCompleted = module.progress === 100;
  const progressColor = isCompleted ? "bg-green-500" : module.progress > 0 ? "bg-red-500" : "bg-gray-300";

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-4 cursor-pointer transition-all duration-200 select-none ${
        isActive ? "border-green-400 bg-white shadow-sm" : "border-gray-200 bg-white hover:shadow-sm hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-sm font-semibold text-gray-800 leading-snug">{module.title}</p>
        {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />}
      </div>

      {/* Custom progress bar */}
      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden mb-2">
        <div className={`h-full rounded-full transition-all duration-500 ${progressColor}`} style={{ width: `${module.progress}%` }} />
      </div>
      <p className="text-xs font-medium">{module.progress}% Completed</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sub-component: Module Detail Panel
// ─────────────────────────────────────────────
function ModuleDetailPanel({ module }: { module: Module }) {
  return (
    <Card className="rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm h-fit">
      <CardContent>
        {/* Header */}
        <div className="pb-4 border-b border-red-300 text-left">
          <h2 className="text-2xl font-extrabold mb-1 tracking-tight">{module.title}</h2>
          <p className="text-base font-light leading-relaxed">{module.description}</p>
        </div>

        {/* Item List */}
        <div className="flex flex-col">
          {module.items.map((item, index) => {
            const targetHref = `/microlearning/${item.id}`;

            return (
              <Link
                href={targetHref}
                key={item.id}
                className={`flex items-center justify-between py-6 transition-all duration-150 cursor-pointer group ${
                  index !== module.items.length - 1 ? "border-b border-red-300" : ""
                }`}
              >
                <div className="flex items-center gap-5">
                  {/* Icon */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full shadow-sm ${
                      item.type === "material" ? "bg-green-100/80" : "bg-red-100/80"
                    }`}
                  >
                    {item.type === "material" ? <BookText className="w-6 h-6 text-green-700" /> : <HelpCircle className="w-6 h-6 text-red-900" />}
                  </div>

                  {/* Title & Meta */}
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-gray-900 transition-colors">{item.title}</p>
                    <div className="flex items-center gap-6">
                      <span className="text-sm min-w-32">{item.type === "material" ? "Learning Materials" : "Quiz"}</span>
                      {item.status === "done" && (
                        <span className="flex items-center gap-1.5 text-sm text-green-600 font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          Done
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrow in Circle */}
                <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center bg-gray-50/50 transition-all">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
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

  const [activeModuleId, setActiveModuleId] = useState<string>(
    moduleParam && modules.some((m) => m.id === moduleParam) ? moduleParam : modules[0].id,
  );

  // Sync state with URL parameter changes (e.g., when Back button is pressed)
  useEffect(() => {
    if (moduleParam && modules.some((m) => m.id === moduleParam)) {
      setActiveModuleId(moduleParam);
    }
  }, [moduleParam]);

  const handleModuleClick = (id: string) => {
    setActiveModuleId(id);
    router.push(`?module=${id}`, { scroll: false });
  };

  const activeModule = modules.find((m) => m.id === activeModuleId) ?? modules[0];

  return (
    <div className="w-2/3 mx-auto px-6 pt-10 pb-20">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Basic Phishing Detection Guide</h1>
        <p className="text-gray-500 font-medium w-full">
          Complete the modules and tasks below at your own pace to enhance your understanding of phishing threats.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="flex gap-16 items-start">
        {/* Left: Module List */}
        <div className="flex-3 w-72 shrink-0 space-y-3">
          <h2 className="text-base font-bold text-gray-700 mb-4">Module List</h2>
          {modules.map((module) => (
            <ModuleListItem key={module.id} module={module} isActive={module.id === activeModuleId} onClick={() => handleModuleClick(module.id)} />
          ))}
        </div>

        {/* Right: Module Detail */}
        <div className="flex-5">
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
