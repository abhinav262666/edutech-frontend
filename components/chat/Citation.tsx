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
      className="cursor-pointer ml-1 text-xs hover:bg-secondary/80"
      onClick={onClick}
    >
      [{index}]
    </Badge>
  );
}
