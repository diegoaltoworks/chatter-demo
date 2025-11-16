/**
 * Chatter Demo - AI chatbot implementation using Chatter framework
 *
 * This is the main entry point for the demo chatbot, which uses the Chatter framework
 * to provide both public and private AI chat interfaces.
 */

import type { ChatterConfig } from "@diegoaltoworks/chatter";
import { createServer } from "@diegoaltoworks/chatter";
import { botConfig } from "./config";
import { env } from "./env";

async function start() {
  console.log("🤖 Starting Chatter Demo...");

  // Build Chatter configuration from environment and bot config
  const config: ChatterConfig = {
    // Bot identity
    bot: {
      name: botConfig.name,
      personName: botConfig.personName,
      publicUrl: botConfig.publicUrl,
      description: botConfig.description,
    },

    // Branding
    branding: {
      publicPrimaryColor: botConfig.branding.publicPrimaryColor,
      privatePrimaryColor: botConfig.branding.privatePrimaryColor,
    },

    // Chat UI
    chat: {
      publicTitle: botConfig.chat.publicTitle,
      publicSubtitle: botConfig.chat.publicSubtitle,
      privateTitle: botConfig.chat.privateTitle,
      privateSubtitle: botConfig.chat.privateSubtitle,
    },

    // Paths
    knowledgeDir: "./config/knowledge",
    promptsDir: "./config/prompts",
    publicDir: "./public",

    // OpenAI
    openai: {
      apiKey: env.OPENAI_API_KEY || "",
    },

    // Database
    database: {
      url: env.TURSO_URL || "",
      authToken: env.TURSO_AUTH_TOKEN || "",
    },

    // Auth
    auth: {
      secret: env.CHATBOT_SECRET, // JWT API key secret
      jwt: {
        jwksUrl: env.JWT_JWKS_URL || env.CLERK_JWKS_URL,
        issuer: env.JWT_ISSUER,
        audience: env.JWT_AUDIENCE,
        publicKeyPem: env.JWT_PUBLIC_KEY_PEM,
      },
      clerk: {
        publishableKey: env.CLERK_PUBLISHABLE_KEY,
        frontendUrl: env.CLERK_FRONTEND_URL,
      },
    },

    // Features
    features: {
      enablePublicChat: true,
      enablePrivateChat: true,
      enableDemoRoutes: true, // Secured with origin checking and rate limiting
    },

    // Rate limits
    rateLimit: {
      public: env.RATE_LIMIT_RPM_PUBLIC,
      private: env.RATE_LIMIT_RPM_PRIVATE,
    },

    // Server
    server: {
      port: Number(env.PORT),
      cors: true,
    },
  };

  // Create server using Chatter
  const app = await createServer(config);

  // Start Bun server
  return Bun.serve({
    port: config.server?.port || 8181,
    fetch: app.fetch,
  });
}

start()
  .then(() => console.log(`✅ Server started on port ${process.env.PORT || 8181}`))
  .catch((e) => {
    console.error("❌ Failed to start server:", e);
    process.exit(1);
  });
