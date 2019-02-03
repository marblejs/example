import { use, HttpError, HttpStatus, HttpEffect } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { generateToken } from '@marblejs/middleware-jwt';
import { of, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { generateTokenPayload } from '../helpers/token.helper';
import { UsersDao } from '../../users/model/users.dao';
import { neverNullable } from '../../../util';
import { Config } from '../../../config';

const validator$ = requestValidator$({
  body: t.type({
    login: t.string,
    password: t.string,
  })
});

export const loginEffect$: HttpEffect = req$ =>
  req$.pipe(
    use(validator$),
    mergeMap(req => of(req).pipe(
      map(req => req.body),
      mergeMap(UsersDao.findByCredentials),
      mergeMap(neverNullable),
      map(generateTokenPayload),
      map(generateToken({ secret: Config.jwt.secret })),
      map(token => ({ body: { token } })),
      catchError(() => throwError(
        new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED)
      )),
    ))
  );
