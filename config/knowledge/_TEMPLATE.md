# Knowledge Base Template

This directory contains the RAG (Retrieval-Augmented Generation) knowledge base for your chatbot.

## 📁 Directory Structure

```
knowledge/
├── base/        # Shared knowledge (accessible to both public and private)
├── public/      # Public-facing knowledge (customers only)
└── private/     # Internal knowledge (private only)
```

## 🚀 Customization

**This folder is fully customizable.** Add, edit, or delete markdown files to change your bot's knowledge.

### File Format

- **Format:** Markdown (`.md`) files only
- **Processing:** Files are automatically chunked (max 900 chars per chunk)
- **Embedding:** OpenAI `text-embedding-3-large` model
- **Storage:** Turso (libsql) vector database

### Best Practices

1. **Use clear headers** - Helps chunking and retrieval
2. **Be concise** - Each section should be self-contained
3. **Avoid huge files** - Split large topics into multiple files
4. **Update incrementally** - The system only re-embeds changed content

## 🔄 How It Works

1. **On server startup**, the system:
   - Loads all `.md` files from `knowledge/`
   - Chunks text into ~900 character segments
   - Generates embeddings for new/changed chunks
   - Stores in Turso database

2. **On user query**, the system:
   - Embeds the user's question
   - Finds top-k most similar chunks (cosine similarity)
   - Passes relevant context to the LLM
   - Generates a contextual response

## 🔒 Security

- **Public** knowledge is accessible via `/api/public/chat` (API key optional)
- **Private** knowledge requires JWT authentication via `/api/private/chat`
- **Base** knowledge is shared across both endpoints
