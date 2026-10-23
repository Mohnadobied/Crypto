"use server";

import { env } from "@/env";
import { questionSchema, type QuestionInput } from "@/lib/schemas/question";

export type SendQuestionResult = { ok: true } | { ok: false };

export async function sendQuestion(
  input: QuestionInput,
): Promise<SendQuestionResult> {
  const parsed = questionSchema.safeParse(input);
  if (!parsed.success) return { ok: false };

  // TODO: forward to your mail provider or help desk.
  console.info(`[question] to ${env.SUPPORT_EMAIL}`, parsed.data);
  return { ok: true };
}
