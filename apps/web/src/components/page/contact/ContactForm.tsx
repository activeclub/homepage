"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

type Schema = v.InferInput<typeof schema>; // { email: string; password: string }

type Props = {
  sendMessage: (values: Schema) => void;
};

export function ContactForm({ sendMessage }: Props) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>お名前</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input type="email" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>件名</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">送信する</Button>
      </form>
    </Form>
  );
}
