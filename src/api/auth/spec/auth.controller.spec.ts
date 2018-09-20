import * as request from 'supertest';
import { app } from '../../../app';
import { UserRepository } from '../../user/user.repository';
import { of } from 'rxjs';

const USER_MOCK = {
  firstName: 'test_firstName',
  lastName: 'test_lastName',
};

describe('Auth controller', () => {
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
    spyOn(UserRepository, 'findUserByCredentials').and.callFake(() => of(null));

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
    spyOn(UserRepository, 'findUserByCredentials').and.callFake(() => of(USER_MOCK));

    return request(app)
      .post('/api/v1/auth/login')
      .send({ login: 'admin', password: 'admin' })
      .expect(200, USER_MOCK);
  });
});
