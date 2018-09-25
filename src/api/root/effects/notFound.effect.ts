import { EffectFactory, HttpError, HttpStatus } from '@marblejs/core';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const notFound$ = EffectFactory
  .matchPath('*')
  .matchType('*')
  .use(req$ => req$.pipe(
    switchMap(() =>
      throwError(new HttpError('Route not found', HttpStatus.NOT_FOUND))
    )
  ));
