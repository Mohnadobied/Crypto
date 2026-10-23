"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

import { sendQuestion } from "@/app/[locale]/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  questionSchema,
  type QuestionErrorKey,
  type QuestionInput,
} from "@/lib/schemas/question";
import { cn } from "@/lib/utils";

const fieldClass = "h-10 bg-white/[0.04] text-sm";

export function AskQuestionDialog({ trigger }: { trigger: string }) {
  const t = useTranslations("Question");
  const id = useId();
  const [sentTo, setSentTo] = useState<string | null>(null);

  const form = useForm<QuestionInput>({
    resolver: zodResolver(questionSchema),
    defaultValues: { name: "", email: "", question: "" },
  });
  const { errors, isSubmitting } = form.formState;

  const errorText = (key: string | undefined) =>
    key ? t(`errors.${key as QuestionErrorKey}`) : null;

  async function onSubmit(values: QuestionInput) {
    try {
      const result = await sendQuestion(values);
      if (!result.ok) throw new Error("rejected");
      setSentTo(values.email);
    } catch {
      form.setError("root", { message: "server" });
    }
  }

  function onOpenChange(open: boolean) {
    if (open) return;
    // Clear after the close animation so the content doesn't jump.
    setTimeout(() => {
      form.reset();
      setSentTo(null);
    }, 200);
  }

  const fields = [
    { name: "name", type: "text", autoComplete: "name" },
    { name: "email", type: "email", autoComplete: "email" },
  ] as const;

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger className="rounded-sm text-sm text-chalk/80 underline-offset-4 transition-colors hover:text-lime hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
        {trigger}
      </DialogTrigger>
      <DialogContent className="gap-6 border border-line p-6 sm:max-w-md">
        {sentTo ? (
          <div className="flex flex-col items-start gap-3 py-2">
            <CircleCheckIcon className="size-8 text-lime" />
            <DialogTitle className="text-lg font-semibold">{t("sentTitle")}</DialogTitle>
            <DialogDescription>{t("sentBody", { email: sentTo })}</DialogDescription>
            <DialogClose className={cn(buttonVariants(), "mt-3 h-10 rounded-md px-5 font-medium")}>
              {t("close")}
            </DialogClose>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">{t("title")}</DialogTitle>
              <DialogDescription>{t("description")}</DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              {fields.map((field) => {
                const error = errorText(errors[field.name]?.message);
                return (
                  <div key={field.name} className="flex flex-col gap-2">
                    <Label htmlFor={`${id}-${field.name}`}>{t(field.name)}</Label>
                    <Input
                      id={`${id}-${field.name}`}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      aria-invalid={!!error}
                      aria-describedby={error ? `${id}-${field.name}-error` : undefined}
                      className={fieldClass}
                      {...form.register(field.name)}
                    />
                    {error && (
                      <p id={`${id}-${field.name}-error`} className="text-xs text-destructive">
                        {error}
                      </p>
                    )}
                  </div>
                );
              })}

              <div className="flex flex-col gap-2">
                <Label htmlFor={`${id}-question`}>{t("question")}</Label>
                <Textarea
                  id={`${id}-question`}
                  rows={4}
                  placeholder={t("questionPlaceholder")}
                  aria-invalid={!!errors.question}
                  aria-describedby={errors.question ? `${id}-question-error` : undefined}
                  className="min-h-28 bg-white/[0.04] text-sm"
                  {...form.register("question")}
                />
                {errors.question && (
                  <p id={`${id}-question-error`} className="text-xs text-destructive">
                    {errorText(errors.question.message)}
                  </p>
                )}
              </div>

              {errors.root && (
                <p role="alert" className="text-sm text-destructive">
                  {errorText(errors.root.message)}
                </p>
              )}

              <Button type="submit" disabled={isSubmitting} className="mt-2 h-11 rounded-md font-medium">
                {isSubmitting ? t("sending") : t("submit")}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
