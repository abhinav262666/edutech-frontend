'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { NoteViewer } from '@/components/notes/NoteViewer';
import { ArrowLeft, Edit, Download, FileDown } from 'lucide-react';

// Mock data
const mockNote = {
  id: '1',
  sessionId: 'session-1',
  chapterId: 'motion',
  content: `# Key Concepts

## Motion and Displacement
- Displacement is a vector quantity [1]
- Distance is a scalar quantity [2]
- Teacher's explanation: "Think of displacement as the shortest path from start to finish" (Session: 12:34) [T]

## Velocity vs Speed
- Velocity = displacement / time [1]
- Speed = distance / time
- Key difference: velocity has direction

## Your Doubts & Clarifications

**Q: What's the difference between speed and velocity?**

A: Speed is the rate of change of distance (scalar), while velocity is the rate of change of displacement (vector). This means velocity includes both magnitude and direction, whereas speed only has magnitude. [1] [2]

## Summary

Today's session covered the fundamentals of motion, including displacement, distance, velocity, and speed. We learned that displacement and velocity are vector quantities (with direction), while distance and speed are scalar quantities (without direction). The teacher emphasized understanding the conceptual difference rather than just memorizing formulas.`,
  createdAt: '2026-01-28T10:00:00Z',
  updatedAt: '2026-01-28T10:30:00Z',
};

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const noteId = params.noteId as string;

  const handleEdit = () => {
    router.push(`/notes/${noteId}/edit`);
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    console.log('Export PDF');
  };

  const handleExportMarkdown = () => {
    // TODO: Implement Markdown export
    console.log('Export Markdown');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-muted-foreground hover:text-foreground hover:bg-secondary">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-base font-semibold text-foreground">
                  Notes for Motion - Session Jan 28
                </h1>
                <p className="text-xs text-muted-foreground font-mono">
                  Updated {new Date(mockNote.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleEdit} className="border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF} className="border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportMarkdown} className="border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5">
                <FileDown className="mr-2 h-4 w-4" />
                Export MD
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-xl border border-border/50 bg-card/80 p-8">
          <NoteViewer note={mockNote} />
        </div>
      </div>
    </div>
  );
}
