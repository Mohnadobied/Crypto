import { z } from "zod";

// Error messages are translation keys under Question.errors, so the same
// schema validates on the client and in the server action.
export const questionSchema = z.object({
  name: z.string().trim().min(1, { error: "nameShort" }),
  email: z.email({ error: "emailInvalid" }),
  question: z
    .string()
    .trim()
    .min(10, { error: "questionShort" })
    .max(1000, { error: "questionLong" }),
});

export type QuestionInput = z.infer<typeof questionSchema>;

export type QuestionErrorKey =
  | "nameShort"
  | "emailInvalid"
  | "questionShort"
  | "questionLong"
  | "server";
