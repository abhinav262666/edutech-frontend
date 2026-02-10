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
      className="rounded-full text-xs"
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
