'use client';

import { Message } from '@/types';
import { PillButton } from './PillButton';
import { Citation } from './Citation';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  onPillClick: (pill: string) => void;
  onCitationClick: (citation: any) => void;
}

export function ChatMessage({ message, onPillClick, onCitationClick }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('mb-4 flex', isUser ? 'justify-end' : 'justify-start')}>
      <div className={cn(
        'max-w-[80%] rounded-2xl px-4 py-3',
        isUser
          ? 'bg-primary text-primary-foreground rounded-br-md'
          : 'bg-secondary/50 border border-border/50 text-foreground rounded-bl-md'
      )}>
        <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {message.content}
          {message.citations && message.citations.length > 0 && (
            <span className="ml-1">
              {message.citations.map((citation, index) => (
                <Citation
                  key={index}
                  citation={citation}
                  index={index + 1}
                  onClick={() => onCitationClick(citation)}
                />
              ))}
            </span>
          )}
        </div>
        {message.pills && message.pills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.pills.map((pill, index) => (
              <PillButton key={index} text={pill} onClick={() => onPillClick(pill)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
