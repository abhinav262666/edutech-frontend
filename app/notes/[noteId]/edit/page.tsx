'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useNoteStore } from '@/stores/noteStore';
import { Button } from '@/components/ui/button';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { ArrowLeft, Check } from 'lucide-react';
import { notesAPI } from '@/lib/api';

// Mock data
const mockNote = {
  id: '1',
  sessionId: 'session-1',
  chapterId: 'motion',
  content: `<h1>Key Concepts</h1>
<h2>Motion and Displacement</h2>
<ul>
  <li>Displacement is a vector quantity</li>
  <li>Distance is a scalar quantity</li>
</ul>`,
  createdAt: '2026-01-28T10:00:00Z',
  updatedAt: '2026-01-28T10:30:00Z',
};

export default function NoteEditPage() {
  const params = useParams();
  const router = useRouter();
  const noteId = params.noteId as string;

  const {
    currentNote,
    isSaving,
    lastSaved,
    setCurrentNote,
    setSaving,
    updateNoteContent,
    markSaved,
  } = useNoteStore();

  const [content, setContent] = useState(mockNote.content);

  useEffect(() => {
    setCurrentNote(mockNote);
  }, [setCurrentNote]);

  // Auto-save functionality
  useEffect(() => {
    if (!content || content === mockNote.content) return;

    const timer = setTimeout(async () => {
      setSaving(true);
      try {
        await notesAPI.update(noteId, content);
        markSaved();
      } catch (error) {
        console.error('Failed to save:', error);
      }
    }, 5000); // Auto-save after 5 seconds of inactivity

    return () => clearTimeout(timer);
  }, [content, noteId, setSaving, markSaved]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    updateNoteContent(newContent);
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
              <h1 className="text-base font-semibold text-foreground">Editing Notes</h1>
            </div>
            <div className="flex items-center gap-2">
              {isSaving ? (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Saving...
                </span>
              ) : lastSaved ? (
                <span className="flex items-center gap-1 text-sm text-primary">
                  <Check className="h-4 w-4" />
                  Saved
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <NoteEditor content={content} onChange={handleContentChange} />
        </div>
      </div>
    </div>
  );
}
