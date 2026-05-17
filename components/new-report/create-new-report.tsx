"use client";

import React, { useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Info, Link, MessageSquareMore, Phone } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CreateReportPayload, ResourceOption, ReportType } from "@/lib/types/report";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateNewReportProps {
  onSubmitSuccess: (reportId: string) => void;
}

export default function CreateNewReport({ onSubmitSuccess }: CreateNewReportProps) {
  // ── Form state ──────────────────────────────────────────────────────────────
  const [reportType, setReportType] = useState<ReportType | null>(null);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [resource, setResource] = useState<ResourceOption | "">("");
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);

  const queryClient = useQueryClient();

  // ── Mutation ────────────────────────────────────────────────────────────────
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
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast.success("Laporan berhasil dikirim!", {
        description: "Tim kami akan segera menindaklanjuti laporan Anda.",
      });
      onSubmitSuccess(data?.reports?.id ?? "");
    },
    onError: (err: unknown) => {
      const msg = (err as Error)?.message ?? "Terjadi kesalahan, coba lagi nanti.";
      toast.error("Gagal mengirim laporan", { description: msg });
    },
  });

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleSelectType = (type: ReportType) => {
    setReportType((prev) => {
      if (prev === type) {
        setValue("");
        return null;
      }
      setValue("");
      return type;
    });
  };

  function handleSubmit() {
    if (!reportType) {
      toast.error("Pilih tipe laporan terlebih dahulu.");
      return;
    }
    if (!resource) {
      toast.error("Pilih sumber pesan terlebih dahulu.");
      return;
    }

    createReportMutation({
      message,
      value,
      type: reportType,
      resource,
      description,
      is_anonymous: isAnonymous,
    });
  }

  return (
    <div className="flex flex-col items-center w-full">

      {/* Scan icon + Heading (mobile only) */}
      <div className="flex flex-col items-center md:hidden">
        <img src="/icon/scan.svg" alt="Scan icon" className="w-32 h-auto" />
        <p className="text-large font-medium text-center text-black">
          Scan for Phishing and Fraud
        </p>
        <p className="text-xs font-light text-center text-black mt-1 mb-7 px-4">
          Paste any suspicious URL, phone number, or message below. Our AI engine will analyze the risk instantly.
        </p>
      </div>

      {/* Report Type Selection + Input Field */}
      <div className="w-full md:mt-8 lg:mt-8">
        <p className="text-sm md:text-base text-xs! md:text-sm! lg:text-base! font-medium mt-0 mb-2">
          What do you want to report?
        </p>

        <div className="flex flex-wrap w-full gap-x-4 gap-y-0">

          {/* Suspicious Link/URL Button */}
          <button
            type="button"
            onClick={() => handleSelectType("url")}
            className={`relative min-w-[200px] mt-0 mb-3 flex-1 flex items-center justify-center gap-2 px-4 h-10 md:h-12 rounded-md border transition-all cursor-pointer ${
              reportType === "url"
                ? "border-red-700 bg-red-50 text-red-800 shadow-[0_0_7px_3px_rgba(185,28,28,0.4)]"
                : "border-neutral-500 bg-transparent text-neutral-600 hover:border-neutral-600"
            }`}
          >
            <Link className={`h-4 w-4 md:h-5 md:w-5 ${reportType === "url" ? "text-red-700" : "text-neutral-500"}`} />
            <span className="text-xs md:text-sm font-medium">Suspicious Link/URL</span>
            {reportType === "url" && (
              <span className="absolute top-1 right-1">
                <img src="/icon/checkbox.svg" alt="selected" className="h-4 w-4" />
              </span>
            )}
          </button>

          {/* Sender Phone Number Button */}
          <button
            type="button"
            onClick={() => handleSelectType("phone")}
            className={`relative min-w-[200px] mt-0 mb-3 flex-1 flex items-center justify-center gap-2 px-4 h-10 md:h-12 rounded-md border transition-all cursor-pointer ${
              reportType === "phone"
                ? "border-red-700 bg-red-50 text-red-800 shadow-[0_0_7px_3px_rgba(185,28,28,0.4)]"
                : "border-neutral-500 bg-transparent text-neutral-600 hover:border-neutral-600"
            }`}
          >
            <Phone className={`h-4 w-4 md:h-5 md:w-5 ${reportType === "phone" ? "text-red-700" : "text-neutral-500"}`} />
            <span className="text-xs md:text-sm font-medium">Sender Phone Number</span>
            {reportType === "phone" && (
              <span className="absolute top-1 right-1">
                <img src="/icon/checkbox.svg" alt="selected" className="h-4 w-4" />
              </span>
            )}
          </button>

          {/* Separator (only visible when a type is selected) */}
          {reportType && <div className="basis-full h-3" />}

          {/* Conditional Input (only visible when a type is selected) */}
          {reportType && (
            <div className="min-w-[200px] flex-1">
              {reportType === "url" ? (
                <Field>
                  <FieldLabel
                    htmlFor="url"
                    className="flex items-center gap-2 text-xs! md:text-sm! lg:text-base! select-text cursor-text"
                  >
                    <Link className="h-4 w-4" />
                    URL
                  </FieldLabel>
                  <Input
                    id="url"
                    type="text"
                    placeholder="Example : https://example.com"
                    className="text-[10px] md:text-xs lg:text-sm h-10 md:h-12 bg-transparent border-neutral-500 mt-0 mb-3"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </Field>
              ) : (
                <Field>
                  <FieldLabel
                    htmlFor="phone"
                    className="flex items-center gap-2 text-xs! md:text-sm! lg:text-base! select-text cursor-text"
                  >
                    <Phone className="h-4 w-4" />
                    Sender Phone Number
                  </FieldLabel>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="Example : +62 812 3456 7890"
                    className="text-[10px] md:text-xs lg:text-sm h-10 md:h-12 bg-transparent border-neutral-500 mt-0 mb-3"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </Field>
              )}
            </div>
          )}

          {/* Spacer (to keep grid balanced) */}
          {reportType && <div className="min-w-[200px] flex-1" />}

        </div>
      </div>

      {/* Full Message Text */}
      <FieldSet className="w-full">
        <FieldGroup>
          <Field>
            <FieldLabel
              htmlFor="message"
              className="flex items-center gap-2 text-xs! md:text-sm! lg:text-base! select-text cursor-text mt-3 mb-0"
            >
              <MessageSquareMore className="h-4 w-4" />
              Full Message Text
            </FieldLabel>
            <Textarea
              id="message"
              placeholder="Copy and paste the text of the suspicious message here"
              rows={4}
              maxLength={1000}
              className="text-[10px] md:text-xs lg:text-sm resize-none border-neutral-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <FieldDescription className="text-[10px] md:text-xs lg:text-sm mt-0 mb-5">
              {message.length}/1000 characters.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>

      <p className="mt-0 mb-0 text-base lg:text-lg self-start">Context Details</p>

      {/* Checkbox Source Message (single select) */}
      <FieldSet className="w-full">
        <div className="flex items-baseline gap-1 w-full">
          <FieldLegend variant="label" className="mt-5 mb-0 text-xs! md:text-sm! lg:text-base!">
            Where did you receive this message?
          </FieldLegend>
          <FieldDescription className="text-xs md:text-sm lg:text-base">
            *(Select one)
          </FieldDescription>
        </div>
        <FieldGroup className="flex flex-row flex-wrap gap-4 md:gap-8 mt-0 mb-5">
          {(["sms", "whatsapp", "email", "web"] as ResourceOption[]).map((opt) => (
            <Field key={opt} orientation="horizontal" className="w-fit">
              <Checkbox
                id={opt}
                name={opt}
                checked={resource === opt}
                onCheckedChange={(checked) => setResource(checked ? opt : "")}
                className="size-3 md:size-4 [&>span>svg]:size-2.5 md:[&>span>svg]:size-3.5 border-neutral-500"
              />
              <FieldLabel htmlFor={opt} className="text-xs md:text-sm">
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
            <FieldLabel
              htmlFor="description"
              className="text-xs md:text-sm lg:text-base select-text cursor-text mt-2 mb-0"
            >
              Brief Description (Optional)
            </FieldLabel>
            <Textarea
              id="description"
              placeholder="Please briefly describe when and how you received this message"
              rows={4}
              className="text-[10px] md:text-xs lg:text-sm resize-none mt-0 mb-3 min-h-8 md:min-h-14 border-neutral-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* Stay Anonymous */}
      <div className="w-full">
        <div className="w-full mt-0 mb-8 flex items-center border border-neutral-500 bg-transparent p-4 rounded-lg gap-2 md:gap-3">
          <Checkbox
            id="anonymous"
            name="anonymous"
            checked={isAnonymous}
            onCheckedChange={(checked) => setIsAnonymous(!!checked)}
            className="size-3 md:size-4 [&>span>svg]:size-2.5 md:[&>span>svg]:size-3.5 border-neutral-500"
          />
          <div className="flex flex-row items-center justify-between w-full">
            <label htmlFor="anonymous" className="text-[10px] md:text-xs lg:text-sm font-medium cursor-pointer">
              Stay Anonymous
            </label>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Info className="h-4 w-4" />
              <p className="text-[10px] md:text-xs lg:text-sm">
                Uncheck to login &amp; track status
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 min-w-[130px] mt-0 mb-4">
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