'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Ask anything about this chapter..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        className="flex-1 h-11 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground rounded-xl focus:border-primary focus:ring-primary/20"
      />
      <Button
        type="submit"
        disabled={disabled || !input.trim()}
        className="h-11 w-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
