import React from "react";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Info, Link, Phone } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface CreateNewReportProps {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateNewReport({ setIsSubmitted }: CreateNewReportProps) {
  return (
    <div className="flex flex-col items-center my-10 gap-3 w-full">
      {/* URL & Sender Phone Number */}
      <div className="flex gap-10 mt-10 mb-5 w-full">
        <Field className="flex-1">
          <FieldLabel htmlFor="url" className="flex items-center gap-2 mb-2">
            <Link className="h-4 w-4" />
            URL
          </FieldLabel>
          <Input id="url" type="text" placeholder="Example : https://example.com" className="h-12 bg-transparent border-neutral-500" />
        </Field>
        <Field className="flex-1">
          <FieldLabel htmlFor="phone" className="flex items-center gap-2 mb-2">
            <Phone className="h-4 w-4" />
            Sender Phone Number
          </FieldLabel>
          <Input id="phone" type="text" placeholder="Example : +62 812 3456 7890" className="h-12 bg-transparent border-neutral-500" />
        </Field>
      </div>
      {/* Full Message Text */}
      <FieldSet className="mb-5 w-full">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="message">Full Message Text</FieldLabel>
            <Textarea id="message" placeholder="Copy and paste the text of the suspicious message here" rows={4} className="resize-none" />
            <FieldDescription>Maximum 1000 characters.</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
      <p className="self-start text-lg font-bold">Context Details</p>
      {/* Checkbox source message */}
      <FieldSet className="mb-5 w-full">
        <div className="flex items-baseline gap-2 w-full">
          <FieldLegend variant="label" className="mb-0">
            Where did you receive this message?{" "}
          </FieldLegend>
          <FieldDescription className="mb-0">Select the items you want to show on the desktop.</FieldDescription>
        </div>
        <FieldGroup className="flex flex-row gap-8">
          <Field orientation="horizontal" className="w-fit">
            <Checkbox id="SMS" name="SMS" defaultChecked />
            <FieldLabel htmlFor="SMS" className="font-normal">
              SMS
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="w-fit">
            <Checkbox id="Whatsapp" name="Whatsapp" defaultChecked />
            <FieldLabel htmlFor="Whatsapp" className="font-normal">
              Whatsapp
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="w-fit">
            <Checkbox id="Email" name="Email" />
            <FieldLabel htmlFor="Email" className="font-normal">
              Email
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="w-fit">
            <Checkbox id="Web" name="Web" />
            <FieldLabel htmlFor="Web" className="font-normal">
              Web
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
      {/* Brief Description */}
      <FieldSet className="w-full">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="message">Brief Description (Optional)</FieldLabel>
            <Textarea id="message" placeholder="Copy and paste the text of the suspicious message here" rows={4} className="resize-none" />
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* Checklist anonymus */}
      <div className="w-full mt-5 mb-20">
        <FieldGroup className="w-full">
          <Field orientation="horizontal" className="w-full flex items-center border border-neutral-500 p-4 rounded-lg">
            <Checkbox id="anonymous" name="anonymous" defaultChecked />
            <FieldContent className="flex flex-row items-center justify-between w-full">
              <FieldLabel htmlFor="anonymous" className="text-base font-medium">
                Stay Anonymous
              </FieldLabel>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Info className="h-4 w-4" />
                <FieldDescription className="mt-0 text-sm">Uncheck to login & track status</FieldDescription>
              </div>
            </FieldContent>
          </Field>
        </FieldGroup>
      </div>
      <div className="w-1/2">
        <Button
          className="w-full bg-red-900! hover:bg-red-800! text-white! py-6 text-lg font-semibold rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          onClick={() => setIsSubmitted(true)}
        >
          Submit & Analyze
        </Button>
      </div>
    </div>
  );
}
