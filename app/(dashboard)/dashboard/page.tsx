'use client';

import { useAuthStore } from '@/stores/authStore';
import { SubjectCard } from '@/components/dashboard/SubjectCard';
import { Subject } from '@/types';
import { Sparkles } from 'lucide-react';

// Mock data for demonstration - replace with API call
const mockSubjects: Subject[] = [
  { id: 'physics', name: 'Physics', chaptersCount: 12, iconUrl: '' },
  { id: 'mathematics', name: 'Mathematics', chaptersCount: 15, iconUrl: '' },
  { id: 'chemistry', name: 'Chemistry', chaptersCount: 10, iconUrl: '' },
  { id: 'biology', name: 'Biology', chaptersCount: 14, iconUrl: '' },
  { id: 'english', name: 'English', chaptersCount: 8, iconUrl: '' },
];

export default function DashboardPage() {
  const student = useAuthStore((state) => state.student);

  return (
    <div className="animate-slide-up">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Dashboard</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Hey, {student?.name}
        </h1>
        <p className="mt-1.5 text-muted-foreground">
          Pick a subject and let{"'"}s crush it today
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mockSubjects.map((subject, index) => (
          <SubjectCard key={subject.id} subject={subject} index={index} />
        ))}
      </div>
    </div>
  );
}
