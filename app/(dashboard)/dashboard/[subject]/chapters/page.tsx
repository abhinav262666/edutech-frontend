'use client';

import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ChapterCard } from '@/components/dashboard/ChapterCard';
import { Chapter } from '@/types';

// Mock data - replace with API call
const mockChapters: Record<string, Chapter[]> = {
  physics: [
    {
      id: 'motion',
      subjectId: 'physics',
      chapterNumber: 1,
      title: 'Motion',
      description: 'Learn about displacement, velocity, and acceleration',
      sessionsCount: 5,
    },
    {
      id: 'force',
      subjectId: 'physics',
      chapterNumber: 2,
      title: 'Force and Laws of Motion',
      description: "Newton's laws, friction, and circular motion",
      sessionsCount: 3,
    },
    {
      id: 'gravitation',
      subjectId: 'physics',
      chapterNumber: 3,
      title: 'Gravitation',
      description: 'Universal law of gravitation and gravitational force',
      sessionsCount: 4,
    },
  ],
  mathematics: [
    {
      id: 'algebra',
      subjectId: 'mathematics',
      chapterNumber: 1,
      title: 'Algebra Basics',
      description: 'Introduction to algebraic expressions and equations',
      sessionsCount: 6,
    },
    {
      id: 'geometry',
      subjectId: 'mathematics',
      chapterNumber: 2,
      title: 'Geometry',
      description: 'Shapes, angles, and geometric theorems',
      sessionsCount: 4,
    },
  ],
};

export default function ChaptersPage() {
  const params = useParams();
  const subjectId = params.subject as string;
  const chapters = mockChapters[subjectId] || [];

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: subjectId.charAt(0).toUpperCase() + subjectId.slice(1), href: `/dashboard/${subjectId}/chapters` },
  ];

  return (
    <div className="animate-slide-up">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground capitalize tracking-tight">
          {subjectId}
        </h1>
        <p className="mt-1 text-muted-foreground">Class 10 -- {chapters.length} chapters available</p>
      </div>

      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <ChapterCard key={chapter.id} chapter={chapter} subjectId={subjectId} index={index} />
        ))}
      </div>
    </div>
  );
}
