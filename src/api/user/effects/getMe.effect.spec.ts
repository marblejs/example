import * as request from 'supertest';
import { app } from '../../../app';
import { mockUser } from '../../../tests/user.mock';
import { mockAuthorizationFor } from '../../../tests//auth.mock';

describe('getMeEffect$', () => {
  test('GET /api/v1/user/me returns 200 and currently logged user details', async () => {
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get('/api/v1/user/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }) => {
        expect(body._id).toEqual(String(user._id));
        expect(body.email).toEqual(user.email);
        expect(body.firstName).toEqual(user.firstName);
        expect(body.lastName).toEqual(user.lastName);
        expect(body.password).toBeUndefined();
      });
  });

  test('GET /api/v1/user/me returns 401 if not authorized', async () =>
    request(app)
      .get('/api/v1/user/me')
      .expect(401)
  );
});
