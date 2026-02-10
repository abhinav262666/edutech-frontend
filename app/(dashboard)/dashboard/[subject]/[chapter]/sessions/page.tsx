'use client';

import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SessionCard } from '@/components/dashboard/SessionCard';
import { Session } from '@/types';

// Mock data - replace with API call
const mockSessions: Session[] = [
  {
    id: 'session-1',
    chapterId: 'motion',
    dateUploaded: '2026-01-28',
    duration: 45,
    status: 'approved',
    transcriptPreview: "Today we'll learn about displacement and how it differs from distance...",
    transcript: "Today we'll learn about displacement and how it differs from distance. Full transcript...",
  },
  {
    id: 'session-2',
    chapterId: 'motion',
    dateUploaded: '2026-01-26',
    duration: 50,
    status: 'approved',
    transcriptPreview: 'We discussed velocity and acceleration in detail...',
    transcript: 'We discussed velocity and acceleration in detail. Full transcript...',
  },
  {
    id: 'session-3',
    chapterId: 'motion',
    dateUploaded: '2026-01-24',
    duration: 42,
    status: 'approved',
    transcriptPreview: 'Introduction to kinematics and motion in a straight line...',
    transcript: 'Introduction to kinematics and motion in a straight line. Full transcript...',
  },
];

export default function SessionsPage() {
  const params = useParams();
  const subjectId = params.subject as string;
  const chapterId = params.chapter as string;

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: subjectId.charAt(0).toUpperCase() + subjectId.slice(1), href: `/dashboard/${subjectId}/chapters` },
    { label: chapterId.charAt(0).toUpperCase() + chapterId.slice(1), href: `/dashboard/${subjectId}/${chapterId}/sessions` },
  ];

  return (
    <div className="animate-slide-up">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground capitalize tracking-tight">
          {chapterId}
        </h1>
        <p className="mt-1 text-muted-foreground">{mockSessions.length} sessions recorded</p>
      </div>

      <div className="space-y-3">
        {mockSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
