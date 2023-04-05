import { Errors, User } from '@models';

export type AuthType = 'login' | 'register';

export type Credentials = { email: string; password: string };

export type UserPayload = { user: User };

export type AttemptAuthPayload = {
  credentials: Credentials;
  authType: AuthType;
};

export type AuthError = { errors: Errors };
