# Getting Started with Chatter

Chatter is an embeddable AI chatbot framework that makes it easy to add conversational AI to your website or application.

## Key Features

- **RAG (Retrieval-Augmented Generation)**: Automatically finds relevant information from your knowledge base
- **Multi-mode Authentication**: Support for API keys, JWT tokens, and Clerk integration
- **Embeddable Widgets**: Ready-to-use chat UI components
- **Streaming Responses**: Real-time AI responses via Server-Sent Events

## Quick Start

1. Clone the repository
2. Install dependencies with `bun install`
3. Configure your bot in `config/bot.json`
4. Add your knowledge base to `config/knowledge/`
5. Set up environment variables in `.env`
6. Run with `bun run dev`

## Configuration

All bot customization happens in the `/config` directory:
- `bot.json` - Bot identity and branding
- `prompts/` - System prompts that define bot behavior
- `knowledge/` - Markdown files that become the RAG knowledge base
