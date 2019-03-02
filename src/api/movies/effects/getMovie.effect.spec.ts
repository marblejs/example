import * as request from 'supertest';
import { createContext } from '@marblejs/core';
import { mockAuthorizationFor, mockUser, mockMovie, mockMovieActor } from '@tests';
import httpListener from '@app';

describe('getMovie$', () => {
  const app = httpListener.run(createContext());

  test('GET /api/v1/movies/:id returns 200 if move is found', async () => {
    const user = await mockUser();
    const actors = [mockMovieActor(), mockMovieActor()];
    const movies = [await mockMovie(actors), await mockMovie(actors)];
    const token = await mockAuthorizationFor(user)(app);
    const targetMovie = movies[0];

    return request(app)
      .get(`/api/v1/movies/${targetMovie.imdbId}`)
      .set('Authorization', `Bearer ${token}`)
      .then(({ body }) => {
        expect(body._id).toEqual(String(targetMovie._id));
        expect(body.imdbId).toEqual(targetMovie.imdbId);
        expect(body.title).toEqual(targetMovie.title);
        expect(body.director).toEqual(targetMovie.director);
        expect(body.year).toEqual(targetMovie.year);
        expect(body.metascore).toEqual(targetMovie.metascore);
        expect(body.genres![0]).toEqual(targetMovie.genres![0]);
        expect(body.actors[0].imdbId).toEqual(targetMovie.actors[0].imdbId);
        expect(body.actors[1].imdbId).toEqual(targetMovie.actors[1].imdbId);
        expect(body.posterUrl).toContain(targetMovie.posterUrl);
      });
  });

  test('GET /api/v1/movies/:id returns 404 if not foun', async () => {
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get('/api/v1/movies/not_exists')
      .set('Authorization', `Bearer ${token}`)
      .expect(404, { error: { status: 404, message: 'Movie does not exist' } });
  });

  test('GET /api/v1/movies/:id returns 401 if not authorized', async () =>
    request(app)
      .get('/api/v1/movies/123')
      .expect(401, { error: { status: 401, message: 'Unauthorized' } })
  );
});
