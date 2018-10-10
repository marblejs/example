import { Effect, use } from '@marblejs/core';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { MovieDao, SORTING_FIELDS } from '../model/movie.dao';
import { applyHostnameForCollection } from '../../movie/model/movie.helpers';
import { collectionQueryValidator$ } from '../../common/middlewares/collectionQuery.validator';
import { CollectionQuery } from '../../common/helpers/collectionQuery.helper';

type Query = CollectionQuery;

export const getMovieListEffect$: Effect = req$ =>
  req$.pipe(
    use(collectionQueryValidator$({ sortBy: SORTING_FIELDS})),
    mergeMap(req => of(req).pipe(
      map(req => req.query as Query),
      mergeMap(MovieDao.findAll),
      map(applyHostnameForCollection(req)),
      map(movies => ({ body: movies })),
    ))
  );
