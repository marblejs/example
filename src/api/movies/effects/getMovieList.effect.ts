import { use, HttpEffect } from '@marblejs/core';
import { collectionQueryValidator$ } from '@api/common';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { MoviesDao, SORTING_FIELDS, applyHostnameForCollection } from '../model';

export const getMovieListEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(collectionQueryValidator$({ sortBy: SORTING_FIELDS })),
    mergeMap(req => of(req).pipe(
      map(req => req.query),
      mergeMap(MoviesDao.findAll),
      map(applyHostnameForCollection(req)),
      map(movies => ({ body: movies })),
    ))
  );
