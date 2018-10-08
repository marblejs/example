import { Effect } from '@marblejs/core';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { MovieDao } from '../model/movie.dao';
import { applyHostnameForCollection } from '../../movie/model/movie.helpers';

export const getMovieListEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(req => of(req).pipe(
      mergeMap(MovieDao.findAll),
      map(applyHostnameForCollection(req)),
      map(movies => ({ body: movies })),
    ))
  );
