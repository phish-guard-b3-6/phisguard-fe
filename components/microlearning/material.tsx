"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BookText, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModuleItem, modules } from "./data";

export default function MaterialPageSection({ item }: { item: ModuleItem }) {
  // Mencari modul indeks yang menaungi item ini agar Go back mengarah kembali kepadanya
  const parentModule = modules.find((m) => m.items.some((i) => i.id === item.id));
  const goBackHref = parentModule ? `/microlearning?module=${parentModule.id}` : "/microlearning";

  // Mencari kuis yang ada di dalam modul ini
  const quizItem = parentModule?.items.find((i) => i.type === "quiz");

  return (
    <div className="w-full max-w-4xl mx-auto md:px-6 py-10">
      {/* Go Back Button */}
      <Link
        href={goBackHref}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-red-700 transition-colors mb-6 group select-none"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        Go back
      </Link>

      {/* Main Material Card */}
      <Card className="rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm h-fit">
        <CardContent className="px-6 md:p-10">
          {/* Header Section (Icon, Title, Status) */}
          <div className="flex items-center gap-5 mb-8">
            <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full shadow-sm bg-green-100/80 shrink-0">
              <BookText className="w-3 h-3 md:w-6 md:h-6 text-green-700" />
            </div>

            <div className="w-full space-y-2">
              <h2 className="text-sm md:text-xl font-bold text-gray-900 leading-tight">{item.title}</h2>
              <div className="flex items-center justify-between gap-6">
                <span className="text-xs md:text-sm font-light w-32 shrink-0">Learning Materials</span>
                {item.status === "done" ? (
                  <span className="flex items-center gap-1.5 text-sm text-green-600 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Done
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm text-gray-400 font-bold">Pending</span>
                )}
              </div>
            </div>
          </div>

          {/* Media Placeholder */}
          <div className="w-full aspect-21/9 bg-[#e5e5e5] rounded-xl border border-gray-200 mb-8 overflow-hidden relative">
            {/* Future Image/Video will go here */}
          </div>

          {/* Text Content */}
          <div className="mb-10 text-gray-800">
            <h3 className="text-base md:text-xl font-bold mb-4">{item.content?.heading || "Section Heading"}</h3>
            <p className="text-xs md:text-sm leading-relaxed text-gray-700 text-justify">
              {item.content?.text || (
                <>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </>
              )}
            </p>
          </div>

          {/* Action Button */}
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
