import * as request from 'supertest';
import { app } from '../../../app';
import { mockAuthorizationFor } from '../../../tests/auth.mock';
import { mockActor } from '../../../tests/actor.mock';
import { mockUser } from '../../../tests/user.mock';

describe('getActorList$', () => {
  test('GET /api/v1/actor returns 200 and list of actors', async () => {
    const actors = [await mockActor(), await mockActor(), await mockActor()];
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get('/api/v1/actor')
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

  test('GET /api/v1/actor returns empty array if no actors are found', async () => {
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get('/api/v1/actor')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, { collection: [], total: 0 });
  });

  test('GET /api/v1/actor returns 401 if not authorized', async () =>
    request(app)
      .get('/api/v1/actor')
      .expect(401, { error: { status: 401, message: 'Unauthorized' } })
  );
});
