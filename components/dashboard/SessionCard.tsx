'use client';

import { Session } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, formatDuration } from '@/lib/utils';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SessionCardProps {
  session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
  const statusVariant = session.status === 'approved' ? 'success' : 'secondary';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Badge variant={statusVariant}>
                {session.status === 'approved' ? '✓ Approved' : session.status}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDate(session.dateUploaded)}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {formatDuration(session.duration)}
              </div>
            </div>
          </div>
          <Link href={`/chat/${session.id}`}>
            <Button size="sm">
              Start Chat
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {session.transcriptPreview}
        </p>
      </CardContent>
    </Card>
  );
}
