import { EffectFactory, HttpError, HttpStatus, combineRoutes } from '@marblejs/core';
import { throwError } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

const root$ = EffectFactory
  .matchPath('/')
  .matchType('GET')
  .use(req$ => req$.pipe(
    mapTo({ body: `API version: v1` }),
  ));

const notFound$ = EffectFactory
  .matchPath('*')
  .matchType('*')
  .use(req$ => req$.pipe(
    switchMap(() =>
      throwError(new HttpError('Route not found', HttpStatus.NOT_FOUND))
    )
  ));

export const api$ = combineRoutes(
  '/api/v1',
  [ root$, notFound$ ],
);
