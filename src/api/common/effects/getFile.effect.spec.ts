import * as request from 'supertest';
import { app } from '../../../app';
import * as FileHelper from '@marblejs/core/dist/+internal/files';
import { throwError } from 'rxjs';

describe('getFileEffect$', () => {
  test('GET api/v1/assets/:dir responds with 200', async () =>
    request(app)
      .get('/api/v1/assets/img/placeholder.jpg')
      .expect(200));

  test('GET api/v1/assets/:dir responds with 200', async () =>
    request(app)
      .get('/api/v1/assets/img/not_found.jpg')
      .expect(404, { error: {
        status: 404,
        message: 'Asset not found for path: /api/v1/assets/img/not_found.jpg'
      }}));

  test('GET api/v1/assets/:dir responds with 200', async () => {
    jest.spyOn(FileHelper, 'readFile')
      .mockImplementation(() => throwError(new Error()));

    return request(app)
      .get('/api/v1/assets/img/errored.jpg')
      .expect(500, { error: {
        status: 500,
        message: 'Internal server error'
      }});
  });
});
