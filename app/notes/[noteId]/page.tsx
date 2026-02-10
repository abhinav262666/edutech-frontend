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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">
                  Notes for Motion - Session Jan 28
                </h1>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date(mockNote.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportMarkdown}>
                <FileDown className="mr-2 h-4 w-4" />
                Export Markdown
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm">
          <NoteViewer note={mockNote} />
        </div>
      </div>
    </div>
  );
}
