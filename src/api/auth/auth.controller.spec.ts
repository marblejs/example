import * as request from 'supertest';
import { app } from '../../app';

describe('Auth controller', () => {
  test('POST /api/v1/auth/login returns 400 status if "login" is not provided', async () =>
    request(app)
      .post('/api/v1/auth/login')
      .expect(400, {
        error: {
          status: 400,
          message: '"login" is required',
        }
      })
  );

  test('POST /api/v1/auth/login returns 400 status if "password" is not provided', async () =>
    request(app)
      .post('/api/v1/auth/login')
      .send({ login: 'test' })
      .expect(400, {
        error: {
          status: 400,
          message: '"password" is required',
        }
      })
  );

  test('POST /api/v1/auth/login return 403 if "login" is incorrect ', async () =>
    request(app)
      .post('/api/v1/auth/login')
      .send({ login: 'test_wrong', password: 'admin' })
      .expect(401, {
        error: {
          status: 401,
          message: 'Unauthorized',
        }
      })
  );

  test('POST /api/v1/auth/login return 403 if "login" is incorrect ', async () =>
    request(app)
      .post('/api/v1/auth/login')
      .send({ login: 'admin', password: 'test_wrong' })
      .expect(401, {
        error: {
          status: 401,
          message: 'Unauthorized',
        }
      })
  );

  test('POST /api/v1/auth/login responds with JWT token', async () =>
    request(app)
      .post('/api/v1/auth/login')
      .send({ login: 'admin', password: 'admin' })
      .expect(200, {
        firstName: 'Brad',
        lastName: 'Pitt',
        roles: ['ROLE_ADMIN'],
        username: 'SweetBrad63',
      })
  );
});
