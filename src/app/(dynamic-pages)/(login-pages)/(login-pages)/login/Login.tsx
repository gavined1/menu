'use client';

import { EmailAndPassword } from '@/components/Auth/EmailAndPassword';
import { RedirectingPleaseWaitCard } from '@/components/Auth/RedirectingPleaseWaitCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DEFAULT_AUTH_REDIRECT_PATH, getSafeNextPath } from '@/utils/auth/safe-next';
import { signInWithPasswordAction } from '@/data/auth/auth';
import { CircleCheckBig, ShieldCheck } from 'lucide-react';
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_42%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.16),_transparent_42%)]" />
        <RedirectingPleaseWaitCard
          message="Please wait while we redirect you to your dashboard."
          heading="Redirecting to Dashboard"
        />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4 sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_42%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_42%)]" />

      <Card className="relative w-full max-w-5xl overflow-hidden border border-white/10 bg-slate-900/80 shadow-[0_30px_80px_-35px_rgba(8,47,73,0.8)] backdrop-blur-xl">
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          <section className="border-b border-white/10 p-6 sm:p-10 md:border-b-0 md:border-r">
            <Badge variant="secondary" className="border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
              Owner Platform Access
            </Badge>
            <div className="mt-5 space-y-4">
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Professional menu operations, secured for your internal team.
              </h1>
              <p className="max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
                This portal is for approved client accounts provisioned by the platform owner. Sign in to manage content, publishing, and performance across locations.
              </p>
            </div>

            <div className="mt-8 space-y-3 text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-cyan-300" />
                <span>Route and session protections are enforced by default.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CircleCheckBig className="h-4 w-4 text-cyan-300" />
                <span>Access is invite-only and managed by your platform owner.</span>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-10">
            <CardHeader className="space-y-2 px-0 pb-7 pt-0 text-left">
              <CardTitle className="text-2xl font-semibold tracking-tight text-white">Welcome back</CardTitle>
              <CardDescription className="text-base text-slate-300">
                Sign in to continue to your dashboard.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 px-0 pb-0">
              <EmailAndPassword
                isLoading={passwordStatus === 'executing'}
                onSubmit={(data) => {
                  executePassword({
                    email: data.email,
                    password: data.password,
                  });
                }}
              />
              <p className="text-xs text-slate-400">
                Need access? Contact your platform owner to create or update your account credentials.
              </p>
            </CardContent>
          </section>
        </div>
      </Card>
    </div>
  );
}
