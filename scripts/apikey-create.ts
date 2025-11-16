#!/usr/bin/env bun
/**
 * Chatter Demo API Key Generator
 *
 * This script uses the Chatter ApiKeyManager to create API keys for public chat access.
 */

import { ApiKeyManager } from "@diegoaltoworks/chatter";

// Load environment variables
import "../src/env";
import { env } from "../src/env";

async function createApiKey() {
  // Check for CHATBOT_SECRET
  if (!env.CHATBOT_SECRET) {
    console.error("❌ Error: CHATBOT_SECRET environment variable is not set");
    console.error("   Please set it in your .env file:");
    console.error("   CHATBOT_SECRET=your-secret-key-here");
    console.error("\n   You can generate one with:");
    console.error("   openssl rand -hex 32");
    process.exit(1);
  }

  // Parse command line arguments
  const args = process.argv.slice(2);
  const options: { name?: string; expiresIn?: string } = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--name" && args[i + 1]) {
      options.name = args[i + 1];
      i++;
    } else if (args[i] === "--expires-in" && args[i + 1]) {
      options.expiresIn = args[i + 1];
      i++;
    }
  }

  // Create API key manager
  const manager = new ApiKeyManager(env.CHATBOT_SECRET);

  // Default values
  const keyName = options.name || "api-key";
  const expiresIn = options.expiresIn || "365d";

  // Create the API key
  const jwt = await manager.create({
    name: keyName,
    expiresIn,
  });

  // Decode to show details
  const payload = manager.decode(jwt);
  if (!payload) {
    console.error("❌ Failed to decode generated API key");
    process.exit(1);
  }

  const expiresAt = new Date((payload.exp || 0) * 1000);

  // Output the result
  console.log("\n✅ API Key generated successfully!\n");
  console.log(`   Name:       ${keyName}`);
  console.log(`   ID:         ${payload.sub}`);
  console.log(`   Expires:    ${expiresAt.toISOString()} (${expiresIn})`);
  console.log(`\n   API Key:\n   ${jwt}\n`);
  console.log("   Usage in JavaScript:\n");
  console.log("   new Chatter.ChatButton({");
  console.log("     host: 'your-server.com',");
  console.log("     mode: 'public',");
  console.log(`     apiKey: '${jwt.slice(0, 40)}...',`);
  console.log("     // ... other config");
  console.log("   });");
  console.log("");
  console.log("   Usage with curl:\n");
  console.log("   curl -X POST http://localhost:8181/api/public/chat \\");
  console.log(`     -H "x-api-key: ${jwt.slice(0, 50)}..." \\`);
  console.log(`     -H "Content-Type: application/json" \\`);
  console.log(`     -d '{"message": "Hello"}'\n`);
}

// Run
createApiKey().catch((error) => {
  console.error("❌ Error creating API key:", error);
  process.exit(1);
});
