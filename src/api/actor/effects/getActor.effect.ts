import { Effect, HttpError, HttpStatus } from '@marblejs/core';
import { throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ActorDao } from '../model/actor.dao';
import { neverNullable } from '../../../util';

export const getActorEffect$: Effect = req$ =>
  req$.pipe(
    map(req => req.params.id),
    mergeMap(ActorDao.findByImdbID),
    mergeMap(neverNullable),
    map(actor => ({ body: actor })),
    catchError(() => throwError(
      new HttpError('Actor does not exist', HttpStatus.NOT_FOUND)
    ))
  );
