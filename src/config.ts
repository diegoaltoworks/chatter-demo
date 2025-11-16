/**
 * Bot Configuration
 * Loads bot-specific settings from config/bot.json
 * Can be overridden via environment variables for flexibility
 */

import botConfigJson from "../config/bot.json";

export const botConfig = {
  // Bot identity
  name: process.env.BOT_NAME || botConfigJson.bot.name,
  personName: process.env.PERSON_NAME || botConfigJson.bot.personName,
  publicUrl: process.env.BOT_PUBLIC_URL || botConfigJson.bot.publicUrl,
  description: process.env.BOT_DESCRIPTION || botConfigJson.bot.description,

  // Branding
  branding: {
    publicPrimaryColor: botConfigJson.branding.publicPrimaryColor,
    privatePrimaryColor: botConfigJson.branding.privatePrimaryColor,
  },

  // Chat UI defaults
  chat: {
    publicTitle: botConfigJson.chat.publicTitle,
    publicSubtitle: botConfigJson.chat.publicSubtitle,
    privateTitle: botConfigJson.chat.privateTitle,
    privateSubtitle: botConfigJson.chat.privateSubtitle,
  },
} as const;
