"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useRouter } from "next/navigation";

import client from "@/lib/backend/client";

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

const writeFormSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해주세요.")
    .min(2, "제목은 2자 이상이어야 합니다.")
    .max(50, "제목은 50자 이하여야 합니다."),
  content: z
    .string()
    .min(1, "내용을 입력해주세요.")
    .min(2, "내용은 2자 이상이어야 합니다.")
    .max(10_000_000, "내용은 1,000만자 이하여야 합니다."),
});

type WriteFormInputs = z.infer<typeof writeFormSchema>;

export default function ClientPage() {
  const router = useRouter();

  const form = useForm<WriteFormInputs>({
    resolver: zodResolver(writeFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data: WriteFormInputs) => {
    const response = await client.POST("/api/v1/posts", {
      body: {
        title: data.title,
        content: data.content,
      },
    });

    if (response.error) {
      toast.error(response.error.msg);
      return;
    }

    toast(response.data.msg);

    router.replace("/post/list");
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-4">글 작성</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="제목을 입력해주세요"
                    autoComplete="off"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="내용을 입력해주세요"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="mt-2"
          >
            {form.formState.isSubmitting ? "작성 중..." : "작성"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
