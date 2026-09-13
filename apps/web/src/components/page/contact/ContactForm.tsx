"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import * as v from "valibot";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = v.object({
  username: v.pipe(
    v.string(),
    v.nonEmpty("お名前を入力してください"),
    v.maxLength(50),
  ),
  email: v.pipe(v.string(), v.email("メールアドレスの形式が正しくありません")),
  subject: v.pipe(
    v.string(),
    v.nonEmpty("件名を入力してください"),
    v.maxLength(50),
  ),
  message: v.pipe(
    v.string(),
    v.nonEmpty("本文を入力してください"),
    v.maxLength(500),
  ),
});

export type Schema = v.InferInput<typeof schema>;

type Props = {
  sendMessage: (values: Schema) => void;
};

export function ContactForm({ sendMessage }: Props) {
  const formId = useId();
  const form = useForm<Schema>({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: Schema) {
    sendMessage(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
      <Controller
        control={form.control}
        name="username"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-${field.name}`}>お名前</FieldLabel>
            <Input
              placeholder=""
              {...field}
              id={`${formId}-${field.name}`}
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? `${formId}-${field.name}-error` : undefined
              }
            />
            {fieldState.invalid && (
              <FieldError
                id={`${formId}-${field.name}-error`}
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-${field.name}`}>
              メールアドレス
            </FieldLabel>
            <Input
              type="email"
              placeholder=""
              {...field}
              id={`${formId}-${field.name}`}
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? `${formId}-${field.name}-error` : undefined
              }
            />
            {fieldState.invalid && (
              <FieldError
                id={`${formId}-${field.name}-error`}
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="subject"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-${field.name}`}>件名</FieldLabel>
            <Input
              placeholder=""
              {...field}
              id={`${formId}-${field.name}`}
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? `${formId}-${field.name}-error` : undefined
              }
            />
            {fieldState.invalid && (
              <FieldError
                id={`${formId}-${field.name}-error`}
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="message"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-${field.name}`}>本文</FieldLabel>
            <Textarea
              placeholder=""
              {...field}
              id={`${formId}-${field.name}`}
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? `${formId}-${field.name}-error` : undefined
              }
            />
            {fieldState.invalid && (
              <FieldError
                id={`${formId}-${field.name}-error`}
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
      <Button type="submit">送信する</Button>
    </form>
  );
}
