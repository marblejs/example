import { EffectFactory, use, HttpError, HttpStatus } from '@marblejs/core';
import { loginValidator$ } from '../validators/login.validator';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { UserRepository } from '../../user/repositories/user.repository';
import { neverNullable } from '../../../util';

export const login$ = EffectFactory
  .matchPath('/login')
  .matchType('POST')
  .use(req$ => req$.pipe(
    use(loginValidator$),
    mergeMap(req => of(req).pipe(
      map(req => req.body),
      mergeMap(UserRepository.findUserByCredentials),
      mergeMap(neverNullable),
      map(user => ({ body: user })),
      catchError(() => throwError(
        new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED)
      )),
    ))
  ));