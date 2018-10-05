import * as request from 'supertest';
import { app } from '../../../app';
import { mockUser } from '../../../tests/user.mock';
import { mockAuthorizationFor } from '../../../tests//auth.mock';
import { UserDao } from '../model/user.dao';
import { throwError, of } from 'rxjs';
import { User } from '../model/user.model';

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
        expect(body.roles).toBeDefined();
        expect(body.password).toBeUndefined();
      });
  });

  test('GET /api/v1/user/me returns 401 if not authorized', async () =>
    request(app)
      .get('/api/v1/user/me')
      .expect(401, { error: { status: 401, message: 'Unauthorized' } })
  );

  test('GET /api/v1/user/me returns 404 if user is not found', async () => {
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    jest.spyOn(UserDao, 'findById')
      .mockImplementationOnce(() => of(user))
      .mockImplementation(() => of(null));

    return request(app)
      .get('/api/v1/user/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(404, { error: { status: 404, message: 'User does not exist' } });
  });
});
