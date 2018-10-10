import { ActorDao } from './actor.dao';
import { mockActor } from '../../../tests/actor.mock';
import { SortDir } from '../../common/helpers/collectionQuery.helper';

describe('Actor DAO', () => {
  test('#findAll finds all actors', async (done) => {
    // given
    const actors = [await mockActor(), await mockActor()];
    const defaultQuery = { sortBy: '_id', limit: 0, sortDir: SortDir.ASC, page: 1 };

    // when
    const result$ = ActorDao.findAll(defaultQuery);

    // then
    result$.subscribe(result => {
      result.forEach((item, i) => {
        const reference = actors[i];
        expect(item._id).toEqual(reference._id);
        expect(item.birthday).toEqual(reference.birthday);
        expect(item.gender).toEqual(reference.gender);
        expect(item.name).toEqual(reference.name);
        expect(item.birthday).toEqual(reference.birthday);
        expect(item.deathday).toEqual(reference.deathday);
        expect(item.imdbId).toEqual(reference.imdbId);
        expect(item.photoUrl).toEqual(reference.photoUrl);
        done();
      });
    });
  });

  test('#findById finds actor by _id', async (done) => {
    // given
    const actors = [await mockActor(), await mockActor()];
    const targetUser = actors[0];

    // when
    const result$ = ActorDao.findById(targetUser._id);

    // then
    result$.subscribe(item => {
      if (!item) { return fail('Actor should be found'); }

      expect(item._id).toEqual(targetUser._id);
      expect(item.birthday).toEqual(targetUser.birthday);
      expect(item.gender).toEqual(targetUser.gender);
      expect(item.name).toEqual(targetUser.name);
      expect(item.birthday).toEqual(targetUser.birthday);
      expect(item.deathday).toEqual(targetUser.deathday);
      expect(item.imdbId).toEqual(targetUser.imdbId);
      expect(item.photoUrl).toEqual(targetUser.photoUrl);
      done();
    });
  });

  test('#findOneByImdbID finds actor by "imdb" identifier', async (done) => {
    // given
    const actors = [await mockActor(), await mockActor()];
    const targetUser = actors[0];

    // when
    const result$ = ActorDao.findOneByImdbID(targetUser.imdbId!);

    // then
    result$.subscribe(item => {
      if (!item) { return fail('Movie should be found'); }

      expect(item._id).toEqual(targetUser._id);
      expect(item.birthday).toEqual(targetUser.birthday);
      expect(item.gender).toEqual(targetUser.gender);
      expect(item.name).toEqual(targetUser.name);
      expect(item.birthday).toEqual(targetUser.birthday);
      expect(item.deathday).toEqual(targetUser.deathday);
      expect(item.imdbId).toEqual(targetUser.imdbId);
      expect(item.photoUrl).toEqual(targetUser.photoUrl);
      done();
    });
  });
});
