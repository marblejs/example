import { of } from 'rxjs';
import * as request from 'supertest';
import { createContext } from '@marblejs/core';
import { UsersDao } from '@api/users';
import httpListener from '@app';

const USER_MOCK = {
  firstName: 'test_firstName',
  lastName: 'test_lastName',
};

describe('Login effect', () => {
  let jwtMiddleware;
  const app = httpListener.run(createContext());

  beforeEach(() => {
    jest.unmock('@marblejs/middleware-jwt');
    jwtMiddleware = require('@marblejs/middleware-jwt');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/v1/auth/login returns 400 status if nothing is provided', async () =>
    request(app)
      .post('/api/v1/auth/login')
      .expect(400, {
        error: {
          status: 400,
          message: 'Validation error',
          data: [{
            path : '',
            expected: '{ login: string, password: string }',
          }],
          context: 'body',
        },
      }),
  );

  test('POST /api/v1/auth/login returns 400 status if "password" is not provided', async () =>
    request(app)
      .post('/api/v1/auth/login')
      .send({ login: 'test' })
      .expect(400, {
        error: {
          status: 400,
          message: 'Validation error',
          data: [{
            path : 'password',
            expected: 'string',
          }],
          context: 'body',
        },
      }),
  );

  test('POST /api/v1/auth/login returns 403 if credentials are incorrect ', async () => {
    spyOn(UsersDao, 'findByCredentials').and.callFake(() => of(null));

    return request(app)
      .post('/api/v1/auth/login')
      .send({ login: 'test', password: 'test' })
      .expect(401, {
        error: {
          status: 401,
          message: 'Unauthorized',
        }
      });
  });

  test('POST /api/v1/auth/login responds with JWT token', async () => {
    const expectedToken = 'TEST_TOKEN';

    spyOn(UsersDao, 'findByCredentials').and.callFake(() => of(USER_MOCK));
    jwtMiddleware.generateToken = jest.fn(() => () => expectedToken);

    return request(app)
      .post('/api/v1/auth/login')
      .send({ login: 'admin', password: 'admin' })
      .expect(200, { token: expectedToken });
  });
});
