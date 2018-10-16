import { mockMovie } from '../../../tests/movie.mock';
import { MovieDao } from '../../movie/model/movie.dao';
import { applyCollectionQuery, SortDir } from './collectionQuery.helper';

describe('#applyCollectionQuery', () => {
  beforeEach(async () => {
    await mockMovie();
    await mockMovie();
    await mockMovie();
    await mockMovie();
  });

  test('sorts query by given field ascending', async () => {
    // given
    const query = { sortBy: 'metascore', limit: 0, sortDir: SortDir.ASC, page: 1 };
    const dbQuery = () => MovieDao.model.find();

    // when
    const { collection } = await applyCollectionQuery(query)(dbQuery);

    // then
    expect(collection[0].metascore! <= collection[1].metascore!).toBe(true);
    expect(collection[1].metascore! <= collection[2].metascore!).toBe(true);
    expect(collection[2].metascore! <= collection[3].metascore!).toBe(true);
  });

  test('sorts query by given field descending', async () => {
    // given
    const query = { sortBy: 'metascore', limit: 0, sortDir: SortDir.DESC, page: 1 };
    const dbQuery = () => MovieDao.model.find();

    // when
    const { collection } = await applyCollectionQuery(query)(dbQuery);

    // then
    expect(collection[0].metascore! >= collection[1].metascore!).toBe(true);
    expect(collection[1].metascore! >= collection[2].metascore!).toBe(true);
    expect(collection[2].metascore! >= collection[3].metascore!).toBe(true);
  });

  test('paginates query by given limit and page number', async () => {
    // given
    const query = { sortBy: '_id', limit: 2, sortDir: SortDir.ASC };
    const dbQuery = () => MovieDao.model.find();

    // when
    const { collection: coll1 } = await applyCollectionQuery({ ...query, page: 1 })(dbQuery);
    const { collection: coll2 } = await applyCollectionQuery({ ...query, page: 2 })(dbQuery);

    // then
    expect(coll1.length).toBe(2);
    expect(coll2.length).toBe(2);
    expect(coll1[0].imdbId).not.toEqual(coll2[0].imdbId);
    expect(coll1[1].imdbId).not.toEqual(coll2[1].imdbId);
  });
});
