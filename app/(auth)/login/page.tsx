'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { authAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [schoolId, setSchoolId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call real backend authentication API
      const data = await authAPI.login(schoolId, password);

      // Transform backend response to frontend format
      const student = {
        id: data.student.id,
        name: data.student.profile?.name || 'Student',
        schoolId: data.student.school_id,
        organizationId: data.student.organization_id,
        organizationName: data.student.organization?.name || 'School',
      };

      const token = data.token;

      setAuth(student, token);
      router.push('/dashboard');
    } catch (err: any) {
      // Handle different error scenarios
      if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        setError('Unable to connect to server. Please ensure the backend is running on port 8001.');
      } else if (err.response?.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else if (err.response?.status === 404) {
        setError('Student not found. Please check your School ID.');
      } else {
        setError(err.response?.data?.message || err.response?.data?.detail || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Top-left glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      {/* Bottom-right glow */}
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md animate-slide-up">
        {/* Brand header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Learning</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gradient">EduTech</h1>
          <p className="mt-2 text-muted-foreground">Your personal AI study buddy</p>
        </div>

        <Card className="glow-primary border-border/50 bg-card/80 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="text-xl text-foreground">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to continue learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="schoolId" className="text-sm font-medium text-foreground">School ID</Label>
                <Input
                  id="schoolId"
                  type="text"
                  placeholder="Enter your school ID"
                  value={schoolId}
                  onChange={(e) => setSchoolId(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                    className="h-4 w-4 rounded border-border bg-secondary accent-primary"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-11 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 glow-primary transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Let{"'"}s Go
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Built for students of Class 9-12 across India
        </p>
      </div>
    </div>
  );
}
