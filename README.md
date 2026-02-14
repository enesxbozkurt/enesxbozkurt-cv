# CV Website - Next.js + Supabase

A professional, modern, single-page scroll CV/Portfolio web application with DejavuAI-inspired design (black + neon green theme).

## Features

- ✨ **Public CV Pages**: Slug-based public CV pages (`/{slug}`)
- 🎨 **Modern Design**: DejavuAI-inspired dark theme with neon green accents
- 🔐 **Authentication**: Secure login/signup with Supabase Auth
- 📝 **Dashboard**: Manage your CV content (coming soon)
- 📱 **Responsive**: Mobile-first design
- ⚡ **Fast**: Built with Next.js 14+ App Router

## Tech Stack

- **Framework**: Next.js 14+ (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (Postgres)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### 1. Clone and Install

```bash
cd cv-site
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Run the SQL migrations in the Supabase SQL Editor:
   - Execute `supabase/sql/001_schema.sql`
   - Execute `supabase/sql/002_rls.sql`
4. Create a storage bucket named `avatars` in Storage settings and make it public

### 3. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
cv-site/
├── app/
│   ├── [slug]/          # Public CV pages
│   ├── auth/            # Authentication
│   ├── dashboard/       # Dashboard (protected)
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/
│   ├── ui/              # Base UI components
│   └── sections/        # CV section components
├── lib/
│   ├── supabase/        # Supabase clients
│   ├── utils.ts         # Utility functions
│   └── validators/      # Zod schemas
├── supabase/
│   └── sql/             # Database migrations
└── middleware.ts        # Auth middleware
```

## Usage

### 1. Sign Up

1. Go to `/auth`
2. Create an account
3. Check your email for confirmation

### 2. Create Your Profile

1. Log in to `/dashboard`
2. Set up your profile with:
   - Name, title, tagline
   - Bio and location
   - Contact information
   - Unique slug for your public URL

### 3. Add Content

- **Experience**: Add your work history
- **Projects**: Showcase your portfolio
- **Education**: List your degrees
- **Skills**: Add your technical skills

### 4. Make It Public

1. Toggle "Public" in your profile settings
2. Share your CV at `/{your-slug}`

## Design System

### Colors

- Background: `#050505`
- Panel: `#0B0F0B`
- Text: `#EDEDED`
- Muted: `#A3A3A3`
- Primary (Neon Green): `#29FF4F`
- Primary Dark: `#00C853`

### Components

All UI components follow the DejavuAI aesthetic with:
- Dark backgrounds with subtle grain texture
- Neon green accents and borders
- Glow effects on hover
- Smooth animations

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel project settings
4. Deploy!

## Database Schema

- **profiles**: User profile information
- **experiences**: Work experience entries
- **projects**: Portfolio projects
- **education**: Educational background
- **skills**: Technical skills
- **certifications**: Professional certifications

All tables have Row Level Security (RLS) enabled for data protection.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
