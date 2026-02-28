import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Lock, Mail } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useState } from 'react';

export const EmailAndPassword = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading: boolean;
} & ComponentProps<typeof Button>) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          email,
          password,
        });
      }}
      data-testid="password-form"
      className="space-y-5"
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-200">
            Email address
          </Label>
          <InputGroup className="border-white/15 bg-white/5 text-slate-100">
            <InputGroupAddon className="text-slate-400">
              <Mail className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              id="sign-in-email"
              name="email"
              type="email"
              disabled={isLoading}
              value={email}
              data-strategy="email-password"
              placeholder="name@company.com"
              className="placeholder:text-slate-500"
              onChange={(event) => setEmail(event.target.value)}
              autoComplete={'email'}
              required
            />
          </InputGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-200">
            Password
          </Label>
          <InputGroup className="border-white/15 bg-white/5 text-slate-100">
            <InputGroupAddon className="text-slate-400">
              <Lock className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              id="sign-in-password"
              name="password"
              type="password"
              disabled={isLoading}
              value={password}
              placeholder="Type your password"
              className="placeholder:text-slate-500"
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </InputGroup>
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          className="h-11 w-full bg-gradient-to-r from-cyan-400 to-blue-500 font-medium text-slate-950 hover:from-cyan-300 hover:to-blue-400"
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Login</span>
          )}
        </Button>
      </div>

      <Button
        disabled={isLoading}
        type="submit"
        className="h-11 w-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 font-medium text-slate-950 hover:from-cyan-300 hover:via-sky-300 hover:to-blue-400"
      >
        {isLoading ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            <span>Signing in...</span>
          </>
        ) : (
          <span>Login</span>
        )}
      </Button>
    </form>
  );
};
