import * as request from 'supertest';
import { app } from '../../../app';

describe('notFoundEffect$', () => {
  test('GET api/v1/undefined responds with 400', async () =>
    request(app)
      .get('/api/v1/undefined')
      .expect(404, { error: { status: 404, message: 'Route not found' } }));
});
