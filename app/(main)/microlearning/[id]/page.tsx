import MaterialPageSection from "@/components/microlearning/material";
import QuizPageSection from "@/components/microlearning/quiz";
import { modules } from "@/components/microlearning/data";
import { redirect, notFound } from "next/navigation";
import React from "react";

export default async function MicrolearningItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const item = modules.flatMap((m) => m.items).find((i) => i.id === id);

  if (!item) {
    redirect("/microlearning");
  }

  if (item.type === "material") {
    return <MaterialPageSection item={item} />;
  }

  if (item.type === "quiz") {
    return <QuizPageSection item={item} />;
  }

  // Fallback
  return null;
}
