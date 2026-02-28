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
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-foreground">
            Email address
          </Label>
          <div className="mt-1">
            <InputGroup>
              <InputGroupAddon>
                <Mail className="h-4 w-4" />
              </InputGroupAddon>
              <InputGroupInput
                id="sign-in-email"
                name="email"
                type="email"
                disabled={isLoading}
                value={email}
                data-strategy="email-password"
                placeholder="placeholder@email.com"
                onChange={(event) => setEmail(event.target.value)}
                autoComplete={'email'}
                required
              />
            </InputGroup>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>
          <div className="mt-1">
            <InputGroup>
              <InputGroupAddon>
                <Lock className="h-4 w-4" />
              </InputGroupAddon>
              <InputGroupInput
                id="sign-in-password"
                name="password"
                type="password"
                disabled={isLoading}
                value={password}
                placeholder="Type your password"
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </InputGroup>
          </div>
        </div>

        <div className="space-y-2">
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};
