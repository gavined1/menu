'use client';
import React, { Suspense } from 'react';

import { Toaster as SonnerToaster } from 'sonner';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

/**
 * Wrapper for dynamic pages: progress bar and toaster.
 */
export function DynamicLayoutProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Suspense>
        <ProgressBar
          height="4px"
          color="#0047ab"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <SonnerToaster richColors theme="light" />
      </Suspense>
    </>
  );
}
