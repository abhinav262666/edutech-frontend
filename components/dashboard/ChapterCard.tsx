'use client';

import { Chapter } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ChapterCardProps {
  chapter: Chapter;
  subjectId: string;
}

export function ChapterCard({ chapter, subjectId }: ChapterCardProps) {
  return (
    <Link href={`/dashboard/${subjectId}/${chapter.id}/sessions`}>
      <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">
                Chapter {chapter.chapterNumber}: {chapter.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {chapter.description}
              </CardDescription>
            </div>
            <Badge variant="secondary">{chapter.sessionsCount} Sessions</Badge>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
