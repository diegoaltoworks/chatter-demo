# Chatter Demo

> A complete demo implementation of the [Chatter](https://github.com/diegoaltoworks/chatter) AI chatbot framework, showing how to build a self-hosted AI assistant with RAG capabilities.

This repository demonstrates how to:
- Configure a Chatter-based chatbot
- Set up RAG (Retrieval-Augmented Generation) with custom knowledge
- Customize bot personality and behavior
- Deploy chat widgets to your website
- Use both public and private authentication modes

## 🎯 What is This?

This is a **working example** of a chatbot built with the [Chatter framework](https://github.com/diegoaltoworks/chatter). It's designed to help you understand how to:

1. **Configure** your bot's identity and branding
2. **Customize** the AI's personality through prompts
3. **Build** a knowledge base using markdown files
4. **Deploy** embeddable chat widgets
5. **Implement** both public and private chat modes

## ⚠️ Important: Server Setup Required

**The demos in this repository require running the Chatter server locally.** The chat widgets won't work without it.

Before exploring the demos:
1. Follow the [Quick Start](#quick-start) guide below to set up the server
2. Keep the server running with `bun run dev`
3. Then visit http://localhost:8181 to see the demos

The server provides:
- `/chatter.js` and `/chatter.css` - Chat widget assets
- `/api/public/chat` - Chat API endpoint
- `/api/demo/session` - Demo session management
- Static file serving for the demo pages

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) (v1.0+)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Turso database ([Free tier at turso.tech](https://turso.tech))

### Installation

```bash
# Clone the repository
git clone https://github.com/diegoaltoworks/chatter-demo.git
cd chatter-demo

# Install dependencies
bun install

# Copy environment template
cp .env.sample .env

# Edit .env and add your API keys
nano .env
```

### Configuration

The entire bot is configured through the `/config` directory:

```
config/
├── bot.json              # Bot identity & branding
├── prompts/              # AI personality & behavior
│   ├── base.txt
│   ├── public.txt
│   └── private.txt
└── knowledge/            # RAG knowledge base (markdown)
    ├── base/             # Shared knowledge
    ├── public/           # Customer-facing
    └── private/          # Internal only
```

**To customize your bot:**

1. Edit `config/bot.json` - Change name, branding, colors
2. Edit `config/prompts/*.txt` - Adjust AI personality
3. Add your own markdown files to `config/knowledge/`

See [`config/README.md`](./config/README.md) for detailed documentation.

### Run Development Server

```bash
bun run dev
```

Visit [http://localhost:8181](http://localhost:8181) to see the demo!

## 📚 Project Structure

```
chatter-demo/
├── config/               # Bot configuration (CUSTOMIZE THIS)
│   ├── bot.json         # Identity & branding
│   ├── prompts/         # AI behavior
│   └── knowledge/       # RAG content
├── src/                 # Application code
│   ├── index.ts         # Entry point
│   ├── config.ts        # Config loader
│   └── env.ts           # Environment validation
├── public/              # Static files & demos
│   ├── index.html       # Landing page
│   └── demo/            # Widget examples
├── .env.sample          # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Customization Guide

### 1. Bot Identity

Edit `config/bot.json`:

```json
{
  "bot": {
    "name": "MyBot",
    "personName": "My Company",
    "publicUrl": "https://bot.example.com",
    "description": "AI assistant for My Company"
  },
  "branding": {
    "publicPrimaryColor": "#2563eb",
    "privatePrimaryColor": "#7c3aed"
  }
}
```

### 2. Bot Personality

Edit files in `config/prompts/`:

- **`base.txt`** - Core rules applied to all chats
- **`public.txt`** - Tone for customer interactions
- **`private.txt`** - Tone for internal users

Template variables available:
- `{{botName}}` - Your bot's name
- `{{personName}}` - Company/person name
- `{{personFirstName}}` - First name only

### 3. Knowledge Base

Add markdown files to `config/knowledge/`:

```
knowledge/
├── base/           # Shared across public & private
│   └── about.md
├── public/         # Public chat only
│   ├── faqs.md
│   └── pricing.md
└── private/        # Private chat only (requires JWT)
    └── runbook.md
```

**How it works:**
1. On startup, all `.md` files are chunked (~900 chars)
2. Chunks are embedded using OpenAI
3. Embeddings are stored in Turso vector database
4. On query, relevant chunks are retrieved via cosine similarity
5. Context is passed to GPT-4 for response generation

## 🔧 Environment Variables

Required variables in `.env`:

```bash
# OpenAI API (required)
OPENAI_API_KEY=sk-...

# Turso Database (required)
TURSO_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=...

# Server
PORT=8181

# API Key Secret (for creating demo keys)
CHATBOT_SECRET=your-secret-hex-string

# JWT Auth (optional, for private chat)
JWT_JWKS_URL=https://auth.example.com/.well-known/jwks.json
JWT_ISSUER=https://auth.example.com/
JWT_AUDIENCE=bot.example.com

# Clerk (optional, for private chat UI)
CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_FRONTEND_URL=https://clerk.example.com

# Rate Limits
RATE_LIMIT_RPM_PUBLIC=60
RATE_LIMIT_RPM_PRIVATE=120
```

See [`.env.sample`](./.env.sample) for full documentation.

## 🧪 Demo Pages

The demo includes several example implementations:

- **`/`** - Landing page with feature overview
- **`/demo/widget-inline-public.html`** - Full-page inline chat
- **`/demo/widget-button-public.html`** - Floating chat button

Each demo shows how to:
1. Load the Chatter client library
2. Create a session key (for demo purposes)
3. Initialize the chat widget
4. Handle authentication

## 📖 How It Works

### Architecture

```
┌─────────────┐
│   Browser   │
│  (Widget)   │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────┐
│   Chatter   │◄─── config/bot.json
│   Server    │◄─── config/prompts/
│   (Hono)    │◄─── config/knowledge/
└──────┬──────┘
       │
       ├──────► OpenAI (GPT-4 + Embeddings)
       │
       └──────► Turso (Vector DB)
```

### Request Flow

1. User sends message via chat widget
2. Server embeds the query using OpenAI
3. Relevant knowledge chunks are retrieved from Turso
4. System prompt + context + user message → GPT-4
5. Response is streamed back to the client
6. Client displays the message in real-time

## 🔒 Authentication Modes

Chatter supports two authentication modes:

### Public Mode
- API key authentication (JWT-based)
- Rate limited by IP address
- Access to `base/` + `public/` knowledge
- Use for: Customer support, public websites

### Private Mode
- JWT authentication (JWKS or PEM)
- Rate limited by JWT subject
- Access to `base/` + `private/` knowledge
- Use for: Internal tools, authenticated users

## 🚢 Deployment

### ⚠️ Platform Requirements

**Chatter requires Bun runtime and long-running server processes.**

**❌ NOT Compatible:**
- Vercel, Netlify, AWS Lambda, Cloudflare Workers (serverless platforms)

**✅ Compatible (Any Container Platform):**
- Google Cloud Run, Fly.io, Railway, DigitalOcean App Platform
- AWS ECS/Fargate, Azure Container Apps
- Any VPS with Docker (Ubuntu, Debian, etc.)

**Why:** Chatter uses Bun runtime and needs long-running processes for RAG embeddings, session state, and streaming responses.

### Using Bun Directly

```bash
# Build
bun run build

# Run in production
bun run start
```

### Using Docker

**With Docker Compose (Local/VPS):**

```bash
# Configure environment
cp .env.sample .env
nano .env  # Add your API keys

# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down
```

**With Docker directly:**

```bash
# Build image
docker build -t chatter-demo .

# Run container
docker run -p 8181:8181 --env-file .env chatter-demo
```

### Container Platform Deployment

Deploy the Docker container to any platform that supports long-running containers:

**Examples:**
- **Google Cloud Run** - Generous free tier, auto-scaling
- **Fly.io** - Free tier, simple CLI deployment
- **Railway** - Auto-detects Dockerfile, GitHub integration
- **VPS** - Full control, predictable pricing

See [DEPLOYMENT.md](./DEPLOYMENT.md) for platform-specific instructions and examples.

## 📝 Scripts

- `bun run dev` - Start development server with watch mode
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun test` - Run tests
- `bun run typecheck` - Type checking
- `bun run lint` - Lint code
- `bun run format` - Format code
- `bun run apikey:create` - Generate API keys

## 🤝 Contributing

This is a demo repository showing how to use Chatter. Contributions are welcome!

- **This Demo**: https://github.com/diegoaltoworks/chatter-demo
- **Chatter Framework**: https://github.com/diegoaltoworks/chatter

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🔗 Links

- **This Demo Repository**: https://github.com/diegoaltoworks/chatter-demo
- **Chatter Framework**: https://github.com/diegoaltoworks/chatter
- **Setup Guide**: [SETUP.md](./SETUP.md) - Detailed local setup
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md) - Platform-specific deployment
- **Configuration Guide**: [config/README.md](./config/README.md) - Customization docs

## 💡 Tips

1. **Start simple** - Use the default config first, then customize
2. **Test locally** - Run `bun run dev` before deploying
3. **Monitor costs** - OpenAI embeddings and completions are usage-based
4. **Update incrementally** - The system only re-embeds changed knowledge

## ❓ FAQ

**Q: Can I use this in production?**
A: Yes! This is a complete, production-ready implementation. Just customize the config and deploy.

**Q: Do I need to modify the source code?**
A: No. All customization happens in the `/config` directory. The source code is generic.

**Q: How much does it cost to run?**
A: Main costs are:
- OpenAI API usage (embeddings + completions)
- Turso database (free tier available)
- Hosting (varies by provider)

**Q: Can I self-host everything?**
A: Yes, you can self-host the Chatter server. OpenAI and Turso are external services, but you could swap them for alternatives (see Chatter docs).

**Q: Does it work on Vercel?**
A: No, Vercel doesn't support Bun runtime. Use Google Cloud Run, Fly.io, Railway, or a VPS instead. See [Deployment](#-deployment) section.

## 🙏 Acknowledgments

Built with:
- [Chatter](https://github.com/diegoaltoworks/chatter) - AI chatbot framework
- [Bun](https://bun.sh) - JavaScript runtime
- [Hono](https://hono.dev) - Web framework
- [OpenAI](https://openai.com) - AI models
- [Turso](https://turso.tech) - Vector database
