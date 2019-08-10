import { HttpStatus, HttpError, HttpEffect, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { of, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { collectionQueryValidator$ } from '../../../util/database/validators';
import { neverNullable } from '../../../util/etc/rxjs';
import { MoviesMethods, SORTING_FIELDS } from './methods';
import { applyHostname, applyHostnameForCollection } from './helpers';

const validator$ = requestValidator$({
  params: t.type({
    id: t.string,
  })
});

export const getMovieEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req => of(req.params.id).pipe(
      mergeMap(MoviesMethods.findOneByImdbID),
      mergeMap(neverNullable),
      map(applyHostname(req)),
      map(movie => ({ body: movie })),
      catchError(() => throwError(
        new HttpError('Movie does not exist', HttpStatus.NOT_FOUND)
      ))
    ))
  );

export const getMovieListEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(collectionQueryValidator$({ sortBy: SORTING_FIELDS })),
    mergeMap(req => of(req).pipe(
      map(req => req.query),
      mergeMap(MoviesMethods.findAll),
      map(applyHostnameForCollection(req)),
      map(movies => ({ body: movies })),
    ))
  );
