'use client';

import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Zap, LogOut, User } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const { student, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <span className="text-lg font-bold text-gradient tracking-tight">EduTech</span>
        </Link>
        {student && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 rounded-full border border-border/50 bg-secondary/50 px-3 py-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15">
                <User className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground leading-tight">{student.name}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {student.organizationName}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-1.5">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
