import * as request from 'supertest';
import { of } from 'rxjs';
import { app } from '../../../app';
import { UserDao } from '../../user/model/user.dao';
import { mockUser } from '../../../tests/user.mock';
import { mockAuthorizationFor } from '../../../tests/auth.mock';

describe('getUsersEffect$', () => {
  test('GET /api/v1/user/ returns 200 status and list of users', async () => {
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);
    const expectedList = ['user1', 'user2'];

    spyOn(UserDao, 'findAll').and.callFake(() => of(expectedList));

    return request(app)
      .get('/api/v1/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, expectedList);
  });


  test('GET /api/v1/user/ returns 401 status when not authorized', async () =>
    request(app)
      .get('/api/v1/user')
      .expect(401, { error: { status: 401, message: 'Unauthorized' } })
  );
});
