import { use, HttpError, HttpStatus, Effect } from '@marblejs/core';
import { validator$, Joi } from '@marblejs/middleware-joi';
import { generateToken } from '@marblejs/middleware-jwt';
import { of, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { neverNullable } from '@util';
import { Config } from '@config';
import { UsersDao } from '@api/users/model';
import { generateTokenPayload } from '../helpers';

const loginValidator$ = validator$({
  body: Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
  })
});

export const loginEffect$: Effect = req$ =>
  req$.pipe(
    use(loginValidator$),
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
