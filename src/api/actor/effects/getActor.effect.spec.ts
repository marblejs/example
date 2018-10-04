import * as request from 'supertest';
import { app } from '../../../app';
import { mockAuthorizationFor } from '../../../tests/auth.mock';
import { mockActor } from '../../../tests/actor.mock';
import { mockUser } from '../../../tests/user.mock';

describe('getActor$', () => {
  test('GET /api/v1/actor/:id returns 404 if actor is not found', async () => {
    const user = await mockUser();
    const actor = await mockActor();
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get(`/api/v1/actor/${actor.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
