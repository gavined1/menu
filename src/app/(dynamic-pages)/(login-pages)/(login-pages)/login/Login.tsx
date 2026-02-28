'use client';

import { EmailAndPassword } from '@/components/Auth/EmailAndPassword';
import { RedirectingPleaseWaitCard } from '@/components/Auth/RedirectingPleaseWaitCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DEFAULT_AUTH_REDIRECT_PATH, getSafeNextPath } from '@/utils/auth/safe-next';
import { signInWithPasswordAction } from '@/data/auth/auth';
import { ShieldCheck, Sparkles, Star } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

interface LoginProps {
  next?: string;
}

export function Login({ next }: LoginProps) {
  const router = useRouter();
  const [redirectInProgress, setRedirectInProgress] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);

  const redirectToDestination = useCallback(() => {
    router.replace(getSafeNextPath(next, DEFAULT_AUTH_REDIRECT_PATH));
  }, [next, router]);

  const { execute: executePassword, status: passwordStatus } = useAction(
    signInWithPasswordAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading('Logging in...');
      },
      onSuccess: () => {
        toast.success('Logged in!', { id: toastRef.current });
        toastRef.current = undefined;
        redirectToDestination();
        setRedirectInProgress(true);
      },
      onError: () => {
        toast.error('Invalid email or password.', { id: toastRef.current });
        toastRef.current = undefined;
      },
    }
  );

  if (redirectInProgress) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.2),_transparent_45%)]" />
        <RedirectingPleaseWaitCard
          message="Please wait while we redirect you to your dashboard."
          heading="Redirecting to Dashboard"
        />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4 sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.2),_transparent_40%)]" />
      <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 right-8 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <Card className="relative grid w-full max-w-4xl overflow-hidden border border-white/10 bg-slate-900/70 shadow-[0_24px_60px_-24px_rgba(6,182,212,0.55)] backdrop-blur-xl md:grid-cols-2">
        <div className="hidden flex-col justify-between border-r border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 md:flex">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
              Platform Access
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Crafted for teams that expect a premium control panel.
            </h1>
            <p className="text-sm leading-relaxed text-slate-300">
              Manage menus, publishing, and customer-facing experiences from one secure workspace.
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-200">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              <span>Enterprise-grade session and route protection.</span>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              <span>Built for high-performance operations and reliability.</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="h-4 w-4 text-cyan-300" />
              <span>Trusted by brands that prioritize polished UX.</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <CardHeader className="space-y-2 px-0 pb-8 pt-0 text-left">
            <CardTitle className="text-2xl font-semibold tracking-tight text-white">
              Welcome back
            </CardTitle>
            <CardDescription className="text-base text-slate-300">
              Log in to continue to your dashboard.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0 pb-0">
            <EmailAndPassword
              isLoading={passwordStatus === 'executing'}
              onSubmit={(data) => {
                executePassword({
                  email: data.email,
                  password: data.password,
                });
              }}
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
