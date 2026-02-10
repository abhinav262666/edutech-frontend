'use client';

import { Subject } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Atom, Calculator, FlaskConical, Leaf, BookOpen, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const subjectConfig: Record<string, { icon: typeof Atom; color: string; bg: string; border: string }> = {
  physics: { icon: Atom, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
  mathematics: { icon: Calculator, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  chemistry: { icon: FlaskConical, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
  biology: { icon: Leaf, color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20' },
  english: { icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
};

interface SubjectCardProps {
  subject: Subject;
  index?: number;
}

export function SubjectCard({ subject, index = 0 }: SubjectCardProps) {
  const config = subjectConfig[subject.id] || subjectConfig.english;
  const Icon = config.icon;

  return (
    <Link href={`/dashboard/${subject.id}/chapters`}>
      <Card
        className={`group h-full cursor-pointer card-shine border-border/50 bg-card/80 transition-all duration-300 hover:border-border hover:glow-primary`}
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${config.bg} border ${config.border}`}>
              <Icon className={`h-6 w-6 ${config.color}`} />
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-primary" />
          </div>
          <CardTitle className="mt-4 text-lg text-foreground">{subject.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary" className="bg-secondary/80 text-secondary-foreground border-0">
            {subject.chaptersCount} Chapters
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
