# Supabase Setup Guide

This document outlines how to configure your Supabase project for the Home for All app.

## Quick Setup

### 1. Go to Supabase Dashboard
Visit: https://app.supabase.com

### 2. Select Your Project
- Project URL: `https://ofmxtmgxzsvejywulcwe.supabase.co`
- Navigate to the SQL Editor

### 3. Run the Setup SQL

Copy and paste the following SQL into the Supabase SQL Editor and run it:

```sql
-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  price NUMERIC,
  location TEXT,
  type TEXT,
  purpose TEXT,
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  area NUMERIC,
  developer TEXT,
  description TEXT,
  amenities TEXT[],
  images TEXT[],
  featured_image TEXT,
  latitude NUMERIC DEFAULT 25.2048,
  longitude NUMERIC DEFAULT 55.2708,
  status TEXT DEFAULT 'Available',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_properties_user_id ON properties(user_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_type ON properties(type);

-- Enable RLS (Row Level Security)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view all properties
CREATE POLICY "Allow public select" ON properties
  FOR SELECT USING (true);

-- Policy: Users can insert their own properties
CREATE POLICY "Allow users to insert their own properties" ON properties
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own properties
CREATE POLICY "Allow users to update their own properties" ON properties
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own properties
CREATE POLICY "Allow users to delete their own properties" ON properties
  FOR DELETE USING (auth.uid() = user_id);

-- Enable Auth
-- This is done automatically, but ensure you have Email + Password auth enabled

-- Create a trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 4. Configure Authentication

In the Supabase Dashboard:

1. **Go to Authentication → Providers**
   - Ensure "Email" is enabled
   - (Optional) Enable Google, Apple, etc.

2. **Go to Authentication → URL Configuration**
   - Add your domain to "Authorized Redirect URLs"
   - For local dev: `http://localhost:3000/**`
   - For production: `https://yourdomain.com/**`

3. **Email Templates** (optional customization)
   - Go to Authentication → Email Templates
   - Customize signup and password reset templates

### 5. Enable Storage (for images)

1. **Go to Storage → Buckets**
2. **Create a new bucket:**
   - Name: `property-images`
   - Make it public (for easy access)
   - Add a file size limit if desired

3. **Set up RLS for the bucket:**
   - Allow public read access
   - Allow authenticated users to upload

### 6. Environment Variables

Your `.env.local` already has:
```
NEXT_PUBLIC_SUPABASE_URL=https://ofmxtmgxzsvejywulcwe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_YsXqrtksWyfuNiS1CkcCMw_THbu5j1a
```

✅ These are correctly configured!

### 7. Test the Connection

Run your app locally:
```bash
npm run dev
```

Try:
1. **Sign up** at http://localhost:3000/register
2. **Add a property** at http://localhost:3000/properties/add
3. **View properties** at http://localhost:3000/properties
4. **View property details** by clicking on a property

### 8. Backup & Production

Before deploying to production:

1. **Backup your database**
   - Supabase Dashboard → Backups

2. **Enable backups**
   - Go to Settings → Backups
   - Enable automatic daily backups

3. **Set production environment variables in Vercel**
   - Same NEXT_PUBLIC_SUPABASE_* values
   - (Keep the same project URL and key)

## Troubleshooting

### "Cannot find properties table"
- Check SQL ran without errors
- Refresh the browser
- Clear `.next` cache: `rm -rf .next`

### "RLS policy violated"
- Check user is logged in
- Verify policies are created correctly
- Check user_id matches in database

### Images not uploading
- Ensure storage bucket exists
- Check bucket policies allow uploads
- Verify API routes are configured

## API Routes (if needed)

If you need server-side operations, add routes in `app/api/`:

```typescript
// app/api/properties/route.ts
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { data, error } = await supabase
    .from('properties')
    .select('*');
  
  return NextResponse.json({ data, error });
}
```

## Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Integration](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
