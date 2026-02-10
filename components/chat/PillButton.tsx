'use client';

import { Button } from '@/components/ui/button';

interface PillButtonProps {
  text: string;
  onClick: () => void;
}

export function PillButton({ text, onClick }: PillButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full text-xs border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
