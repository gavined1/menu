import { nextPathSchema } from '@/utils/zod-schemas';
import { Suspense } from 'react';
import { z } from 'zod';
import { Login } from './Login';

const SearchParamsSchema = z.object({
  next: nextPathSchema.optional(),
});

async function LoginWrapper(props: { searchParams: Promise<unknown> }) {
  const searchParams = await props.searchParams;
  const parsedParams = SearchParamsSchema.safeParse(searchParams);
  const next = parsedParams.success ? parsedParams.data.next : undefined;

  return <Login next={next} />;
}

export default async function LoginPage(props: {
  searchParams: Promise<unknown>;
}) {
  return (
    <Suspense>
      <LoginWrapper searchParams={props.searchParams} />
    </Suspense>
  );
}
