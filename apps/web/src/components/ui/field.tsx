"use client";

import type * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// The vertical Field parts used by this app, following shadcn/ui's Base UI registry.
function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: shadcn Field groups one labelled control; fieldsets are for groups of controls.
    <div
      role="group"
      data-slot="field"
      className={cn("group/field space-y-2", className)}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group-data-[invalid=true]/field:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const messages = [
    ...new Set(errors?.map((error) => error?.message).filter(Boolean)),
  ];
  const content =
    children ??
    (messages.length === 1 ? (
      messages[0]
    ) : messages.length > 1 ? (
      <ul className="ml-4 list-disc">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    ) : null);
  if (!content) return null;
  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  );
}

export { Field, FieldError, FieldLabel };
