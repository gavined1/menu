'use client';

import { EmailAndPassword } from '@/components/Auth/EmailAndPassword';
import { RedirectingPleaseWaitCard } from '@/components/Auth/RedirectingPleaseWaitCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signInWithPasswordAction } from '@/data/auth/auth';
import { DEFAULT_AUTH_REDIRECT_PATH, getSafeNextPath } from '@/utils/auth/safe-next';
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
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
        <RedirectingPleaseWaitCard
          message="Please wait while we redirect you to your dashboard."
          heading="Redirecting to Dashboard"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 dark:border dark:border-slate-800">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
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
      </Card>
    </div>
  );
}
