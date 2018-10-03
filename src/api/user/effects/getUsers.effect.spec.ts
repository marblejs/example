import * as request from 'supertest';
import { app } from '../../../app';
import { mockUser } from '../../../tests/user.mock';
import { mockAuthorizationFor } from '../../../tests/auth.mock';

describe('getUsersEffect$', () => {
  test('GET /api/v1/user/ returns 200 status and list of users', async () => {
    const users = [await mockUser(), await mockUser()];
    const token = await mockAuthorizationFor(users[0])(app);

    return request(app)
      .get('/api/v1/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }) => {
        users.forEach((user, i) => {
          const result = body[i];
          expect(result._id).toEqual(String(user._id));
          expect(result.firstName).toEqual(user.firstName);
          expect(result.lastName).toEqual(user.lastName);
          expect(result.password).toBeUndefined();
          expect(result.roles).toBeUndefined();
          expect(result.email).toBeUndefined();
        });
      });
  });


  test('GET /api/v1/user/ returns 401 status when not authorized', async () =>
    request(app)
      .get('/api/v1/user')
      .expect(401, { error: { status: 401, message: 'Unauthorized' } })
  );
});
