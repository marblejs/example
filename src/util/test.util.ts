import * as request from 'supertest';
import { UserRepository } from '../api/user/repositories/user.repository';

export const authorizeMock = async ({ app, user }) => {
  await UserRepository.model.create(user);

  const { email: login, password } = user;
  const { token } = await request(app)
    .post('/api/v1/auth/login')
    .send({ login, password, })
    .then(response => response.body as { token: string });

  return token;
};
