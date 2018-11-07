import { Effect, HttpStatus, HttpError } from '@marblejs/core';
import { of, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MoviesDao } from '../model/movies.dao';
import { neverNullable } from '../../../util';
import { applyHostname } from '../../movies/model/movies.helpers';

export const getMovieEffect$: Effect = req$ =>
  req$.pipe(
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
