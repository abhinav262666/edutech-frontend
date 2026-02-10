'use client';

import { Chapter } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ChapterCardProps {
  chapter: Chapter;
  subjectId: string;
  index?: number;
}

export function ChapterCard({ chapter, subjectId, index = 0 }: ChapterCardProps) {
  return (
    <Link href={`/dashboard/${subjectId}/${chapter.id}/sessions`}>
      <Card className="group cursor-pointer border-border/50 bg-card/80 transition-all duration-200 hover:border-primary/30 hover:bg-card">
        <CardHeader className="py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 font-mono text-sm font-bold text-primary">
              {String(chapter.chapterNumber).padStart(2, '0')}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base text-foreground group-hover:text-primary transition-colors">
                {chapter.title}
              </CardTitle>
              <CardDescription className="mt-0.5 text-muted-foreground line-clamp-1">
                {chapter.description}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Badge variant="secondary" className="bg-secondary/80 text-secondary-foreground border-0 text-xs">
                {chapter.sessionsCount} Sessions
              </Badge>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
