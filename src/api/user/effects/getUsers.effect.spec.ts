import { generateToken } from '@marblejs/middleware-jwt';
import { of } from 'rxjs';
import * as request from 'supertest';
import { app } from '../../../app';
import { UserRepository } from '../../user/repositories/user.repository';
import { Config } from '../../../config';

const USER_MOCK = {
  firstName: 'test_firstName',
  lastName: 'test_lastName',
};

describe('Get users effect', () => {
  let authMiddleware;

  beforeEach(() => {
    jest.unmock('../../auth/middlewares/auth.middleware.ts');
    authMiddleware = require('../../auth/middlewares/auth.middleware.ts');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  xtest('GET /api/v1/user/ returns 200 status and list of users', async () => {
    const allUsers = [USER_MOCK, USER_MOCK];

    authMiddleware.authorize$ = jest.fn(req$ => req$);
    spyOn(UserRepository, 'findAll').and.callFake(() => of(allUsers));

    return request(app)
      .get('/api/v1/user')
      .expect(200, allUsers);
  });
});
