import { createContext } from '@marblejs/core';
import * as request from 'supertest';
import { mockAuthorizationFor } from '../../auth/fixtures/mocks';
import { mockActor } from '../../actors/fixtures/mocks';
import { mockUser } from '../../users/fixtures/mocks';
import httpListener from '../../../app';

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

describe('getActorList$', () => {
  const app = httpListener.run(createContext());

  test('GET /api/v1/actors returns 200 and list of actors', async () => {
    const actors = [await mockActor(), await mockActor(), await mockActor()];
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get(`/api/v1/actors?page=1&limit=3`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }) => {
        actors.forEach((actor, i) => {
          const result = body.collection[i];
          expect(result.imdbId).toEqual(String(actor.imdbId));
          expect(result.name).toEqual(actor.name);
          expect(result.birthday).toEqual(actor.birthday);
          expect(result.deathday).toEqual(actor.deathday);
          expect(result.country).toEqual(actor.country);
          expect(result.gender).toEqual(actor.gender);
          expect(result.photoUrl).toContain(actor.photoUrl);
        });
      });
  });

  test('GET /api/v1/actors returns empty array if no actors are found', async () => {
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get('/api/v1/actors')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, { collection: [], total: 0 });
  });

  test('GET /api/v1/actors returns 401 if not authorized', async () =>
    request(app)
      .get('/api/v1/actors')
      .expect(401, { error: { status: 401, message: 'Unauthorized' } })
  );

  test('GET /api/v1/actors returns 400 if query is not valid', async () => {
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get('/api/v1/actors?page=0&limit=-1')
      .set('Authorization', `Bearer ${token}`)
      .expect(400, { error: {
        status: 400,
        message: 'Validation error',
        data: [{
          path: 'limit',
          expected: 'number.0+',
          got: '"-1"',
        }, {
          path: 'page',
          expected: 'number.1+',
          got: '"0"',
        }],
        context: 'query'
      }});
  });
});
