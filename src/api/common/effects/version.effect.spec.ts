import * as request from 'supertest';
import { app } from '../../../app';

describe('versionEffect$', () => {
  test('GET api/v1 responds with 200', async () =>
    request(app)
      .get('/api/v1')
      .expect(200, '"API version: v1"'));
});
