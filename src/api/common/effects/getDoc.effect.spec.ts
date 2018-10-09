import * as request from 'supertest';
import { app } from '../../../app';

describe('getDocEffect$', () => {
  test('GET api/v1/doc responds with 200 and HTML file', async () =>
    request(app)
      .get('/api/v1/doc')
      .expect('Content-Type', 'text/html')
      .expect(200));
});
