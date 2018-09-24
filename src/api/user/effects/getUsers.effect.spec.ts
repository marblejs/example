import { of } from 'rxjs';
import * as request from 'supertest';
import { app } from '../../../app';
import { UserRepository } from '../../user/repositories/user.repository';

const USER_MOCK = {
  firstName: 'test_firstName',
  lastName: 'test_lastName',
};

describe('Get users effect', () => {
  let authMiddleware;

  beforeEach(() => {
    jest.unmock('../../auth');
    authMiddleware = require('../../auth');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/v1/user/ returns 200 status and list of users', async () => {
    const allUsers = ['user_1', 'user_2'];

    authMiddleware.authorize$ = jest.fn(req$ => req$);
    spyOn(UserRepository, 'findAll').and.callFake(() => of(allUsers));

    return request(app)
      .get('/api/v1/user')
      .expect(200, allUsers);
  });

});
