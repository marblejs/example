import * as request from 'supertest';
import { InstanceType } from 'typegoose';
import { User } from '@api/users';

export const mockAuthorizationFor = (user: InstanceType<User>) => async (app) => {
  const { email: login, password } = user;
  const { token } = await request(app)
    .post('/api/v1/auth/login')
    .send({ login, password, })
    .then(response => response.body as { token: string });

  return token;
};
