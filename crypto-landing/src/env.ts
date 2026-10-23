import { z } from "zod";

// Validated once at startup so a missing or malformed variable fails loudly.
const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
  SUPPORT_EMAIL: z.email().default("support@example.com"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
});
