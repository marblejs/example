import * as request from 'supertest';
import { app } from '../../../../app';

describe('Root effect', () => {
  test('GET api/v1 responds with 200', async () =>
    request(app)
      .get('/api/v1')
      .expect(200, '"API version: v1"'));
});
