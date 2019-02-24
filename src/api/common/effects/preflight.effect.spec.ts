import * as request from 'supertest';
import { createContext } from '@marblejs/core';
import httpListener from '@app';

describe('preflightEffect$', () => {
  const app = httpListener.run(createContext());

  test('GET /api/v1 responds with 200', async () =>
    request(app)
      .options('/api/v1')
      .expect(200));
});
