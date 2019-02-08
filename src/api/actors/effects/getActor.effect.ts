import { HttpError, HttpStatus, HttpEffect, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { throwError, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { neverNullable } from '@util';
import { ActorsDao, applyHostname } from '../model';

const validator$ = requestValidator$({
  params: t.type({
    id: t.string,
  })
});

export const getActorEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req => of(req.params.id).pipe(
      mergeMap(ActorsDao.findOneByImdbID),
      mergeMap(neverNullable),
      map(applyHostname(req)),
      map(actor => ({ body: actor })),
      catchError(() => throwError(
        new HttpError('Actor does not exist', HttpStatus.NOT_FOUND)
      ))
    ))
  );
