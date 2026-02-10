# EduTech Platform - Student Dashboard Frontend

A Next.js 14 frontend application for the EduTech platform, focusing on student learning experience with AI-powered chat and personalized notes.

## Features

- **Authentication**: Login with school ID and password
- **Subject Navigation**: Browse subjects, chapters, and sessions hierarchically
- **Interactive Chat**: Chat with AI about session content alongside NCERT material
- **Split View**: Simultaneous view of chat and NCERT chapter content
- **Interactive Pills**: Quick action buttons for common follow-up questions
- **Citations**: Clickable citations linking to textbook and session references
- **Note Generation**: AI-powered personalized note creation
- **Note Editor**: Rich text editor with auto-save functionality
- **Export**: Export notes as PDF or Markdown

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **API Client**: Axios
- **Rich Text Editor**: TipTap
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local .env.local
# Edit .env.local with your API URL
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes
│   │   └── login/
│   ├── (dashboard)/             # Dashboard routes (protected)
│   │   └── dashboard/
│   │       └── [subject]/
│   │           ├── chapters/
│   │           └── [chapter]/
│   │               └── sessions/
│   ├── chat/                    # Chat interface
│   │   └── [sessionId]/
│   ├── notes/                   # Notes viewer and editor
│   │   └── [noteId]/
│   │       └── edit/
│   ├── layout.tsx               # Root layout
│   ├── providers.tsx            # Global providers
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Layout components
│   ├── dashboard/               # Dashboard-specific components
│   ├── chat/                    # Chat-specific components
│   └── notes/                   # Notes-specific components
├── stores/                      # Zustand stores
│   ├── authStore.ts
│   ├── chatStore.ts
│   └── noteStore.ts
├── lib/
│   ├── api.ts                   # Axios client and API functions
│   ├── queryClient.ts           # TanStack Query configuration
│   └── utils.ts                 # Utility functions
└── types/
    └── index.ts                 # TypeScript type definitions
```

## Key Features Implementation

### Authentication
- Login page with form validation
- JWT token storage in localStorage
- Auto-redirect for protected routes
- Logout functionality

### Navigation
- Breadcrumb navigation across all pages
- Subject → Chapter → Session hierarchy
- Protected routes with authentication check

### Chat Interface
- Split-screen layout (50/50)
- Real-time message updates
- Interactive pill buttons for quick actions
- Clickable citations with source references
- NCERT chapter panel with search functionality
- Chat history persistence

### Notes System
- AI-generated notes from chat history
- Markdown-based note rendering
- Rich text editor with TipTap
- Auto-save every 5 seconds
- Export to PDF and Markdown
- Version tracking

## API Integration

The frontend communicates with the FastAPI backend. Update the `NEXT_PUBLIC_API_URL` in `.env.local` to point to your backend API.

### API Endpoints Used

- `POST /auth/login` - User authentication
- `GET /sessions?approved=true` - Fetch approved sessions
- `POST /chat/ask` - Send chat message
- `POST /notes/generate` - Generate notes from chat
- `GET /notes/{id}` - Fetch note by ID
- `PUT /notes/{id}` - Update note content
- `GET /notes/{id}/export` - Export note

## Deployment

### Vercel (Recommended)

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.yourbackend.com
```

## Development

### Build for Production

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

### Lint Code

```bash
npm run lint
```

## Future Enhancements

- [ ] Real-time note generation progress
- [ ] WebSocket support for live updates
- [ ] Offline support with service workers
- [ ] Mobile app version
- [ ] Dark mode support
- [ ] Note collaboration features
- [ ] Progress tracking and analytics

## License

Proprietary - All rights reserved
# edutech-frontend
