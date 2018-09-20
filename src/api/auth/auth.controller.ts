import { EffectFactory, combineRoutes, use, HttpError, HttpStatus } from '@marblejs/core';
import { throwError, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { loginValidator$ } from './auth.validator';
import { UserRepository } from '../user/user.repository';
import { neverNullable } from '../../util';

const login$ = EffectFactory
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

export const auth$ = combineRoutes('/auth', [ login$ ]);
