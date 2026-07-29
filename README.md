# Home for All

A Next.js real-estate platform for listing and browsing properties in the UAE.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000 to view the app.

## Production deployment

### Vercel
1. Push the project to GitHub.
2. Create a new Vercel project and import the repository.
3. Add these environment variables in Vercel:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - NEXT_PUBLIC_MAPBOX_TOKEN
   - NEXT_PUBLIC_SITE_URL
4. Deploy.

### Required environment values
- Supabase project URL and anon key
- Mapbox access token
- Production site URL

## Build verification

```bash
npm run build
```
