import * as request from 'supertest';
import { UserDao } from '../api/user/model/user.dao';

export const authorizeMock = async ({ app, user }) => {
  await UserDao.model.create(user);

  const { email: login, password } = user;
  const { token } = await request(app)
    .post('/api/v1/auth/login')
    .send({ login, password, })
    .then(response => response.body as { token: string });

  return token;
};
