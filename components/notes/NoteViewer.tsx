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
          <h1 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground tracking-tight">
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-foreground">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-semibold mt-5 mb-2 text-foreground">
            {line.replace('### ', '')}
          </h3>
        );
      }

      // Lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 list-disc text-muted-foreground leading-relaxed">
            {line.replace('- ', '')}
          </li>
        );
      }

      // Citations [1], [2], etc.
      const citationRegex = /\[(\d+)\]/g;
      if (citationRegex.test(line)) {
        const parts = line.split(citationRegex);
        return (
          <p key={index} className="mb-2 text-muted-foreground leading-relaxed">
            {parts.map((part, i) => {
              if (i % 2 === 1) {
                return (
                  <Badge key={i} variant="secondary" className="mx-1 text-xs bg-accent/15 text-accent border border-accent/20 font-mono">
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
          <p key={index} className="mb-2 text-muted-foreground leading-relaxed">
            {line}
          </p>
        );
      }

      return <br key={index} />;
    });
  };

  return (
    <div className="max-w-none">
      {renderContent(note.content)}
    </div>
  );
}
