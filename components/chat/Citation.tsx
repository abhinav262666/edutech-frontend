'use client';

import { Badge } from '@/components/ui/badge';

interface CitationProps {
  citation: any;
  index: number;
  onClick: () => void;
}

export function Citation({ citation, index, onClick }: CitationProps) {
  return (
    <Badge
      variant="secondary"
      className="cursor-pointer ml-1 text-xs bg-accent/15 text-accent border border-accent/20 hover:bg-accent/25 transition-colors font-mono"
      onClick={onClick}
    >
      [{index}]
    </Badge>
  );
}
