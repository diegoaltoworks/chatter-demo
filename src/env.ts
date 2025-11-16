import { z } from "zod";

const isTest = process.env.NODE_ENV === "test";

const schema = z.object({
  OPENAI_API_KEY: isTest ? z.string().optional() : z.string(),
  PORT: z.string().default("8181"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // Auth
  CHATBOT_SECRET: z.string().optional(), // secret for signing/verifying JWT API keys
  JWT_JWKS_URL: z.string().url().optional(), // JWT JWKS URL
  JWT_ISSUER: z.string().optional(),
  JWT_AUDIENCE: z.string().optional(),
  JWT_PUBLIC_KEY_PEM: z.string().optional(), // fallback when no JWKS

  // Clerk (for private chat authentication)
  CLERK_PUBLISHABLE_KEY: z.string().optional(), // Clerk frontend publishable key
  CLERK_SECRET_KEY: z.string().optional(), // Clerk secret key
  CLERK_FRONTEND_URL: z.string().url().optional(), // Custom Clerk domain
  CLERK_JWKS_URL: z.string().url().optional(), // Clerk JWKS URL

  // Rate limits (requests per minute)
  RATE_LIMIT_RPM_PUBLIC: z.coerce.number().default(60),
  RATE_LIMIT_RPM_PRIVATE: z.coerce.number().default(120),

  // Turso / libsql
  TURSO_URL: isTest ? z.string().optional() : z.string(),
  TURSO_AUTH_TOKEN: isTest ? z.string().optional() : z.string(),
});

export const env = schema.parse(process.env);
