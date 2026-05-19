"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, CheckSquare, HelpCircle, Info, Square, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModuleItem, modules } from "./data";
import { useLearningStore } from "@/stores/useLearningStore";

export default function QuizPageSection({ item }: { item: ModuleItem }) {
  const parentModule = modules.find((m) => m.items.some((i) => i.id === item.id));
  const goBackHref = parentModule ? `/microlearning?module=${parentModule.id}` : "/microlearning";

  const questions = item.quizContent?.questions || [];

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const markQuizCompleted = useLearningStore((s) => s.markQuizCompleted);

  const handleOptionSelect = (qId: string, option: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    // Calculate score
    let correct = 0;
    questions.forEach((q) => {
      const selectedOption = answers[q.id];
      if (selectedOption && q.options.indexOf(selectedOption) === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);

    // Mark as completed if ≥2 correct
    if (correct >= 2) {
      markQuizCompleted(item.id);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const passed = submitted && score >= 2;

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

              {/* Result Banner */}
              {submitted && (
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl mb-8 border ${
                    passed ? "bg-green-50 border-green-300 text-green-800" : "bg-red-50 border-red-300 text-red-800"
                  }`}
                >
                  {passed ? <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600" /> : <XCircle className="w-5 h-5 shrink-0 text-red-500" />}
                  <p className="text-sm font-semibold">
                    {passed
                      ? `Selamat! Anda menjawab ${score} dari ${questions.length} soal dengan benar. Modul ini selesai!`
                      : `Anda hanya menjawab ${score} dari ${questions.length} soal dengan benar. Minimal 2 benar untuk lulus. Coba lagi!`}
                  </p>
                </div>
              )}

              {/* Alert Box (before submit) */}
              {!submitted && (
                <div className="flex items-start md:items-center gap-3 bg-[#bdf0ca]/50 border border-green-200 text-green-800 p-4 rounded-xl mb-8">
                  <Info className="w-5 h-5 text-green-600 shrink-0 mt-0.5 md:mt-0" />
                  <p className="text-xs md:text-sm font-medium">
                    Jawab semua pertanyaan di bawah ini. Minimal 2 jawaban benar untuk menyelesaikan modul.
                  </p>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const selectedIdx = q.options.indexOf(answers[q.id] ?? "");
                  const isCorrect = submitted && selectedIdx === q.correctAnswer;
                  const isWrong = submitted && isAnswered && selectedIdx !== q.correctAnswer;

                  return (
                    <Card key={q.id} className="border border-gray-200 bg-gray-50/50 shadow-none rounded-2xl">
                      <CardContent className="px-6">
                        <p className="text-xs md:text-sm lg:text-base font-light text-black mb-5">
                          <span className="font-semibold">{idx + 1}. </span>
                          {q.text}
                        </p>

                        <div className="space-y-3">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = answers[q.id] === opt;
                            const isCorrectOpt = submitted && optIdx === q.correctAnswer;
                            const isWrongSelected = submitted && isSelected && optIdx !== q.correctAnswer;

                            let borderClass = "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50";
                            if (isSelected && !submitted) borderClass = "border-green-500 bg-green-50/50";
                            if (isCorrectOpt) borderClass = "border-green-500 bg-green-50";
                            if (isWrongSelected) borderClass = "border-red-400 bg-red-50";

                            return (
                              <div
                                key={optIdx}
                                onClick={() => handleOptionSelect(q.id, opt)}
                                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                                  submitted ? "cursor-default" : "cursor-pointer"
                                } ${borderClass}`}
                              >
                                {isCorrectOpt ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                                ) : isWrongSelected ? (
                                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                                ) : isSelected ? (
                                  <CheckSquare className="w-5 h-5 text-green-600 shrink-0" />
                                ) : (
                                  <Square className="w-5 h-5 text-black shrink-0" />
                                )}
                                <span
                                  className={`text-xs md:text-sm lg:text-base font-light ${
                                    isCorrectOpt ? "text-green-800" : isWrongSelected ? "text-red-700" : isSelected ? "text-green-800" : "text-black"
                                  }`}
                                >
                                  {opt}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
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
                  const selectedIdx = q.options.indexOf(answers[q.id] ?? "");
                  const isCorrect = submitted && selectedIdx === q.correctAnswer;
                  const isWrong = submitted && isAnswered && selectedIdx !== q.correctAnswer;

                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded border font-semibold transition-colors ${
                        isCorrect
                          ? "bg-green-500 border-green-500 text-white"
                          : isWrong
                            ? "bg-red-400 border-red-400 text-white"
                            : isAnswered
                              ? "bg-black border-black text-white"
                              : "border-gray-200 text-gray-700 bg-white"
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
                {submitted && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-xs bg-green-500 border border-green-500" />
                      <span className="text-xs md:text-sm font-medium">Correct</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-xs bg-red-400 border border-red-400" />
                      <span className="text-xs md:text-sm font-medium">Wrong</span>
                    </div>
                  </>
                )}
              </div>

              {/* Progress */}
              <div className="mb-6 pb-3 border-b border-gray-200">
                <p className="text-xs md:text-sm font-semibold mb-1">Progress</p>
                <div className="text-2xl md:text-3xl font-bold">
                  {answeredCount}/{questions.length}
                </div>
              </div>

              {/* Submit / Try Again / Back Button */}
              {!submitted ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="w-full bg-[#4ade80] hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-6 rounded-lg cursor-pointer"
                >
                  Submit Quiz
                </Button>
              ) : passed ? (
                <Link href={goBackHref} className="block w-full">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-6 rounded-lg">Kembali ke Modul ✓</Button>
                </Link>
              ) : (
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setAnswers({});
                    setScore(0);
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-6 rounded-lg"
                >
                  Coba Lagi
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
