import { of } from 'rxjs';
import * as request from 'supertest';
import { app } from '../../../app';
import { UsersDao } from '../../users/model/users.dao';

const USER_MOCK = {
  firstName: 'test_firstName',
  lastName: 'test_lastName',
};

describe('Login effect', () => {
  let jwtMiddleware;

  beforeEach(() => {
    jest.unmock('@marblejs/middleware-jwt');
    jwtMiddleware = require('@marblejs/middleware-jwt');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
