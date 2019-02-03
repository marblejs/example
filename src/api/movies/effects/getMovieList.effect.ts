import { use, HttpEffect } from '@marblejs/core';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { MoviesDao, SORTING_FIELDS } from '../model/movies.dao';
import { applyHostnameForCollection } from '../../movies/model/movies.helpers';
import { collectionQueryValidator$ } from '../../common/middlewares/collectionQuery.validator';

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
