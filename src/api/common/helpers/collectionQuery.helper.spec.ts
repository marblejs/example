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
    const document = MovieDao.model.find();

    // when
    const result = await applyCollectionQuery(query)(document).exec();

    // then
    expect(result[0].metascore! <= result[1].metascore!).toBe(true);
    expect(result[1].metascore! <= result[2].metascore!).toBe(true);
    expect(result[2].metascore! <= result[3].metascore!).toBe(true);
  });

  test('sorts query by given field descending', async () => {
    // given
    const query = { sortBy: 'metascore', limit: 0, sortDir: SortDir.DESC, page: 1 };
    const document = MovieDao.model.find();

    // when
    const result = await applyCollectionQuery(query)(document).exec();

    // then
    expect(result[0].metascore! >= result[1].metascore!).toBe(true);
    expect(result[1].metascore! >= result[2].metascore!).toBe(true);
    expect(result[2].metascore! >= result[3].metascore!).toBe(true);
  });

  test('paginates query by given limit and page number', async () => {
    // given
    const query = { sortBy: '_id', limit: 2, sortDir: SortDir.ASC };
    const document = MovieDao.model.find();

    // when
    const page1 = await applyCollectionQuery({ ...query, page: 1 })(document).exec();
    const page2 = await applyCollectionQuery({ ...query, page: 2 })(document).exec();

    // then
    expect(page1.length).toBe(2);
    expect(page2.length).toBe(2);
    expect(page1[0].imdbId).not.toEqual(page2[0].imdbId);
    expect(page1[1].imdbId).not.toEqual(page2[1].imdbId);
  });
});
