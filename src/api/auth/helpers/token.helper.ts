import { generateExpirationInHours } from '@marblejs/middleware-jwt';
import { User } from '../../user/model/user.model';
import { InstanceType } from 'typegoose';

export const generateTokenPayload = (user: InstanceType<User>) => ({
  _id: user.id,
  email: user.email,
  exp: generateExpirationInHours(4),
});

export type Payload = ReturnType<typeof generateTokenPayload>;
