"use client";

import React, { useState } from "react";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Info, Link, MessageSquareMore, Phone, CheckSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CreateReportPayload, ResourceOption, ReportType } from "@/lib/types/report";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateNewReportProps {
  onSubmitSuccess: (reportId: string) => void;
}

export default function CreateNewReport({ onSubmitSuccess }: CreateNewReportProps) {
  // ── Form state ──────────────────────────────────────────────────────────────
  const [value, setValue] = useState(""); // isi URL atau nomor HP
  const [message, setMessage] = useState("");
  const [resource, setResource] = useState<ResourceOption | "">("");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reportType, setReportType] = useState<ReportType>("url");

  const router = useRouter();

  // Mutation tanstack ────────────────────────────────────────────────────────────────
  const { mutate: createReportMutation, isPending: isSubmitting } = useMutation({
    mutationFn: async (payload: CreateReportPayload) => {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message ?? "Terjadi kesalahan, coba lagi nanti.");
      }

      return res.json();
    },
    onSuccess: (data) => {
      router.refresh();
      toast.success("Laporan berhasil dikirim!", {
        description: "Tim kami akan segera menindaklanjuti laporan Anda.",
      });
      onSubmitSuccess(data?.reports?.id ?? "");
    },
    onError: (err: unknown) => {
      const message = (err as Error)?.message ?? "Terjadi kesalahan, coba lagi nanti.";
      toast.error("Gagal mengirim laporan", { description: message });
    },
  });

  // ── Submit handler ──────────────────────────────────────────────────────────
  function handleSubmit() {
    if (!resource) {
      toast.error("Pilih sumber pesan terlebih dahulu.");
      return;
    }

    createReportMutation({
      message,
      value, // URL atau nomor HP sesuai pilihan user
      type: reportType,
      resource,
      description,
      is_anonymous: isAnonymous,
    });
  }

  return (
    <div className="flex flex-col items-center mb-5 md:gap-2 w-full">
      {/* Report Type Selector */}
      <div className="w-full mt-5 lg:mt-8 mb-1">
        <p className="text-xs md:text-sm text-neutral-500 mb-3">What do you want to report?</p>
        <div className="flex gap-3 md:gap-5 w-full">
          {/* Suspicious Link/URL button */}
          <button
            type="button"
            onClick={() => {
              setReportType("url");
              setValue("");
            }}
            className={`flex-1 relative flex items-center justify-center gap-2 py-3 px-4 rounded-lg border text-xs md:text-sm font-medium transition-all cursor-pointer ${
              reportType === "url"
                ? "border-red-500 text-red-600 bg-red-50 dark:bg-red-950/30"
                : "border-neutral-400 text-neutral-500 hover:border-neutral-600"
            }`}
          >
            <Link className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Suspicious Link/URL
            {reportType === "url" && <CheckSquare className="h-3.5 w-3.5 md:h-4 md:w-4 absolute right-2 top-2" />}
          </button>

          {/* Sender Phone Number button */}
          <button
            type="button"
            onClick={() => {
              setReportType("phone");
              setValue("");
            }}
            className={`flex-1 relative flex items-center justify-center gap-2 py-3 px-4 rounded-lg border text-xs md:text-sm font-medium transition-all cursor-pointer ${
              reportType === "phone"
                ? "border-red-500 text-red-600 bg-red-50 dark:bg-red-950/30"
                : "border-neutral-400 text-neutral-500 hover:border-neutral-600"
            }`}
          >
            <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Sender Phone Number
            {reportType === "phone" && <CheckSquare className="h-3.5 w-3.5 md:h-4 md:w-4 absolute right-2 top-2" />}
          </button>
        </div>
      </div>

      {/* Conditional input based on selected report type */}
      <div className="w-full mb-5">
        {reportType === "url" ? (
          <Field>
            <FieldLabel htmlFor="url" className="flex items-center gap-2 md:mb-2 text-xs! md:text-sm! lg:text-base!">
              <Link className="h-4 w-4" />
              URL
            </FieldLabel>
            <Input
              id="url"
              type="text"
              placeholder="Example : https://example.com"
              className="text-[10px] md:text-xs lg:text-sm h-10 md:h-12 bg-transparent border-neutral-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Field>
        ) : (
          <Field>
            <FieldLabel htmlFor="phone" className="flex items-center gap-2 md:mb-2 text-xs! md:text-sm! lg:text-base!">
              <Phone className="h-4 w-4" />
              Sender Phone Number
            </FieldLabel>
            <Input
              id="phone"
              type="text"
              placeholder="Example : +62 812 3456 7890"
              className="text-[10px] md:text-xs lg:text-sm h-10 md:h-12 bg-transparent border-neutral-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Field>
        )}
      </div>

      {/* Full Message Text */}
      <FieldSet className="mb-5 w-full">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="message" className="flex items-center gap-2 md:mb-2 text-xs! md:text-sm! lg:text-base!">
              <MessageSquareMore className="h-4 w-4" />
              Full Message Text
            </FieldLabel>
            <Textarea
              id="message"
              placeholder="Copy and paste the text of the suspicious message here"
              rows={4}
              maxLength={1000}
              className="text-[10px] md:text-xs lg:text-sm resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <FieldDescription className="text-[10px] md:text-xs lg:text-sm">{message.length}/1000 characters.</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>

      <p className="text-base lg:text-lg self-start mb-3">Context Details</p>

      {/* Checkbox source message */}
      <FieldSet className="mb-5 w-full">
        <div className="flex items-baseline gap-1 w-full">
          <FieldLegend variant="label" className="mb-0 text-xs! md:text-sm! lg:text-base!">
            Where did you receive this message?
          </FieldLegend>
          <FieldDescription className="mb-0 text-xs md:text-sm lg:text-base">*(Select one)</FieldDescription>
        </div>
        <FieldGroup className="flex flex-row gap-4 md:gap-8">
          {(["sms", "whatsapp", "email", "web"] as ResourceOption[]).map((opt) => (
            <Field key={opt} orientation="horizontal" className="w-fit">
              <Checkbox
                id={opt}
                name={opt}
                checked={resource === opt}
                onCheckedChange={(checked) => setResource(checked ? opt : "")}
                className="size-3 md:size-4 [&>span>svg]:size-2.5 md:[&>span>svg]:size-3.5"
              />
              <FieldLabel htmlFor={opt} className="text-xs md:text-sm capitalize">
                {opt === "sms" ? "SMS" : opt.charAt(0).toUpperCase() + opt.slice(1)}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      </FieldSet>

      {/* Brief Description */}
      <FieldSet className="w-full">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="description" className="text-xs md:text-sm lg:text-base">
              Brief Description (Optional)
            </FieldLabel>
            <Textarea
              id="description"
              placeholder="Please briefly describe when and how you received this message"
              rows={4}
              className="text-[10px] md:text-xs lg:text-sm resize-none min-h-8 md:min-h-14"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* Stay Anonymous */}
      <div className="w-full mb-8 md:mb-3 lg:mb-8">
        <FieldGroup className="w-full">
          <Field orientation="horizontal" className="w-full flex items-center border border-neutral-500 p-4 rounded-lg gap-2 md:gap-3">
            <Checkbox
              id="anonymous"
              name="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(!!checked)}
              className="size-3 md:size-4 [&>span>svg]:size-2.5 md:[&>span>svg]:size-3.5"
            />
            <FieldContent className="flex flex-row items-center justify-between w-full">
              <FieldLabel htmlFor="anonymous" className="text-[10px] md:text-xs lg:text-sm font-medium">
                Stay Anonymous
              </FieldLabel>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Info className="h-4 w-4" />
                <FieldDescription className="mt-0 text-[10px] md:text-xs lg:text-sm">Uncheck to login &amp; track status</FieldDescription>
              </div>
            </FieldContent>
          </Field>
        </FieldGroup>
      </div>

      <div className="w-1/2">
        <Button
          className="w-full bg-red-900! hover:bg-red-800! text-white! py-5 lg:py-6 text-xs md:text-sm lg:text-lg font-semibold rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit & Analyze"}
        </Button>
      </div>
    </div>
  );
}
