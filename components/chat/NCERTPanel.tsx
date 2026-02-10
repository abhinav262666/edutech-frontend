'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface NCERTPanelProps {
  content: string;
  highlightedSection?: string;
}

export function NCERTPanel({ content, highlightedSection }: NCERTPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const highlightContent = (text: string) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-white p-4">
        <h2 className="text-lg font-semibold mb-3">NCERT Chapter</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search in chapter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-white p-6">
        <div className="prose prose-sm max-w-none">
          {content ? (
            <div className="whitespace-pre-wrap">{highlightContent(content)}</div>
          ) : (
            <p className="text-muted-foreground">
              NCERT chapter content will appear here...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
