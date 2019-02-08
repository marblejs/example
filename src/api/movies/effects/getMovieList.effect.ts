import { Effect, use } from '@marblejs/core';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { CollectionQueryOptions, collectionQueryValidator$ } from '@api/common';
import { MoviesDao, SORTING_FIELDS, applyHostnameForCollection } from '../model';

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
