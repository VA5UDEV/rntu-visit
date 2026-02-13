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
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

const PURPOSE_OPTIONS = [
  { value: "academic", label: "Academic Visit" },
  { value: "research", label: "Research Collaboration" },
  { value: "conference", label: "Conference/Seminar" },
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
      className="space-y-6"
    >
      {/* Name Field */}
      <div>
        <form.Field name="name">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Full Name *</Label>
              <Input
                id={field.name}
                name={field.name}
                placeholder="Enter your full name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-destructive text-sm">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>
      </div>

      {/* Phone Field */}
      <div>
        <form.Field name="phone">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Phone Number *</Label>
              <Input
                id={field.name}
                name={field.name}
                type="tel"
                placeholder="+91 XXXXXXXXXX"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-destructive text-sm">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>
      </div>

      {/* Purpose Field */}
      <div>
        <form.Field name="purpose">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Purpose of Visit *</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Select purpose of visit" />
                </SelectTrigger>
                <SelectContent>
                  {PURPOSE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-destructive text-sm">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>
      </div>

      {/* Organization Field */}
      <div>
        <form.Field name="organization">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Organization/Institute *</Label>
              <Input
                id={field.name}
                name={field.name}
                placeholder="Enter your organization or institute"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-destructive text-sm">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>
      </div>

      {/* Designation Field */}
      <div>
        <form.Field name="designation">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Designation *</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Select your designation" />
                </SelectTrigger>
                <SelectContent>
                  {DESIGNATION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-destructive text-sm">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
        </form.Field>
      </div>

      {/* Submit Button */}
      <form.Subscribe>
        {(state) => (
          <Button
            type="submit"
            className="w-full"
            disabled={
              !state.canSubmit || state.isSubmitting || createVisitor.isPending
            }
          >
            {state.isSubmitting || createVisitor.isPending
              ? "Submitting..."
              : "Complete Registration"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
