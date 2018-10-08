import { Effect, HttpStatus, HttpError } from '@marblejs/core';
import { of, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MovieDao } from '../model/movie.dao';
import { neverNullable } from '../../../util';
import { applyHostname } from '../../movie/model/movie.helpers';

export const getMovieEffect$: Effect = req$ =>
  req$.pipe(
    mergeMap(req => of(req.params.id).pipe(
      mergeMap(MovieDao.findOneByImdbID),
      mergeMap(neverNullable),
      map(applyHostname(req)),
      map(movie => ({ body: movie })),
      catchError(() => throwError(
        new HttpError('Movie does not exist', HttpStatus.NOT_FOUND)
      ))
    ))
  );
