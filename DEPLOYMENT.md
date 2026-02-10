# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Vercel account (for deployment)
- Backend API running and accessible

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

### 5. Start Production Server

```bash
npm start
```

## Deployment to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and configure environment variables when asked

### Option 2: Vercel Dashboard (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository (GitHub, GitLab, or Bitbucket)

2. **Configure Project**
   - Framework Preset: **Next.js**
   - Root Directory: `frontend` (if in monorepo) or `.` (if standalone)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Set Environment Variables**
   - Navigate to Project Settings → Environment Variables
   - Add the following variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-api.com
     ```
   - Make sure to set them for Production, Preview, and Development environments

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application
   - You'll get a production URL like `https://your-project.vercel.app`

5. **Configure Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://api.edutech.com` |

### Important Notes

- All variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Never store sensitive secrets in `NEXT_PUBLIC_` variables
- Backend API must have CORS configured to allow requests from your frontend domain

## Post-Deployment Checklist

- [ ] Verify environment variables are set correctly
- [ ] Test login functionality
- [ ] Test navigation through subjects → chapters → sessions
- [ ] Test chat interface with real API
- [ ] Test note generation and editing
- [ ] Test export functionality
- [ ] Verify CORS is properly configured on backend
- [ ] Check for console errors in browser
- [ ] Test responsive design on mobile devices
- [ ] Configure custom domain (if applicable)
- [ ] Set up monitoring (Vercel Analytics, Sentry, etc.)

## Backend CORS Configuration

Make sure your FastAPI backend allows requests from your Vercel domain:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Development
        "https://your-project.vercel.app",  # Production
        "https://your-custom-domain.com",  # Custom domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Troubleshooting

### Build Fails

1. Check Node.js version (must be 18+)
2. Clear cache: `rm -rf .next node_modules && npm install`
3. Check for TypeScript errors: `npm run build`

### Environment Variables Not Working

1. Variables must start with `NEXT_PUBLIC_` to be exposed to browser
2. Restart dev server after changing `.env.local`
3. In Vercel, make sure variables are set for the correct environment

### API Requests Fail

1. Check CORS configuration on backend
2. Verify `NEXT_PUBLIC_API_URL` is correct
3. Check browser console for detailed error messages
4. Ensure backend API is accessible from your deployment

### Authentication Issues

1. Check JWT token expiration settings
2. Verify localStorage is accessible (not blocked by browser)
3. Check that backend `/auth/login` endpoint is working

## Performance Optimization

### Recommended Settings

1. **Image Optimization**
   - Use Next.js `<Image>` component for all images
   - Configure allowed domains in `next.config.js`

2. **Code Splitting**
   - Already implemented with Next.js App Router
   - Use dynamic imports for heavy components if needed

3. **Caching**
   - API responses are cached for 5 minutes by default
   - Adjust in `lib/queryClient.ts` if needed

4. **Analytics**
   - Enable Vercel Analytics in project settings
   - Add custom events for key user actions

## Monitoring and Logging

### Recommended Tools

1. **Vercel Analytics** - Built-in performance monitoring
2. **Sentry** - Error tracking and monitoring
3. **LogRocket** - Session replay and debugging
4. **Posthog** - Product analytics

### Implementation Example (Sentry)

```bash
npm install @sentry/nextjs
```

Follow Sentry's Next.js setup guide to configure error tracking.

## Backup and Rollback

Vercel automatically keeps all deployments:

1. Go to Deployments tab in Vercel dashboard
2. Select a previous deployment
3. Click "Promote to Production" to rollback

## Security Considerations

1. **HTTPS Only** - Vercel provides SSL by default
2. **Environment Variables** - Never commit `.env.local` to git
3. **API Security** - Use JWT tokens, validate on backend
4. **Content Security Policy** - Configure in `next.config.js` if needed
5. **Rate Limiting** - Implement on backend API

## Support

For deployment issues:
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs

For application issues:
- Check console logs in browser DevTools
- Review server logs in Vercel dashboard
- Contact development team
