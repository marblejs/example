import * as request from 'supertest';
import { app } from '@app';

describe('preflightEffect$', () => {
  test('GET /api/v1 responds with 200', async () =>
    request(app)
      .options('/api/v1')
      .expect(200));
});
