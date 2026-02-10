'use client';

import { useAuthStore } from '@/stores/authStore';
import { SubjectCard } from '@/components/dashboard/SubjectCard';
import { Subject } from '@/types';

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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {student?.name}
        </h1>
        <p className="mt-2 text-gray-600">
          Select a subject to start learning
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockSubjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}
