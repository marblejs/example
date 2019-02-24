import { createContext } from '@marblejs/core';
import * as request from 'supertest';
import { mockAuthorizationFor, mockActor, mockUser } from '@tests';
import httpListener from '@app';

describe('getActor$', () => {
  const app = httpListener.run(createContext());

  test('GET /api/v1/actors/:id returns 200 if actor is found', async () => {
    const user = await mockUser();
    const actors = [await mockActor(), await mockActor()];
    const token = await mockAuthorizationFor(user)(app);
    const targetActor = actors[0];

    return request(app)
      .get(`/api/v1/actors/${targetActor.imdbId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }) => {
        expect(body._id).toEqual(String(targetActor._id));
        expect(body.name).toEqual(targetActor.name);
        expect(body.imdbId).toEqual(targetActor.imdbId);
        expect(body.gender).toEqual(targetActor.gender);
        expect(body.country).toEqual(targetActor.country);
        expect(body.birthday).toEqual(targetActor.birthday);
        expect(body.deathday).toEqual(targetActor.deathday);
        expect(body.photoUrl).toContain(targetActor.photoUrl);
      });
  });

  test('GET /api/v1/actors returns 404 if not found', async () => {
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get('/api/v1/actors/not_exists')
      .set('Authorization', `Bearer ${token}`)
      .expect(404, { error: { status: 404, message: 'Actor does not exist' } });
  });

  test('GET /api/v1/actors returns 401 if not authorized', async () =>
    request(app)
      .get('/api/v1/actors/123')
      .expect(401, { error: { status: 401, message: 'Unauthorized' } })
  );
});
