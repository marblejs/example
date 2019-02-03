import { HttpStatus, HttpError, HttpEffect, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { of, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MoviesDao } from '../model/movies.dao';
import { neverNullable } from '../../../util';
import { applyHostname } from '../../movies/model/movies.helpers';

const validator$ = requestValidator$({
  params: t.type({
    id: t.string,
  })
});

export const getMovieEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req => of(req.params.id).pipe(
      mergeMap(MoviesDao.findOneByImdbID),
      mergeMap(neverNullable),
      map(applyHostname(req)),
      map(movie => ({ body: movie })),
      catchError(() => throwError(
        new HttpError('Movie does not exist', HttpStatus.NOT_FOUND)
      ))
    ))
  );
