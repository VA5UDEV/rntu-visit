"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PURPOSE_OPTIONS = [
  { value: "academic", label: "Academic Visit" },
  { value: "research", label: "Research Collaboration" },
  { value: "conference", label: "Conference / Seminar" },
  { value: "recruitment", label: "Recruitment" },
  { value: "meeting", label: "Official Meeting" },
  { value: "event", label: "Campus Event" },
  { value: "tour", label: "Campus Tour" },
  { value: "other", label: "Other" },
];

const DESIGNATION_OPTIONS = [
  { value: "student", label: "Student" },
  { value: "faculty", label: "Faculty" },
  { value: "professor", label: "Professor" },
  { value: "researcher", label: "Researcher" },
  { value: "industry_professional", label: "Industry Professional" },
  { value: "official", label: "Government Official" },
  { value: "visitor", label: "Visitor" },
  { value: "other", label: "Other" },
];

// Tiny helper for consistent field wrappers
function FieldWrapper({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function OnboardingForm() {
  const router = useRouter();

  const createVisitor = useMutation(
    trpc.visitor.create.mutationOptions({
      onSuccess: () => {
        toast.success("Registration successful!");
        router.push("/locator");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to register");
      },
    }),
  );

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      purpose: "",
      organization: "",
      designation: "",
    },
    onSubmit: async ({ value }) => {
      createVisitor.mutate(value);
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        phone: z
          .string()
          .regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"),
        purpose: z.string().min(1, "Please select a purpose"),
        organization: z
          .string()
          .min(2, "Organization must be at least 2 characters"),
        designation: z.string().min(1, "Please select a designation"),
      }),
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <form.Field name="name">
          {(field) => (
            <FieldWrapper
              label="Full Name"
              required
              error={field.state.meta.errors[0]?.message}
            >
              <Input
                id={field.name}
                name={field.name}
                placeholder="Jane Smith"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={cn(
                  "bg-muted/30 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary/40",
                  field.state.meta.errors.length && "border-destructive/60",
                )}
              />
            </FieldWrapper>
          )}
        </form.Field>

        <form.Field name="phone">
          {(field) => (
            <FieldWrapper
              label="Phone Number"
              required
              error={field.state.meta.errors[0]?.message}
            >
              <Input
                id={field.name}
                name={field.name}
                type="tel"
                placeholder="+91 9XXXXXXXXX"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={cn(
                  "bg-muted/30 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary/40",
                  field.state.meta.errors.length && "border-destructive/60",
                )}
              />
            </FieldWrapper>
          )}
        </form.Field>
      </div>

      {/* Organization */}
      <form.Field name="organization">
        {(field) => (
          <FieldWrapper
            label="Organization / Institute"
            required
            error={field.state.meta.errors[0]?.message}
          >
            <Input
              id={field.name}
              name={field.name}
              placeholder="Enter your organization"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                "bg-muted/30 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary/40",
                field.state.meta.errors.length && "border-destructive/60",
              )}
            />
          </FieldWrapper>
        )}
      </form.Field>

      {/* Row 2: Designation + Purpose */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <form.Field name="designation">
          {(field) => (
            <FieldWrapper
              label="Designation"
              required
              error={field.state.meta.errors[0]?.message}
            >
              <Select
                value={field.state.value}
                onValueChange={(v) => field.handleChange(v)}
              >
                <SelectTrigger
                  id={field.name}
                  className="bg-muted/30 border-muted-foreground/20"
                >
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {DESIGNATION_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldWrapper>
          )}
        </form.Field>

        <form.Field name="purpose">
          {(field) => (
            <FieldWrapper
              label="Purpose of Visit"
              required
              error={field.state.meta.errors[0]?.message}
            >
              <Select
                value={field.state.value}
                onValueChange={(v) => field.handleChange(v)}
              >
                <SelectTrigger
                  id={field.name}
                  className="bg-muted/30 border-muted-foreground/20"
                >
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {PURPOSE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldWrapper>
          )}
        </form.Field>
      </div>

      <Separator className="opacity-40" />

      {/* Submit */}
      <form.Subscribe>
        {(state) => (
          <Button
            type="submit"
            className="w-full h-10 text-sm font-medium"
            disabled={
              !state.canSubmit || state.isSubmitting || createVisitor.isPending
            }
          >
            {state.isSubmitting || createVisitor.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting…
              </>
            ) : (
              "Complete Registration"
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
