import * as request from 'supertest';
import { of } from 'rxjs';
import { createContext } from '@marblejs/core';
import { mockAuthorizationFor } from '../../auth/fixtures/mocks';
import { mockUser } from '../../users/fixtures/mocks';
import { UsersMethods } from '../api/methods';
import httpListener from '../../../app';

describe('getUserListEffect$', () => {
  const app = httpListener.run(createContext());

  test('GET /api/v1/users/ returns 200 status and list of users', async () => {
    const users = [await mockUser(), await mockUser()];
    const token = await mockAuthorizationFor(users[0])(app);

    return request(app)
      .get('/api/v1/users')
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

  test('GET /api/v1/users/ returns 401 status when not authorized', async () =>
    request(app)
      .get('/api/v1/users')
      .expect(401, { error: { status: 401, message: 'Unauthorized' } })
  );
});

describe('getMeEffect$', () => {
  const app = httpListener.run(createContext());

  test('GET /api/v1/users/me returns 200 and currently logged user details', async () => {
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get('/api/v1/users/me')
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

  test('GET /api/v1/users/me returns 401 if not authorized', async () =>
    request(app)
      .get('/api/v1/users/me')
      .expect(401, { error: { status: 401, message: 'Unauthorized' } })
  );

  test('GET /api/v1/users/me returns 404 if user is not found', async () => {
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    jest.spyOn(UsersMethods, 'findById')
      .mockImplementationOnce(() => of(user))
      .mockImplementation(() => of(null));

    return request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(404, { error: { status: 404, message: 'User does not exist' } });
  });
});

