# Quick Start Guide

Get the EduTech student dashboard running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm package manager
- Backend API running (default: http://localhost:8000)

## Setup Steps

### 1. Install Dependencies (2 minutes)

```bash
cd frontend
npm install
```

### 2. Configure Environment (30 seconds)

The `.env.local` file is already created with default values:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

If your backend runs on a different URL, update this file.

### 3. Start Development Server (30 seconds)

```bash
npm run dev
```

The app will start at **http://localhost:3000**

## Using the Application

### Test Flow

1. **Login** (http://localhost:3000/login)
   - Enter any school ID and password
   - Currently using mock data, will connect to backend API

2. **Dashboard** (http://localhost:3000/dashboard)
   - View available subjects
   - Click on any subject to see chapters

3. **Chapters** (http://localhost:3000/dashboard/physics/chapters)
   - Browse chapters for the selected subject
   - Click on a chapter to see sessions

4. **Sessions** (http://localhost:3000/dashboard/physics/motion/sessions)
   - View all recorded sessions for the chapter
   - Click "Start Chat" to open the chat interface

5. **Chat Interface** (http://localhost:3000/chat/session-1)
   - Left panel: Chat with AI
   - Right panel: NCERT chapter content
   - Try interactive pills (buttons below AI responses)
   - Click citations to see references
   - Use bottom buttons for notes actions

6. **Notes** (http://localhost:3000/notes/1)
   - View generated notes
   - Click "Edit" to open the rich text editor
   - Auto-save works after 5 seconds of inactivity

## Mock Data vs Real API

Currently, the app uses **mock data** for:
- Subjects list
- Chapters list
- Sessions list
- NCERT content
- Notes content

To connect to your **real backend API**:

1. Ensure your backend is running
2. Update `.env.local` with correct API URL
3. The app will automatically use real API endpoints:
   - `POST /auth/login`
   - `GET /sessions?approved=true`
   - `POST /chat/ask`
   - `POST /notes/generate`
   - `GET /notes/{id}`
   - `PUT /notes/{id}`

## Available Scripts

```bash
npm run dev     # Start development server (http://localhost:3000)
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

## Common Issues

### Port 3000 already in use
```bash
# Use a different port
PORT=3001 npm run dev
```

### API connection errors
1. Check if backend is running
2. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check CORS settings on backend
4. Check browser console for detailed errors

### Build errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

## Project Structure Overview

```
frontend/
├── app/                    # Pages and routes
│   ├── (auth)/login/      # Login page
│   ├── (dashboard)/       # Dashboard pages (protected)
│   ├── chat/              # Chat interface
│   └── notes/             # Notes viewer & editor
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── dashboard/        # Dashboard-specific
│   ├── chat/            # Chat-specific
│   └── notes/           # Notes-specific
├── stores/               # Zustand state management
├── lib/                  # API client & utilities
└── types/               # TypeScript definitions
```

## Key Features Checklist

- ✅ Authentication with login
- ✅ Protected routes
- ✅ Subject/Chapter/Session navigation
- ✅ Split-view chat interface
- ✅ Interactive pills for quick actions
- ✅ Clickable citations
- ✅ NCERT chapter viewer with search
- ✅ Note generation & viewing
- ✅ Rich text editor with auto-save
- ✅ Export functionality (PDF/Markdown)

## Testing the App

### Login Page
- URL: http://localhost:3000/login
- Try any credentials (mock authentication)

### Dashboard
- URL: http://localhost:3000/dashboard
- Should show 5 subjects

### Chat
- URL: http://localhost:3000/chat/session-1
- Type any message
- Click on pills below responses
- Try searching in NCERT panel

### Notes Editor
- URL: http://localhost:3000/notes/1/edit
- Edit content
- Watch auto-save indicator (top-right)

## Next Steps

1. **Backend Integration**
   - Connect login to real authentication endpoint
   - Fetch real session data
   - Integrate chat API
   - Connect notes generation

2. **Customize**
   - Update colors in `app/globals.css`
   - Add school logo in `components/layout/Header.tsx`
   - Customize subject icons

3. **Deploy**
   - Follow `DEPLOYMENT.md` for Vercel deployment
   - Configure environment variables in Vercel
   - Set up custom domain

## Need Help?

- 📖 Full documentation: `README.md`
- 🚀 Deployment guide: `DEPLOYMENT.md`
- 📝 Implementation details: `IMPLEMENTATION_SUMMARY.md`
- 🐛 Check browser console for errors
- 📧 Contact development team

---

**Happy Coding! 🎉**
