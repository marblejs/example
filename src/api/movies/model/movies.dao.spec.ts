import { SortDir } from '@api/common';
import { mockMovie } from '@tests';
import { MoviesDao } from './movies.dao';

describe('Movies DAO', () => {
  test('#findAll finds all movies', async (done) => {
    // given
    const movies = [await mockMovie(), await mockMovie()];
    const defaultQuery = { sortBy: '_id', limit: 0, sortDir: SortDir.ASC, page: 1 };

    // when
    const result$ = MoviesDao.findAll(defaultQuery);

    // then
    result$.subscribe(result => {
      expect(result.total).toEqual(movies.length);

      result.collection.forEach((item, i) => {
        const reference = movies[i];
        expect(item._id).toEqual(reference._id);
        expect(item.imdbId).toEqual(reference.imdbId);
        expect(item.title).toEqual(reference.title);
        expect(item.director).toEqual(reference.director);
        expect(item.year).toEqual(reference.year);
        expect(item.metascore).toEqual(reference.metascore);
        expect(item.genres![0]).toEqual(reference.genres![0]);
        expect(item.posterUrl).toEqual(reference.posterUrl);
        done();
      });
    });
  });

  test('#findById find movie by ID', async (done) => {
    // given
    const movies = [await mockMovie(), await mockMovie()];
    const target = movies[0];

    // when
    const result$ = MoviesDao.findById(target._id);

    // then
    result$.subscribe(result => {
      if (!result) { return fail('Movie should be found'); }

      expect(result._id).toEqual(target._id);
      expect(result.imdbId).toEqual(target.imdbId);
      expect(result.title).toEqual(target.title);
      expect(result.director).toEqual(target.director);
      expect(result.year).toEqual(target.year);
      expect(result.metascore).toEqual(target.metascore);
      expect(result.genres![0]).toEqual(target.genres![0]);
      expect(result.posterUrl).toEqual(target.posterUrl);
      done();
    });
  });

  test('#findById find movie by ID', async (done) => {
    // given
    const movies = [await mockMovie(), await mockMovie()];
    const target = movies[0];

    // when
    const result$ = MoviesDao.findOneByImdbID(target.imdbId!);

    // then
    result$.subscribe(result => {
      if (!result) { return fail('Movie should be found'); }

      expect(result._id).toEqual(target._id);
      expect(result.imdbId).toEqual(target.imdbId);
      expect(result.title).toEqual(target.title);
      expect(result.director).toEqual(target.director);
      expect(result.year).toEqual(target.year);
      expect(result.metascore).toEqual(target.metascore);
      expect(result.genres![0]).toEqual(target.genres![0]);
      expect(result.posterUrl).toEqual(target.posterUrl);
      done();
    });
  });
});
