import { HttpError, HttpStatus, HttpRequest } from '@marblejs/core';
import { switchMap } from 'rxjs/operators';
import { iif, throwError, of } from 'rxjs';
import { AuthCredentials } from './auth.model';

const isAuthorized = ({ login, password }: AuthCredentials) =>
  login === 'admin' && password === 'admin';

// @TODO: check and get user from DB
export const authenticate$ = (req: HttpRequest) =>
  of(req).pipe(
    switchMap(req => iif(
      () => !isAuthorized(req.body),
      throwError(new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED)),
      of({
        firstName: 'Brad',
        lastName: 'Pitt',
        roles: ['ROLE_ADMIN'],
        username: 'SweetBrad63',
      }),
    )),
  );
