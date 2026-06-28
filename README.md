# ElimuX Frontend

Global Education Discovery Platform - Next.js 14 Frontend

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI
- Supabase Auth
- Zustand (State Management)

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Docker
```bash
docker-compose up
```

## Project Structure

```
app/
  (auth)/        # Auth pages (login, register)
  (dashboard)/   # Dashboard pages
  (public)/      # Public pages (about, contact, privacy, terms)
  api/           # API routes
  discover/      # Program discovery
  institutions/  # Institution listing
  programs/      # Program listing
components/
  ui/            # Reusable UI components
  layout/        # Layout components
  common/        # Common components
  auth/          # Auth forms
lib/
  utils/         # Utility functions
  hooks/         # Custom hooks
  supabase/      # Supabase clients
public/          # Static assets
```

## License

MIT
