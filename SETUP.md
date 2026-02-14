# CV Website - Supabase Setup Guide

## Quick Setup Steps

### 1. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following:
   - **Project URL** (starts with `https://`)
   - **anon/public key** (long string starting with `eyJ...`)

### 2. Update .env.local

Replace the values in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ **Important**: The anon key should be a very long string (JWT token) starting with `eyJ`. If you have a shorter key, it's incorrect.

### 3. Disable Email Confirmation (Optional)

To allow users to sign in immediately without email confirmation:

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Click on **Email** provider
3. **Disable** "Confirm email"
4. Click **Save**

### 4. Run Database Migrations

In your Supabase dashboard, go to **SQL Editor** and run these files in order:

1. First: `supabase/sql/001_schema.sql`
2. Second: `supabase/sql/002_rls.sql`

### 5. Create Storage Bucket

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket named `avatars`
3. Make it **public**

### 6. Start Development Server

```bash
cd cv-site
npm run dev
```

Visit `http://localhost:3000` - you should see the app redirect to `/auth`

## Troubleshooting

**Error: "Your project's URL and Key are required"**
- Check that your `.env.local` has the correct values
- Restart the dev server after updating `.env.local`

**Error: "Invalid API key"**
- Make sure you're using the **anon/public** key, not the service role key
- The key should be very long (JWT token)

**Can't sign in after signup**
- Make sure you disabled "Confirm email" in Authentication settings
- Or check your email for the confirmation link
