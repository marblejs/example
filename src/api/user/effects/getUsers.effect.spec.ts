import { of } from 'rxjs';
import * as request from 'supertest';
import { app } from '../../../app';
import { UserDao } from '../../user/model/user.dao';
import { authorizeMock } from '../../../tests/auth.mock';

const USER_MOCK = {
  email: 'test_email',
  password: 'test_password',
  firstName: 'test_firstName',
  lastName: 'test_lastName',
};

describe('Get users effect', () => {
  test('GET /api/v1/user/ returns 200 status and list of users', async () => {
    const allUsers = [USER_MOCK, USER_MOCK];
    const token = await authorizeMock({ user: USER_MOCK })(app);

    spyOn(UserDao, 'findAll').and.callFake(() => of(allUsers));

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
});
