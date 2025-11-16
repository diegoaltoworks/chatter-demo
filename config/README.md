# Configuration Directory

**This is the ONLY directory you need to customize when using Chatter.**

Everything in `/config` defines your bot's identity, behavior, and knowledge. The rest of the codebase is generic and can be updated from upstream without conflicts.

---

## 📁 Directory Structure

```
config/
├── README.md           # This file
├── bot.json            # Bot identity and branding
├── prompts/            # System prompts (behavior & tone)
│   ├── base.txt        # Core behavioral rules
│   ├── public.txt      # Public-facing persona
│   └── private.txt     # Private-facing persona
└── knowledge/          # RAG knowledge base (facts & information)
    ├── _TEMPLATE.md    # Knowledge base guidelines
    ├── base/           # Shared knowledge (public + private)
    ├── public/         # Customer-facing knowledge
    └── private/        # Internal knowledge (requires JWT)
```

---

## 🎯 What Goes Where

### `bot.json` - Bot Identity & Branding

**What it controls:**
- Bot name (appears in prompts and UI)
- Person/company name (who the bot represents)
- Public URL (for documentation examples)
- UI colors and default chat titles

**When to edit:**
- When setting up a new bot
- When rebranding
- When changing default UI text

**Example:**
```json
{
  "bot": {
    "name": "MyBot",
    "personName": "Your Company",
    "publicUrl": "https://bot.example.com",
    "description": "AI assistant for Your Company"
  }
}
```

---

### `prompts/` - How the Bot Behaves

**What it controls:**
- System instructions sent with EVERY LLM request
- Bot's tone, style, and behavioral rules
- NOT facts (those go in `knowledge/`)

**Files:**

**`base.txt`** - Core behavioral rules
- Identity ("You are {{botName}}")
- Scope and guardrails
- Security rules (no prompt injection, no secrets)
- Applied to ALL requests (public + private)

**`public.txt`** - Public-facing persona
- Tone for customer interactions
- Response style (concise, professional, etc.)
- How to handle edge cases
- Applied to `/api/public/chat`

**`private.txt`** - Private-facing persona
- Tone for internal users
- Technical depth level
- Internal procedures handling
- Applied to `/api/private/chat`

**Template variables:**
- `{{botName}}` - Replaced with `bot.json → bot.name`
- `{{personName}}` - Replaced with `bot.json → bot.personName`
- `{{personFirstName}}` - First name extracted from `personName`

**When to edit:**
- To change bot's personality or tone
- To adjust response style (more/less formal, technical, etc.)
- To add/modify behavioral rules
- To customize private vs. public personas

**What NOT to put here:**
- Facts about products, services, or people (→ use `knowledge/`)
- API keys or secrets (→ use `.env`)
- UI customization (→ use `bot.json` branding section)

---

### `knowledge/` - What the Bot Knows

**What it controls:**
- Facts and information retrieved via RAG
- NOT behavior or tone (that's in `prompts/`)

**Structure:**

**`base/`** - Shared knowledge (public + private can access)
- About the person/company
- Product/service information
- General documentation

**`public/`** - Customer-facing knowledge only
- FAQs
- Public documentation
- Support articles
- Pricing, features, etc.

**`private/`** - Internal knowledge (requires JWT auth)
- Internal procedures
- Runbooks
- Technical documentation
- Confidential information

**How it works:**
1. On server startup, all `.md` files are:
   - Chunked into ~900 character segments
   - Embedded using OpenAI `text-embedding-3-large`
   - Stored in Turso vector database

2. On user query:
   - Query is embedded
   - Top-k most similar chunks are retrieved
   - Passed as context to the LLM
   - LLM generates response using this context

**When to edit:**
- To update facts, information, or documentation
- To add new products, features, or procedures
- Anytime the RAG content needs updating

**Best practices:**
- Use clear markdown headers for better chunking
- Keep sections self-contained (~300-800 words)
- Split large topics into multiple files
- Update files incrementally (system only re-embeds changes)

---

## 🔄 Setup Workflow

When you set up Chatter, you only customize `/config`:

```bash
# 1. Clone the repository
git clone https://github.com/you/chatter-demo.git mybot
cd mybot

# 2. Customize bot.json
nano config/bot.json
# Change: name, personName, publicUrl, colors

# 3. Customize prompts (optional)
nano config/prompts/public.txt
# Adjust tone, style, personality

# 4. Replace knowledge
rm -rf config/knowledge/base/*
rm -rf config/knowledge/public/*
rm -rf config/knowledge/private/*
# Add your own .md files

# 5. Set API keys
cp .env.sample .env
nano .env
# Add: OPENAI_API_KEY, TURSO_URL, etc.

# 6. Build and run
bun install
bun run dev
```

**That's it!** Everything else is generic code from the Chatter framework.

---

## 📊 What Happens at Runtime

### Prompts Loading
1. `src/core/prompts.ts` reads files from `config/prompts/`
2. Replaces `{{botName}}`, `{{personName}}`, `{{personFirstName}}` with values from `config/bot.json`
3. Exports interpolated prompts for use by the LLM

### Knowledge Loading
1. `src/core/loaders.ts` walks `config/knowledge/`
2. Reads all `.md` files
3. Categorizes by bucket (base, public, private)
4. Returns documents to be embedded

### Embeddings Generation
1. `src/core/retrieval.ts` chunks documents
2. Generates SHA-256 hashes for deduplication
3. Creates embeddings via OpenAI API (only for new/changed chunks)
4. Stores in Turso database
5. Uses for RAG retrieval during queries

---

## 🚨 Important Notes

**DON'T put secrets in config:**
- ❌ API keys, tokens, passwords → use `.env`
- ❌ Private data that shouldn't be in git → use `.env` or separate service
- ✅ Bot name, public info, documentation → `config/` is fine

**Git best practices:**
- Commit `/config` to your repo (it's your customization)
- Don't commit `.env` (already in `.gitignore`)
- Upstream Chatter updates won't touch `/config` (no merge conflicts)

**Testing changes:**
```bash
# After editing prompts or knowledge
bun run dev        # Test locally
```

---

**Questions?** See the main `README.md` or `SETUP.md` for more details.
