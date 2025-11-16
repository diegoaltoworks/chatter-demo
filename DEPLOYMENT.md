# Deployment Guide

This guide explains how to deploy Chatter Demo using Docker containers.

## ⚠️ Platform Requirements

**Chatter requires Bun runtime and long-running server processes.**

### ❌ NOT Compatible:
- **Vercel** - Serverless, no Bun support
- **Netlify** - Serverless functions only
- **AWS Lambda** - No Bun runtime
- **Cloudflare Workers** - Edge runtime incompatible

### ✅ Compatible (Any Container Platform):
- **Google Cloud Run** - Containers, generous free tier
- **Fly.io** - Native container support
- **Railway** - Auto-detects Dockerfile
- **DigitalOcean App Platform** - Container hosting
- **AWS ECS/Fargate** - Enterprise container orchestration
- **Azure Container Apps** - Microsoft cloud containers
- **Any VPS with Docker** - Ubuntu, Debian, etc.

**Why these work:** They support Docker containers with long-running processes, proper Bun runtime support, and streaming HTTP responses.

---

## Docker Deployment

Chatter Demo includes a production-ready Dockerfile. Deploy to any container platform that supports Docker.

### Build the Container

```bash
# Build the Docker image
docker build -t chatter-demo .

# Test locally
docker run -p 8181:8181 --env-file .env chatter-demo

# Visit http://localhost:8181 to verify
```

### Using Docker Compose (Local/VPS)

The included `docker-compose.yml` makes local deployment simple:

```bash
# Configure environment
cp .env.sample .env
nano .env  # Add your credentials

# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down
```

---

## Environment Variables

All deployment platforms need these environment variables:

```bash
# Required
OPENAI_API_KEY=sk-proj-...
TURSO_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=eyJhbGc...
CHATBOT_SECRET=your-secret-here

# Optional (with defaults)
PORT=8080                      # Some platforms override this
NODE_ENV=production
RATE_LIMIT_RPM_PUBLIC=60
RATE_LIMIT_RPM_PRIVATE=120

# Optional (for private chat with JWT auth)
JWT_JWKS_URL=https://...
JWT_ISSUER=https://...
JWT_AUDIENCE=your-domain.com
CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_FRONTEND_URL=https://...
```

**Generate a secure secret:**
```bash
openssl rand -hex 32
```

---

## Platform-Specific Examples

### Google Cloud Run

```bash
# Build and push to GCR
docker build -t gcr.io/YOUR_PROJECT_ID/chatter-demo .
docker push gcr.io/YOUR_PROJECT_ID/chatter-demo

# Deploy
gcloud run deploy chatter-demo \
  --image gcr.io/YOUR_PROJECT_ID/chatter-demo \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production \
  --set-secrets \
    OPENAI_API_KEY=OPENAI_API_KEY:latest,\
    TURSO_URL=TURSO_URL:latest,\
    TURSO_AUTH_TOKEN=TURSO_AUTH_TOKEN:latest,\
    CHATBOT_SECRET=CHATBOT_SECRET:latest
```

### Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Deploy (auto-detects Dockerfile)
fly launch

# Set secrets
fly secrets set OPENAI_API_KEY="sk-..."
fly secrets set TURSO_URL="libsql://..."
fly secrets set TURSO_AUTH_TOKEN="..."
fly secrets set CHATBOT_SECRET="$(openssl rand -hex 32)"

# Deploy
fly deploy
```

### Railway

1. Push code to GitHub
2. Connect repository to Railway
3. Railway auto-detects the Dockerfile
4. Add environment variables in dashboard
5. Deploy automatically on git push

### VPS (DigitalOcean, Linode, Hetzner, etc.)

```bash
# SSH into your server
ssh root@your-server-ip

# Install Docker
curl -fsSL https://get.docker.com | sh

# Clone repository
git clone https://github.com/yourusername/chatter-demo.git
cd chatter-demo

# Configure environment
nano .env  # Add your credentials

# Start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

**Optional: Set up nginx reverse proxy for HTTPS**

```bash
# Install nginx and certbot
apt install nginx certbot python3-certbot-nginx -y

# Create nginx config
nano /etc/nginx/sites-available/chatter-demo
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8181;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/chatter-demo /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# Add SSL certificate
certbot --nginx -d your-domain.com
```

---

## Troubleshooting

### "Failed to initialize chat"

**Cause:** Server not running or environment variables missing

**Solution:**
1. Check container logs: `docker-compose logs -f` or platform-specific logs
2. Verify all required environment variables are set
3. Test endpoint: `curl https://your-domain.com/api/demo/session`

### "Database connection failed"

**Cause:** Invalid Turso credentials

**Solution:**
1. Verify `TURSO_URL` and `TURSO_AUTH_TOKEN` are correct
2. Test locally: `turso db shell your-db-name`
3. Regenerate token: `turso db tokens create your-db-name`

### "OpenAI API error"

**Cause:** Invalid API key or no credits

**Solution:**
1. Verify API key is correct
2. Check credits at https://platform.openai.com/usage
3. Check rate limits

### Container won't start

**Solution:**
```bash
# Check container logs
docker logs <container-id>

# Verify environment variables
docker exec <container-id> env | grep -E 'OPENAI|TURSO|CHATBOT'

# Test locally first
docker run -p 8181:8181 --env-file .env chatter-demo
```

---

## Production Checklist

Before deploying to production:

- [ ] Set `NODE_ENV=production` in environment
- [ ] Use secrets management (not plain `.env` files)
- [ ] Generate strong `CHATBOT_SECRET`: `openssl rand -hex 32`
- [ ] Configure appropriate rate limits
- [ ] Enable HTTPS (automatic on most container platforms)
- [ ] Set up monitoring and logging
- [ ] Configure CORS if needed
- [ ] Set up database backups for Turso
- [ ] Test the deployment thoroughly

---

## Verify Deployment

After deploying, test your endpoints:

```bash
# Test homepage
curl https://your-domain.com

# Test demo session creation
curl https://your-domain.com/api/demo/session

# Test chat widget
# Visit https://your-domain.com/demo/widget-inline-public.html
```

---

## Need Help?

- **Chatter Demo Issues**: https://github.com/diegoaltoworks/chatter-demo/issues
- **Chatter Framework Issues**: https://github.com/diegoaltoworks/chatter/issues
- **Setup Guide**: [SETUP.md](./SETUP.md)
- **Configuration Guide**: [config/README.md](./config/README.md)
