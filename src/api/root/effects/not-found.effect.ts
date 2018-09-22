import { EffectFactory, HttpError, HttpStatus } from '@marblejs/core';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const notFound$ = EffectFactory
  .matchPath('*')
  .matchType('*')
  .use(req$ => req$.pipe(
    switchMap(() =>
      throwError(new HttpError('Route not found', HttpStatus.NOT_FOUND))
    )
  ));
