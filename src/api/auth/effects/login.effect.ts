import { EffectFactory, use, HttpError, HttpStatus } from '@marblejs/core';
import { generateToken } from '@marblejs/middleware-jwt';
import { of, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { generateTokenPayload } from '../helpers/token.helper';
import { loginValidator$ } from '../validators/login.validator';
import { UserRepository } from '../../user/repositories/user.repository';
import { neverNullable } from '../../../util';
import { Config } from '../../../config';

export const login$ = EffectFactory
  .matchPath('/login')
  .matchType('POST')
  .use(req$ => req$.pipe(
    use(loginValidator$),
    mergeMap(req => of(req).pipe(
      map(req => req.body),
      mergeMap(UserRepository.findByCredentials),
      mergeMap(neverNullable),
      map(generateTokenPayload),
      map(generateToken({ secret: Config.jwt.secret })),
      map(token => ({ body: { token } })),
      catchError(() => throwError(
        new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED)
      )),
    ))
  ));
