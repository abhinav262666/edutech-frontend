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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Editing Notes</h1>
            </div>
            <div className="flex items-center gap-2">
              {isSaving ? (
                <span className="text-sm text-muted-foreground">Saving...</span>
              ) : lastSaved ? (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  Saved
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <NoteEditor content={content} onChange={handleContentChange} />
        </div>
      </div>
    </div>
  );
}
