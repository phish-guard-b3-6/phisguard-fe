import React from "react";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Info, Link, MessageSquareMore, Phone } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface CreateNewReportProps {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateNewReport({ setIsSubmitted }: CreateNewReportProps) {
  return (
    <div className="flex flex-col items-center mb-5 md:gap-2 w-full ">
      {/* URL & Sender Phone Number */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-10 mt-5 lg:mt-8 mb-5 w-full">
        <Field className="flex-1">
          <FieldLabel htmlFor="url" className="flex items-center gap-2 md:mb-2 text-xs! md:text-sm! lg:text-base!">
            <Link className="h-4 w-4" />
            URL
          </FieldLabel>
          <Input
            id="url"
            type="text"
            placeholder="Example : https://example.com"
            className="text-[10px] md:text-xs lg:text-sm h-10 md:h-12 bg-transparent border-neutral-500"
          />
        </Field>
        <Field className="flex-1">
          <FieldLabel htmlFor="phone" className="flex items-center gap-2 md:mb-2 text-xs! md:text-sm! lg:text-base!">
            <Phone className="h-4 w-4" />
            Sender Phone Number
          </FieldLabel>
          <Input
            id="phone"
            type="text"
            placeholder="Example : +62 812 3456 7890"
            className="text-[10px] md:text-xs lg:text-sm h-10 md:h-12 bg-transparent border-neutral-500"
          />
        </Field>
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
              className="text-[10px] md:text-xs lg:text-sm resize-none"
            />
            <FieldDescription className="text-[10px] md:text-xs lg:text-sm">Maximum 1000 characters.</FieldDescription>
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
          <Field orientation="horizontal" className="w-fit">
            <Checkbox id="SMS" name="SMS" defaultChecked className="size-3 md:size-4 [&>span>svg]:size-2.5 md:[&>span>svg]:size-3.5" />
            <FieldLabel htmlFor="SMS" className="text-xs md:text-sm">
              SMS
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="w-fit">
            <Checkbox id="Whatsapp" name="Whatsapp" defaultChecked className="size-3 md:size-4 [&>span>svg]:size-2.5 md:[&>span>svg]:size-3.5" />
            <FieldLabel htmlFor="Whatsapp" className="text-xs md:text-sm">
              Whatsapp
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="w-fit">
            <Checkbox id="Email" name="Email" className="size-3 md:size-4 [&>span>svg]:size-2.5 md:[&>span>svg]:size-3.5" />
            <FieldLabel htmlFor="Email" className="text-xs md:text-sm">
              Email
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="w-fit">
            <Checkbox id="Web" name="Web" className="size-3 md:size-4 [&>span>svg]:size-2.5 md:[&>span>svg]:size-3.5" />
            <FieldLabel htmlFor="Web" className="text-xs md:text-sm">
              Web
            </FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
      {/* Brief Description */}
      <FieldSet className="w-full">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="message" className="text-xs md:text-sm lg:text-base">
              Brief Description (Optional)
            </FieldLabel>
            <Textarea
              id="message"
              placeholder="Please briefly describe when and how you received this message"
              rows={4}
              className="text-[10px] md:text-xs lg:text-sm resize-none min-h-8 md:min-h-14"
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* Checklist anonymus */}
      <div className="w-full mb-8 md:mb-3 lg:mb-8">
        <FieldGroup className="w-full">
          <Field orientation="horizontal" className="w-full flex items-center border border-neutral-500 p-4 rounded-lg gap-2 md:gap-3">
            <Checkbox id="anonymous" name="anonymous" defaultChecked className="size-3 md:size-4 [&>span>svg]:size-2.5 md:[&>span>svg]:size-3.5" />
            <FieldContent className="flex flex-row items-center justify-between w-full">
              <FieldLabel htmlFor="anonymous" className="text-[10px] md:text-xs lg:text-sm font-medium">
                Stay Anonymous
              </FieldLabel>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Info className="h-4 w-4" />
                <FieldDescription className="mt-0 text-[10px] md:text-xs lg:text-sm">Uncheck to login & track status</FieldDescription>
              </div>
            </FieldContent>
          </Field>
        </FieldGroup>
      </div>
      <div className="w-1/2">
        <Button
          className="w-full bg-red-900! hover:bg-red-800! text-white! py-5 lg:py-6 text-xs md:text-sm lg:text-lg font-semibold rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          onClick={() => setIsSubmitted(true)}
        >
          Submit & Analyze
        </Button>
      </div>
    </div>
  );
}
