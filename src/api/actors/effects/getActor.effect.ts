import { HttpError, HttpStatus, HttpEffect, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { throwError, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ActorsDao } from '../model/actors.dao';
import { neverNullable } from '../../../util';
import { applyHostname } from '../model/actors.helpers';

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
