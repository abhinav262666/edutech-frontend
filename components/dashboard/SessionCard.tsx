'use client';

import { Session } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, formatDuration } from '@/lib/utils';
import { Calendar, Clock, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface SessionCardProps {
  session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
  const statusVariant = session.status === 'approved' ? 'success' : 'secondary';

  return (
    <Card className="group border-border/50 bg-card/80 transition-all duration-200 hover:border-primary/30 hover:bg-card">
      <CardHeader className="py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Badge
              variant={statusVariant}
              className={session.status === 'approved' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : ''}
            >
              {session.status === 'approved' ? 'Ready' : session.status}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(session.dateUploaded)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(session.duration)}
            </div>
          </div>
          <Link href={`/chat/${session.id}`}>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold">
              <MessageSquare className="h-3.5 w-3.5" />
              Start Chat
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {session.transcriptPreview}
        </p>
      </CardContent>
    </Card>
  );
}
