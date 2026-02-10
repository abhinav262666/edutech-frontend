'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useChatStore } from '@/stores/chatStore';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { NCERTPanel } from '@/components/chat/NCERTPanel';
import { Button } from '@/components/ui/button';
import { X, FileText, Edit, Download } from 'lucide-react';
import { chatAPI } from '@/lib/api';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const {
    messages,
    isLoading,
    ncertContent,
    setSessionId,
    addMessage,
    setLoading,
    setNcertContent,
    loadChatHistory,
  } = useChatStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [highlightedSection, setHighlightedSection] = useState<string>();

  useEffect(() => {
    setSessionId(sessionId);
    loadChatHistory(sessionId);

    // Load NCERT content - mock for now
    setNcertContent(`# Chapter 1: Motion

## 1.1 Introduction to Motion

Motion is a change in position of an object with respect to time. When we observe our surroundings, we see that many objects are moving. Birds flying, fish swimming, blood flowing through veins and arteries, and many more.

## Types of Motion

1. **Linear motion**: Motion along a straight line
2. **Rotational motion**: Motion around an axis
3. **Oscillatory motion**: Repeated back and forth motion

## 1.2 Distance and Displacement

Distance is the total path length covered by an object. Displacement is the shortest distance from the initial to the final position of an object.

Key differences:
- Distance is a scalar quantity (only magnitude)
- Displacement is a vector quantity (magnitude and direction)

## 1.3 Velocity and Speed

Velocity is the rate of change of displacement. Speed is the rate of change of distance.

Formula: velocity = displacement / time`);
  }, [sessionId, setSessionId, loadChatHistory, setNcertContent]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage({ role: 'user', content });
    setLoading(true);

    try {
      // Call API
      const response = await chatAPI.ask(sessionId, content, messages);

      // Add AI response with pills and citations
      addMessage({
        role: 'assistant',
        content: response.answer,
        pills: response.pills || ['Explain simpler', 'Show example', 'Teacher\'s view'],
        citations: response.citations || [],
      });
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePillClick = (pill: string) => {
    handleSendMessage(pill);
  };

  const handleCitationClick = (citation: any) => {
    setHighlightedSection(citation.text);
    // Scroll to citation in NCERT panel
    console.log('Citation clicked:', citation);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <h1 className="text-base font-semibold text-foreground">Motion - Session Jan 28</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-muted-foreground hover:text-foreground hover:bg-secondary">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Split view */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area */}
        <div className="flex w-1/2 flex-col border-r border-border/50">
          <div className="flex-1 overflow-auto bg-background p-6">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                onPillClick={handlePillClick}
                onCitationClick={handleCitationClick}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-secondary/50 border border-border/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-border/50 bg-card/50 backdrop-blur-sm p-4">
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          </div>
        </div>

        {/* NCERT Panel */}
        <div className="w-1/2">
          <NCERTPanel content={ncertContent} highlightedSection={highlightedSection} />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-border/50 bg-card/50 backdrop-blur-sm px-6 py-3">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5">
            <FileText className="mr-2 h-4 w-4" />
            View Notes
          </Button>
          <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5">
            <Edit className="mr-2 h-4 w-4" />
            Edit Notes
          </Button>
          <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5">
            <FileText className="mr-2 h-4 w-4" />
            Generate Notes
          </Button>
          <Button variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
