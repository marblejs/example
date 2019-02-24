import * as request from 'supertest';
import { createContext } from '@marblejs/core';
import { mockAuthorizationFor, mockUser, mockMovie, mockMovieActor } from '@tests';
import httpListener from '@app';

describe('getMovieList$', () => {
  const app = httpListener.run(createContext());

  test('GET /api/v1/movies returns 200 and list of movies', async () => {
    const user = await mockUser();
    const actors = [mockMovieActor(), mockMovieActor()];
    const movies = [await mockMovie(actors), await mockMovie(actors)];
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get(`/api/v1/movies`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }) => {
        movies.forEach((movie, i) => {
          const result = body.collection[i];
          expect(result._id).toEqual(String(movie._id));
          expect(result.imdbId).toEqual(movie.imdbId);
          expect(result.title).toEqual(movie.title);
          expect(result.director).toEqual(movie.director);
          expect(result.year).toEqual(movie.year);
          expect(result.metascore).toEqual(movie.metascore);
          expect(result.genres![0]).toEqual(movie.genres![0]);
          expect(result.actors[0].imdbId).toEqual(actors[0].imdbId);
          expect(result.actors[1].imdbId).toEqual(actors[1].imdbId);
          expect(result.posterUrl).toContain(movie.posterUrl);
        });
      });
  });

  test('GET /api/v1/movies returns empty state if no movies are found', async () => {
    const user = await mockUser();
    const token = await mockAuthorizationFor(user)(app);

    return request(app)
      .get('/api/v1/movies')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, { collection: [], total: 0 });
  });

  test('GET /api/v1/movies returns 401 if not authorized', async () =>
    request(app)
      .get('/api/v1/movies')
      .expect(401, { error: { status: 401, message: 'Unauthorized' } })
  );
});
