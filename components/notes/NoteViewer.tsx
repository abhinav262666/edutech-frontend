'use client';

import { Note } from '@/types';
import { Badge } from '@/components/ui/badge';

interface NoteViewerProps {
  note: Note;
}

export function NoteViewer({ note }: NoteViewerProps) {
  // Parse markdown-like content
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold mt-6 mb-4">
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-5 mb-3">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      }

      // Lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 list-disc">
            {line.replace('- ', '')}
          </li>
        );
      }

      // Citations [1], [2], etc.
      const citationRegex = /\[(\d+)\]/g;
      if (citationRegex.test(line)) {
        const parts = line.split(citationRegex);
        return (
          <p key={index} className="mb-2">
            {parts.map((part, i) => {
              if (i % 2 === 1) {
                return (
                  <Badge key={i} variant="secondary" className="mx-1 text-xs">
                    [{part}]
                  </Badge>
                );
              }
              return part;
            })}
          </p>
        );
      }

      // Regular paragraph
      if (line.trim()) {
        return (
          <p key={index} className="mb-2">
            {line}
          </p>
        );
      }

      return <br key={index} />;
    });
  };

  return (
    <div className="prose prose-sm max-w-none">
      {renderContent(note.content)}
    </div>
  );
}
