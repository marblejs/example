import * as request from 'supertest';
import { app } from '../../../../app';

describe('NotFound effect', () => {
  test('GET api/v1/undefined responds with 400', async () =>
    request(app)
      .get('/api/v1/undefined')
      .expect(404, {
        error: {
          message: 'Route not found',
          status: 404,
        }
      }));
});
