import { generateExpirationInHours } from '@marblejs/middleware-jwt';
import { InstanceType } from 'typegoose';
import { User } from '@api/users';

export const generateTokenPayload = (user: InstanceType<User>) => ({
  _id: user.id,
  email: user.email,
  exp: generateExpirationInHours(4),
});

export type Payload = ReturnType<typeof generateTokenPayload>;
