'use client';

import { Subject } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Link href={`/dashboard/${subject.id}/chapters`}>
      <Card className="h-full cursor-pointer transition-all hover:shadow-lg hover:scale-105">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center">{subject.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary" className="w-full justify-center">
            {subject.chaptersCount} Chapters
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
