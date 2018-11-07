import { Effect, use } from '@marblejs/core';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { MoviesDao, SORTING_FIELDS } from '../model/movies.dao';
import { applyHostnameForCollection } from '../../movies/model/movies.helpers';
import { collectionQueryValidator$ } from '../../common/middlewares/collectionQuery.validator';
import { CollectionQueryOptions } from '../../common/helpers/collectionQuery.helper';

type Query = CollectionQueryOptions;

export const getMovieListEffect$: Effect = req$ =>
  req$.pipe(
    use(collectionQueryValidator$({ sortBy: SORTING_FIELDS})),
    mergeMap(req => of(req).pipe(
      map(req => req.query as Query),
      mergeMap(MoviesDao.findAll),
      map(applyHostnameForCollection(req)),
      map(movies => ({ body: movies })),
    ))
  );
