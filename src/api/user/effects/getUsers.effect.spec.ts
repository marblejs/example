import { of } from 'rxjs';
import * as request from 'supertest';
import { app } from '../../../app';
import { UserRepository } from '../../user/repositories/user.repository';
import { Database } from '../../../connection/database';
import { authorizeMock } from '../../../util/test.util';

const USER_MOCK = {
  email: 'test_email',
  password: 'test_password',
  firstName: 'test_firstName',
  lastName: 'test_lastName',
};

describe('Get users effect', () => {
  let token: string;

  beforeAll(async () => {
    await Database.connectTest();
  });

  beforeEach(async () => {
    token = await authorizeMock({ app, user: USER_MOCK });
  });

  test('GET /api/v1/user/ returns 200 status and list of users', async () => {
    const allUsers = [USER_MOCK, USER_MOCK];

    spyOn(UserRepository, 'findAll').and.callFake(() => of(allUsers));

    return request(app)
      .get('/api/v1/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, allUsers);
  });


  test('GET /api/v1/user/ returns 401 status when not authorized', async () =>
    request(app)
      .get('/api/v1/user')
      .expect(401, { error: { status: 401, message: 'Unauthorized' } })
  );

  afterEach(async () => {
    await Database.drop();
  });

  afterAll(async () => {
    await Database.disconnect();
  });
});
