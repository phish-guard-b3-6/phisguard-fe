"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckSquare, HelpCircle, Info, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModuleItem, modules } from "./data";

export default function QuizPageSection({ item }: { item: ModuleItem }) {
  // Find parent module to set Go back link
  const parentModule = modules.find((m) => m.items.some((i) => i.id === item.id));
  const goBackHref = parentModule ? `/microlearning?module=${parentModule.id}` : "/microlearning";

  const questions = item.quizContent?.questions || [];

  // State to track selected answers: { questionId: selectedOption }
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleOptionSelect = (qId: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="w-full lg:w-3/4 mx-auto md:px-6 pt-10 pb-20">
      {/* Go Back Button */}
      <Link
        href={goBackHref}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-red-700 transition-colors mb-6 group select-none"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        Go back
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Quiz Content */}
        <div className="flex-1 w-full space-y-6">
          <Card className="rounded-xl bg-neutral-50 backdrop-blur-sm shadow-md">
            <CardContent className="p-8 md:p-10">
              {/* Header */}
              <div className="flex items-center gap-5 mb-8 pb-8 border-b border-black">
                <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full shadow-sm bg-red-100/80 shrink-0">
                  <HelpCircle className="w-4 h-4 md:w-6 md:h-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-sm md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">{item.title}</h2>
                  <p className="text-sm lg:text-base font-light mt-1">Multiple Choice Quiz</p>
                </div>
              </div>

              {/* Alert Box */}
              <div className="flex items-start md:items-center gap-3 bg-[#bdf0ca]/50 border border-green-200 text-green-800 p-4 rounded-xl mb-8">
                <Info className="w-5 h-5 text-green-600 shrink-0 mt-0.5 md:mt-0" />
                <p className="text-xs md:text-sm font-medium">
                  {`Answer all the questions below to complete the task. Choose the best answer for each question.`}
                </p>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {questions.map((q, idx) => (
                  <Card key={q.id} className="border border-gray-200 bg-gray-50/50 shadow-none rounded-2xl">
                    <CardContent className="px-6">
                      <p className="text-xs md:text-sm lg:text-base font-light text-black mb-5">{q.text}</p>

                      <div className="space-y-3">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = answers[q.id] === opt;
                          return (
                            <div
                              key={optIdx}
                              onClick={() => handleOptionSelect(q.id, opt)}
                              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${
                                isSelected ? "border-green-500 bg-green-50/50" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {isSelected ? (
                                <CheckSquare className="w-5 h-5 text-green-600 shrink-0" />
                              ) : (
                                <Square className="w-5 h-5 text-black shrink-0" />
                              )}
                              <span className={`text-xs md:text-sm lg:text-base font-light ${isSelected ? "text-green-800" : "text-black"}`}>
                                {opt}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Navigation & Submission */}
        <div className="w-full lg:w-80 shrink-0 sticky top-6">
          <Card className="rounded-xl bg-neutral-50 backdrop-blur-sm shadow-md">
            <CardContent className="px-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Question Navigation</h3>

              {/* Number Grid */}
              <div className="flex flex-wrap gap-2 mb-6">
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded border font-semibold transition-colors ${
                        isAnswered ? "bg-black border-black text-white" : "border-gray-200 text-gray-700 bg-white"
                      }`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-xs bg-black border border-black" />
                  <span className="text-xs md:text-sm font-medium">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-xs bg-white border border-gray-300" />
                  <span className="text-xs md:text-sm font-medium">Unanswered</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6 pb-3 border-b border-gray-200">
                <p className="text-xs md:text-sm font-semibold mb-1">Progress</p>
                <div className="text-2xl md:text-3xl font-bold">
                  {answeredCount}/{questions.length}
                </div>
              </div>

              {/* Submit Button */}
              <Link href={goBackHref} className="block w-full">
                <Button className="w-full bg-[#4ade80] hover:bg-green-500 text-white font-bold py-6 rounded-lg cursor-pointer">Submit Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
